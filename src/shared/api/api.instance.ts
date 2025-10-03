import { getToken } from '@/shared/lib/auth/utils'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { signOut } from '../lib/auth'
import { SentryLogger } from '../lib/sentry-logger'
import { ApiErrorDataDtoSchema } from './api.contracts'
import { normalizeValidationErrors } from './api.lib'

export const api = axios.create({
  baseURL: 'https://foruscorp.net:5011',
})

// Automatically add authorization token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('🔐 Token added to request:', config.url)
    } else {
      console.log('⚠️ No token found for request:', config.url)
    }
    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  },
)

export function authorizedRequest(
  getAuthToken: () => string | undefined,
  config?: AxiosRequestConfig,
) {
  const token = getAuthToken()
  return {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    // Handle authorization error
    if (error.response?.status === 401) {
      console.log('🚫 Unauthorized request, signing out user')

      SentryLogger.logAPIError(error.config?.url || 'unknown', 401, error, {
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      })

      signOut()

      return Promise.reject(error)
    }

    const validation = ApiErrorDataDtoSchema.safeParse(error.response?.data)

    if (!validation.success) {
      return Promise.reject(error)
    }

    const normalizedErrorResponse = {
      ...error.response!,
      data: normalizeValidationErrors(validation.data),
    }

    return Promise.reject(
      new AxiosError(
        error.message,
        error.code,
        error.config,
        error.request,
        normalizedErrorResponse,
      ),
    )
  },
)
