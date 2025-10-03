import { AppProviders } from '@/providers/AppProviders'
import { AuthRedirectProvider } from '@/providers/AuthProvider'
import { hydrateAuth } from '@/shared/lib/auth'
import { ErrorBoundary } from '@/shared/lib/error-boundary'
import { SentryLogger } from '@/shared/lib/sentry-logger'
import * as Sentry from '@sentry/react-native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useRef } from 'react'
import '../../global.css'

Sentry.init({
  dsn: 'https://476c95a6d86ef5bf96a765fb78db2fab@o4507724796526592.ingest.de.sentry.io/4510087341080656',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
})
SplashScreen.preventAutoHideAsync()

function RootLayout() {
  const [loaded] = useFonts({
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
    'SpaceMono-Regular': require('../../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      try {
        hydrateAuth()
        hasMounted.current = true
      } catch (error) {
        SentryLogger.logGlobalError(error as Error, {
          context: 'app_initialization',
        })
        hasMounted.current = true
      }
    }
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <ErrorBoundary>
      <AppProviders>
        <AuthRedirectProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(notification)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </AuthRedirectProvider>
      </AppProviders>
    </ErrorBoundary>
  )
}

export default Sentry.wrap(RootLayout)
