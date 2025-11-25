'use client'

import { domAnimation, LazyMotion, MotionGlobalConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

interface LazyMotionProviderProps {
  children: ReactNode
}

export function LazyMotionProvider({ children }: LazyMotionProviderProps) {
  const { isMobile } = useIsMobile()

  useEffect(() => {
    const isBot =
      /bot|crawler|spider|lighthouse|headless/i.test(navigator.userAgent) ||
      navigator.webdriver

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (isBot || prefersReducedMotion || isMobile) {
      MotionGlobalConfig.skipAnimations = true
    }
  }, [isMobile])

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
