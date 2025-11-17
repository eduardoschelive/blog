'use client'

import { useHashScroll } from '@/hooks/useHashScroll'
import type { ReactNode } from 'react'

interface HashScrollProviderProps {
  children: ReactNode
}

function HashScrollProvider({ children }: HashScrollProviderProps) {
  useHashScroll()
  return <>{children}</>
}

export { HashScrollProvider }
