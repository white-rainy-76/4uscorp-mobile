import { Theme, ThemeColors, ThemeMode } from '@/shared/types/theme.types'

// Светлая тема
export const lightTheme: ThemeColors = {
  background: {
    primary: '#F2F2F2', // Основной фон
    secondary: '#FFFFFF', // Вторичный фон
  },
  text: {
    primary: '#343434', // Основной текст
    secondary: '#A8A8A8', // Вторичный текст
  },
  border: {
    primary: '#E5E5E5', // Основные границы (для светлой темы)
    secondary: '#D1D1D1', // Вторичные границы
  },
  header: {
    background: '#4964D8', // Голубой фон заголовка (как было раньше)
    text: '#FFFFFF', // Белый текст для заголовка
  },
  icons: {
    primary: '#A8A8A8',
    secondary: '#4964D8',
  },
  // Активные цвета остаются одинаковыми
  primary: {
    50: '#FFE2CC',
    100: '#FFC499',
    200: '#FFA766',
    300: '#FF984C',
    400: '#FF8933',
    500: '#FF7B1A',
    600: '#FF6C00',
    700: '#E56100',
    800: '#CC5600',
    900: '#B24C00',
  },
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
}

// Темная тема
export const darkTheme: ThemeColors = {
  background: {
    primary: '#383838', // Основной фон
    secondary: '#2C2C2C', // Вторичный фон
  },
  text: {
    primary: '#A8A8A8', // Основной текст
    secondary: '#6B6B6B', // Вторичный текст (подобрал подходящий оттенок)
  },
  border: {
    primary: '#97979780', // Основные границы (для темной темы - более светлый серый)
    secondary: '#9797974D', // Вторичные границы
  },
  header: {
    background: '#2C2C2C', // Фон заголовка (темный)
    text: '#FFFFFF', // Цвет текста заголовка (как основной текст)
  },
  icons: {
    primary: '#A8A8A8',
    secondary: '#A8A8A8',
  },
  // Активные цвета остаются одинаковыми
  primary: {
    50: '#FFE2CC',
    100: '#FFC499',
    200: '#FFA766',
    300: '#FF984C',
    400: '#FF8933',
    500: '#FF7B1A',
    600: '#FF6C00',
    700: '#E56100',
    800: '#CC5600',
    900: '#B24C00',
  },
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
}

export const getTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: mode === 'light' ? lightTheme : darkTheme,
})
