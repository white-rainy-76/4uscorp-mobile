import * as Sentry from '@sentry/react-native'

export class SentryLogger {
  // Логирование ошибок авторизации
  static logAuthError(
    message: string,
    error?: Error,
    context?: Record<string, any>,
  ) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'auth')
      scope.setLevel('error')

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      if (error) {
        scope.setContext('error_details', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        })
      }

      Sentry.captureMessage(`🔐 Auth Error: ${message}`, 'error')
    })
  }

  // Логирование ошибок JWT
  static logJWTError(message: string, token?: string, error?: Error) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'jwt')
      scope.setLevel('error')

      if (token) {
        scope.setContext('token_info', {
          length: token.length,
          preview: token.substring(0, 20) + '...',
          hasValidStructure: token.split('.').length === 3,
        })
      }

      if (error) {
        scope.setContext('error_details', {
          message: error.message,
          stack: error.stack,
        })
      }

      Sentry.captureMessage(
        `🔑 JWT Error: ${message}, Token: ${token}`,
        'error',
      )
    })
  }

  // Логирование ошибок API
  static logAPIError(
    endpoint: string,
    statusCode: number,
    error?: Error,
    context?: Record<string, any>,
  ) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'api')
      scope.setLevel('error')
      scope.setContext('api_error', {
        endpoint,
        statusCode,
        timestamp: new Date().toISOString(),
      })

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      if (error) {
        scope.setContext('error_details', {
          message: error.message,
          stack: error.stack,
        })
      }

      Sentry.captureMessage(
        `🌐 API Error: ${endpoint} - ${statusCode}`,
        'error',
      )
    })
  }

  // Логирование разлогина
  static logLogout(reason: string, context?: Record<string, any>) {
    Sentry.withScope((scope) => {
      scope.setTag('event_type', 'logout')
      scope.setLevel('info')
      scope.setContext('logout_info', {
        reason,
        timestamp: new Date().toISOString(),
      })
      scope.setFingerprint(['logout', reason])

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      Sentry.captureMessage(`🚪 User Logout: ${reason}`, 'info')
    })
  }

  // Логирование успешного входа
  static logLoginSuccess(userId: string, role: string) {
    Sentry.withScope((scope) => {
      scope.setTag('event_type', 'login_success')
      scope.setLevel('info')
      scope.setContext('login_info', {
        userId,
        role,
        timestamp: new Date().toISOString(),
      })
      scope.setFingerprint(['login_success', userId])

      Sentry.captureMessage(`✅ User Login Success`, 'info')
    })
  }

  // Логирование ошибок входа
  static logLoginError(reason: string, username?: string, error?: Error) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'login')
      scope.setLevel('error')
      scope.setContext('login_error', {
        reason,
        username: username || 'unknown',
        timestamp: new Date().toISOString(),
      })
      scope.setFingerprint(['login_error', reason])

      if (error) {
        scope.setContext('error_details', {
          message: error.message,
          stack: error.stack,
        })
        Sentry.captureException(error)
      } else {
        Sentry.captureMessage(`❌ Login Error: ${reason}`, 'error')
      }
    })
  }

  // Логирование операций с хранилищем
  static logStorage(message: string, context?: Record<string, any>) {
    Sentry.withScope((scope) => {
      scope.setTag('event_type', 'storage')
      scope.setLevel('info')
      scope.setContext('storage', {
        message,
        timestamp: new Date().toISOString(),
      })

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      Sentry.captureMessage(`💾 Storage: ${message}`, 'info')
    })
  }

  // Логирование ошибок хранилища
  static logStorageError(
    message: string,
    error?: Error,
    context?: Record<string, any>,
  ) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'storage')
      scope.setLevel('error')
      scope.setContext('storage_error', {
        message,
        timestamp: new Date().toISOString(),
      })

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      if (error) {
        scope.setContext('error_details', {
          message: error.message,
          stack: error.stack,
        })
      }

      Sentry.captureMessage(`💾❌ Storage Error: ${message}`, 'error')
    })
  }

  // Логирование регистрации устройства
  static logDeviceRegistration(message: string, context?: Record<string, any>) {
    Sentry.withScope((scope) => {
      scope.setTag('event_type', 'device_registration')
      scope.setLevel('info')
      scope.setContext('device_registration', {
        message,
        timestamp: new Date().toISOString(),
      })

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      Sentry.captureMessage(`📱 Device Registration: ${message}`, 'info')
    })
  }

  // Логирование ошибок регистрации устройства
  static logDeviceRegistrationError(
    message: string,
    error?: Error,
    context?: Record<string, any>,
  ) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'device_registration')
      scope.setLevel('error')
      scope.setContext('device_registration_error', {
        message,
        timestamp: new Date().toISOString(),
      })

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      if (error) {
        scope.setContext('error_details', {
          message: error.message,
          stack: error.stack,
        })
      }

      Sentry.captureMessage(
        `📱❌ Device Registration Error: ${message}`,
        'error',
      )
    })
  }

  // Глобальная обработка ошибок
  static logGlobalError(error: Error, context?: Record<string, any>) {
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'global')
      scope.setLevel('error')

      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setContext(key, context[key])
        })
      }

      scope.setContext('global_error', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString(),
      })

      Sentry.captureException(error)
    })
  }
}
