import { useTheme } from '@/shared/lib/theme'
import React from 'react'
import { View } from 'react-native'

interface AppBackgroundProps {
  children: React.ReactNode
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
      }}>
      {children}
    </View>
  )
}
