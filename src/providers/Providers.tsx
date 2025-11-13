import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
import { ClickSparkProvider } from './ClickSparkProvider'
import { LazyMotionProvider } from './LazyMotionProvider'
import { MultiProvider } from './MultiProvider'
import { ThemeProvider } from './ThemeProvider'
import { UIProvider } from './UIProvider'

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
      ]}
    >
      {children}
    </MultiProvider>
  )
}

export { Providers }
