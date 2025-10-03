export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  // Backgrounds
  background: {
    primary: string
    secondary: string
  }
  // Text colors
  text: {
    primary: string
    secondary: string
  }
  // Border colors
  border: {
    primary: string
    secondary: string
  }
  // Header colors
  header: {
    background: string
    text: string
  }
  icons: {
    primary: string
    secondary: string
  }
  // Active colors (buttons, accents) - остаются одинаковыми
  primary: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
  success: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
  warning: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
  danger: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
}

export interface Theme {
  mode: ThemeMode
  colors: ThemeColors
}
