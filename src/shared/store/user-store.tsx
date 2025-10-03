import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { UserRole } from '../lib/jwt'

interface UserData {
  userId: string
  role: string
  companyId: string
}

interface UserStore {
  userData: UserData | null
  setUserData: (data: UserData) => void
  clearUserData: () => void
  hasAccess: () => boolean
  canAccessRoutes: () => boolean
  isDriver: () => boolean
  isSelfDriver: () => boolean
}

const storage = new MMKV()

const USER_DATA_KEY = 'user_data'

export const useUserStore = create<UserStore>((set, get) => ({
  userData: (() => {
    try {
      const stored = storage.getString(USER_DATA_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })(),

  setUserData: (data: UserData) => {
    storage.set(USER_DATA_KEY, JSON.stringify(data))
    set({ userData: data })
  },

  clearUserData: () => {
    storage.delete(USER_DATA_KEY)
    set({ userData: null })
  },

  hasAccess: () => {
    const { userData } = get()
    if (!userData) return false

    return (
      userData.role === UserRole.Driver || userData.role === UserRole.SelfDriver
    )
  },

  canAccessRoutes: () => {
    const { userData } = get()
    if (!userData) return false

    return userData.role === UserRole.SelfDriver
  },

  isDriver: () => {
    const { userData } = get()
    return userData?.role === UserRole.Driver
  },

  isSelfDriver: () => {
    const { userData } = get()
    return userData?.role === UserRole.SelfDriver
  },
}))
