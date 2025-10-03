import { AppBackground } from '@/components/ui'
import { LanguageProvider } from '@/shared/lib/i18n'
import { ThemeProvider } from '@/shared/lib/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { SocketProvider } from './SocketProvider'

const queryClient = new QueryClient()

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppBackground>
          <SocketProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </SocketProvider>
        </AppBackground>
      </ThemeProvider>
    </LanguageProvider>
  )
}
