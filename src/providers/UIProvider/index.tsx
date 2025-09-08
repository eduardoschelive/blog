'use client'

import { useRouter } from '@/i18n/navigation'
import { HeroUIProvider } from '@heroui/react'
import type { ReactNode } from 'react'

interface UIProviderProps {
  children: ReactNode
}

function UIProvider({ children }: UIProviderProps) {
  const { push } = useRouter()

  return <HeroUIProvider navigate={push}>{children}</HeroUIProvider>
}

export { UIProvider }
