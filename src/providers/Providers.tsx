import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
import { MultiProvider } from './MultiProvider'
import { ThemeProvider } from './ThemeProvider'
import { UIProvider } from './UIProvider'

interface ProvidersProps {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return <MultiProvider providers={[ThemeProvider, NextIntlClientProvider, UIProvider]}>{children}</MultiProvider>
}

export { Providers }
