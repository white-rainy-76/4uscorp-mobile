import { useTheme } from '@/shared/lib/theme'
import { Stack } from 'expo-router'
import React from 'react'

interface ThemedStackProps {
  children: React.ReactNode
}

export const ThemedStack: React.FC<ThemedStackProps> & {
  Screen: typeof Stack.Screen
} = ({ children }) => {
  const { theme } = useTheme()

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background.secondary,
        },
      }}>
      {children}
    </Stack>
  )
}

ThemedStack.Screen = Stack.Screen
