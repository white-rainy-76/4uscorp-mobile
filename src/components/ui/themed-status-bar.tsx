import { useTheme } from '@/shared/lib/theme'
import { StatusBar } from 'react-native'

export const ThemedStatusBar = () => {
  const { theme } = useTheme()

  return (
    <StatusBar
      backgroundColor={theme.colors.header.background}
      barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
    />
  )
}
