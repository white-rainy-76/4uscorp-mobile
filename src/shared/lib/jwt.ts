import { jwtDecode } from 'jwt-decode'
import { SentryLogger } from './sentry-logger'

export enum UserRole {
  Admin = 'Admin',
  Driver = 'Driver',
  Manager = 'Manager',
  SuperAdmin = 'SuperAdmin',
  SelfDriver = 'SelfDriver',
}

export interface JwtPayload {
  sub: string
  role: string
  company_id: string
  exp: number
  iat: number
  [key: string]: any
}

export const jwt = {
  decode: (token: string): JwtPayload | null => {
    try {
      if (!token || typeof token !== 'string') {
        console.warn('Invalid token format:', typeof token)
        return null
      }
      console.log('Decoding JWT token:', token)
      const decoded = jwtDecode<JwtPayload>(token)
      console.log('JWT decoded successfully:', {
        sub: decoded.sub,
        role: decoded.role,
        company_id: decoded.company_id,
        exp: decoded.exp,
      })
      return decoded
    } catch (error) {
      console.error('Error decoding JWT token:', error)
      SentryLogger.logJWTError(
        'Failed to decode JWT token',
        token,
        error as Error,
      )
      return null
    }
  },

  isValid: (token: string): boolean => {
    if (!token || typeof token !== 'string') {
      console.warn('Invalid token format for validation:', typeof token)
      return false
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token)
      const currentTime = Date.now() / 1000
      const isValid = decoded.exp > currentTime

      console.log('Token validation:', {
        currentTime: new Date(currentTime * 1000).toISOString(),
        expTime: new Date(decoded.exp * 1000).toISOString(),
        isValid,
      })

      return isValid
    } catch (error) {
      console.error('Error validating token:', error)
      SentryLogger.logJWTError(
        'Failed to validate token',
        token,
        error as Error,
      )
      return false
    }
  },

  extractUserData: (token: string) => {
    const decoded = jwt.decode(token)
    if (!decoded) {
      console.warn('Failed to extract user data: token decode failed')
      SentryLogger.logJWTError('Failed to extract user data from token', token)
      return null
    }

    const userData = {
      userId: decoded.sub,
      role: decoded.role,
      companyId: decoded.company_id,
    }

    console.log('User data extracted:', userData)
    return userData
  },
}
