'use client'

import { domAnimation, LazyMotion, MotionGlobalConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface LazyMotionProviderProps {
  children: ReactNode
}

function LazyMotionProvider({ children }: LazyMotionProviderProps) {
  useEffect(() => {
    const isBot = /bot|crawler|spider|lighthouse/i.test(navigator.userAgent)

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (isBot || prefersReducedMotion) {
      MotionGlobalConfig.skipAnimations = true
    }
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

export { LazyMotionProvider }
