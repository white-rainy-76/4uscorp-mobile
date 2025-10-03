import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SentryLogger } from './sentry-logger'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    SentryLogger.logGlobalError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        )
      }

      return (
        <View className="flex-1 bg-white items-center justify-center p-8">
          <Text className="text-xl font-bold text-red-600 mb-4 text-center">
            Something went wrong
          </Text>
          <Text className="text-gray-600 mb-6 text-center">
            We're sorry, but something unexpected happened. Please try again.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg"
            onPress={this.resetError}>
            <Text className="text-white font-semibold">Try Again</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return this.props.children
  }
}
