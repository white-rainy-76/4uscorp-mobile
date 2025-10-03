import { useAuth } from '@/shared/lib/auth'
import { useUserStore } from '@/shared/store/user-store'
import { useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
  const router = useRouter()
  const segments = useSegments()
  const { status, token } = useAuth()
  const { hasAccess } = useUserStore()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'

    // Check if user should be redirected to login
    const shouldRedirectToLogin = status === 'signOut' || !token || !hasAccess()

    // Check if user should be redirected to main app
    const shouldRedirectToApp = status === 'signIn' && token && hasAccess()

    if (shouldRedirectToLogin && !inAuthGroup) {
      console.log('Redirecting to login:', {
        status,
        hasToken: !!token,
        hasAccess: hasAccess(),
      })
      router.replace('/(auth)/login')
    } else if (shouldRedirectToApp && inAuthGroup) {
      console.log('Redirecting to main app:', {
        status,
        hasToken: !!token,
        hasAccess: hasAccess(),
      })
      router.replace('/(tabs)')
    }
  }, [status, token, segments, router, hasAccess])
}
