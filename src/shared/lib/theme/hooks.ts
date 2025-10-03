import { useTheme } from './ThemeProvider'

/**
 * Хук для удобного доступа к цветам темы
 * @returns Объект с цветами текущей темы
 */
export const useThemeColors = () => {
  const { theme } = useTheme()
  return theme.colors
}

/**
 * Хук для проверки текущей темы
 * @returns Объект с информацией о текущей теме
 */
export const useThemeMode = () => {
  const { themeMode, toggleTheme, setThemeMode } = useTheme()
  return {
    isDark: themeMode === 'dark',
    isLight: themeMode === 'light',
    mode: themeMode,
    toggleTheme,
    setThemeMode,
  }
}
