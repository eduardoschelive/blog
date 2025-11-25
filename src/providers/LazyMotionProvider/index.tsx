'use client'

import { domAnimation, LazyMotion, MotionGlobalConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface LazyMotionProviderProps {
  children: ReactNode
}

export function LazyMotionProvider({ children }: LazyMotionProviderProps) {
  useEffect(() => {
    const isBot =
      /bot|crawler|spider|lighthouse|headless/i.test(navigator.userAgent) ||
      navigator.webdriver

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Reduce animations on mobile for better performance
    const isMobile = window.innerWidth < 768

    if (isBot || prefersReducedMotion) {
      MotionGlobalConfig.skipAnimations = true
    } else if (isMobile) {
      // Reduce animation complexity on mobile
      MotionGlobalConfig.reducedMotion = 'user'
    }
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
