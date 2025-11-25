'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

interface ThemeProviderProps {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const { isMobile } = useIsMobile()

  return (
    <NextThemesProvider
      attribute="class"
      enableColorScheme
      disableTransitionOnChange={isMobile}
    >
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
