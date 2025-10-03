import { Dimensions, Platform } from 'react-native'
import { create } from 'zustand'

import { logout } from '@/services/auth'
import { useUserStore } from '../../store/user-store'
import { jwt, UserRole } from '../jwt'
import { SentryLogger } from '../sentry-logger'
import { clearDeviceRegistration, getExpoToken, removeItem } from '../storage'
import { createSelectors } from '../utils'
import { getToken, removeToken } from './utils'

// Detect if device is tablet
const { width, height } = Dimensions.get('screen')
const isTablet = Math.min(width, height) >= 600

interface AuthState {
  token: string | null
  status: 'idle' | 'signOut' | 'signIn'
  _isHydrating: boolean
  signIn: (data: string) => void
  signOut: () => void
  hydrate: () => void
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  _isHydrating: false, // Prevent race conditions
  signIn: (token) => {
    try {
      // Decode JWT token and extract user data
      const userData = jwt.extractUserData(token)

      if (!userData) {
        const error = new Error('Failed to decode token')
        SentryLogger.logAuthError(
          'Failed to decode token during sign in',
          error,
          { token: token.substring(0, 20) + '...' },
        )
        throw error
      }

      // Check user role
      if (
        userData.role !== UserRole.Driver &&
        userData.role !== UserRole.SelfDriver
      ) {
        const error = new Error(
          'Access denied. Your role does not allow you to enter the application.',
        )
        SentryLogger.logAuthError('Access denied due to invalid role', error, {
          role: userData.role,
          userId: userData.userId,
        })
        throw error
      }

      useUserStore.getState().setUserData(userData)

      set({ status: 'signIn', token })

      SentryLogger.logLoginSuccess(userData.userId, userData.role)
    } catch (error) {
      SentryLogger.logAuthError('Sign in failed', error as Error)
      throw error
    }
  },
  signOut: async () => {
    console.log('Starting logout process...', {
      deviceType: isTablet ? 'tablet' : 'phone',
      platform: Platform.OS,
    })

    try {
      const expoToken = getExpoToken()
      // If expoToken is found, send it to server
      if (expoToken) {
        try {
          await logout({ expoToken })
        } catch (error) {
          console.error('Error sending expoToken on logout:', error)
          SentryLogger.logAuthError(
            'Failed to send expoToken on logout',
            error as Error,
            { expoToken: expoToken.substring(0, 20) + '...' },
          )
        }
      }

      // Clear user data
      useUserStore.getState().clearUserData()

      await removeItem('userId')
      await removeItem('truckData')
      await removeItem('expoToken') // Clear expo token
      await clearDeviceRegistration()

      removeToken()
      set({ status: 'signOut', token: null })

      // Log successful logout
      SentryLogger.logLogout('User initiated logout', {
        deviceType: isTablet ? 'tablet' : 'phone',
        platform: Platform.OS,
      })
    } catch (error) {
      SentryLogger.logAuthError('Logout process failed', error as Error)
      // Still clear local data even if server logout fails
      useUserStore.getState().clearUserData()
      removeToken()
      // Clear all stored data on error
      removeItem('userId').catch(() => {})
      removeItem('truckData').catch(() => {})
      removeItem('expoToken').catch(() => {})
      clearDeviceRegistration().catch(() => {})
      set({ status: 'signOut', token: null })
    }
  },
  hydrate: () => {
    const state = get()
    if (state._isHydrating) {
      console.log('Hydration already in progress, skipping...')
      return
    }

    try {
      set({ _isHydrating: true })
      console.log('Starting authentication hydration...', {
        deviceType: isTablet ? 'tablet' : 'phone',
        platform: Platform.OS,
        screenSize: { width, height },
      })
      const userToken = getToken()
      if (userToken !== null) {
        // Check if token is valid before proceeding
        if (!jwt.isValid(userToken)) {
          SentryLogger.logLogout('Hydration failed - token expired', {
            tokenLength: userToken.length,
            tokenPreview: userToken.substring(0, 20) + '...',
          })
          get().signOut()
          return
        }

        const userData = jwt.extractUserData(userToken)
        if (
          userData &&
          (userData.role === UserRole.Driver ||
            userData.role === UserRole.SelfDriver)
        ) {
          useUserStore.getState().setUserData(userData)
          // Just update state, token is already saved
          set({ status: 'signIn', token: userToken })
          SentryLogger.logLoginSuccess(userData.userId, userData.role)
        } else {
          SentryLogger.logLogout(
            'Hydration failed - invalid user data or role',
            {
              hasUserData: !!userData,
              role: userData?.role,
              userId: userData?.userId,
            },
          )
          get().signOut()
        }
      } else {
        SentryLogger.logLogout('Hydration failed - no token found')
        get().signOut()
      }
    } catch (e) {
      console.error('Error restoring authentication:', e)
      SentryLogger.logAuthError('Authentication hydration failed', e as Error)
      get().signOut()
    } finally {
      set({ _isHydrating: false })
    }
  },
}))

export const useAuth = createSelectors(_useAuth)

export const signOut = () => _useAuth.getState().signOut()
export const signIn = (token: string) => _useAuth.getState().signIn(token)
export const hydrateAuth = () => _useAuth.getState().hydrate()
