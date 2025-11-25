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

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth < 768
    const isMobileUA =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

    const isMobile = (isTouchDevice && isSmallScreen) || isMobileUA

    if (isBot || prefersReducedMotion || isMobile) {
      MotionGlobalConfig.skipAnimations = true
    }
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
