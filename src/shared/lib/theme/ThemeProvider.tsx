import { getItem, setItem } from '@/shared/lib/storage'
import { Theme, ThemeMode } from '@/shared/types/theme.types'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getTheme } from './theme.config'

interface ThemeContextType {
  theme: Theme
  themeMode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = '@app_theme_mode'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light')

  // Загружаем сохраненную тему при инициализации
  useEffect(() => {
    loadThemeFromStorage()
  }, [])

  const loadThemeFromStorage = async () => {
    try {
      const savedTheme = getItem<string>(THEME_STORAGE_KEY)
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeModeState(savedTheme as ThemeMode)
      }
    } catch (error) {
      console.error('Error loading theme from storage:', error)
    }
  }

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode)
      await setItem(THEME_STORAGE_KEY, mode)
    } catch (error) {
      console.error('Error saving theme to storage:', error)
    }
  }

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  const theme = getTheme(themeMode)

  const value: ThemeContextType = {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
