import { useTheme } from '@/shared/lib/theme'
import { useUserStore } from '@/shared/store/user-store'
import { router, Stack } from 'expo-router'
import { useEffect } from 'react'

export default function RouteLayout() {
  const { theme } = useTheme()
  const { canAccessRoutes } = useUserStore()

  useEffect(() => {
    // Check access to routes page
    if (!canAccessRoutes()) {
      router.replace('/(tabs)')
    }
  }, [canAccessRoutes])

  // If access is denied, don't render content
  if (!canAccessRoutes()) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Route',
          headerStyle: {
            backgroundColor: theme.colors.header.background,
          },
          headerTintColor: theme.colors.header.text,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Nunito',
            fontWeight: '500',
            fontSize: 20,
          },
        }}
      />
    </Stack>
  )
}
