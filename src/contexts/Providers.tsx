import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
import { ClickSparkProvider } from './ClickSparkProvider'
import { LazyMotionProvider } from './LazyMotionProvider'
import { MultiProvider } from './MultiProvider'
import { ThemeProvider } from './ThemeProvider'
import { UIProvider } from './UIProvider'
import { HashScrollProvider } from './HashScrollProvider'
import { SearchProvider } from '@/contexts/SearchContext'

interface ProvidersProps {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <MultiProvider
      providers={[
        LazyMotionProvider,
        ThemeProvider,
        NextIntlClientProvider,
        UIProvider,
        ClickSparkProvider,
        HashScrollProvider,
        SearchProvider,
      ]}
    >
      {children}
    </MultiProvider>
  )
}

export { Providers }
