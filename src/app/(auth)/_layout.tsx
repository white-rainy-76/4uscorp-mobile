import { ThemedStatusBar } from '@/components/ui/themed-status-bar'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <>
      <ThemedStatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  )
}
