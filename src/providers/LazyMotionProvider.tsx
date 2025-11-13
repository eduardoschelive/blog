'use client'

import { LazyMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface LazyMotionProviderProps {
  children: ReactNode
}

// Carrega as features do domAnimation de forma assíncrona
const loadFeatures = () =>
  import('framer-motion').then((res) => res.domAnimation)

export function LazyMotionProvider({ children }: LazyMotionProviderProps) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
