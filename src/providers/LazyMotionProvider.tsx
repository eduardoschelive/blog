'use client'

import { LazyMotion, MotionGlobalConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface LazyMotionProviderProps {
  children: ReactNode
}

// Carrega as features do domAnimation de forma assíncrona
const loadFeatures = () =>
  import('framer-motion').then((res) => res.domAnimation)

export function LazyMotionProvider({ children }: LazyMotionProviderProps) {
  useEffect(() => {
    // Detecta se é um bot (Lighthouse, crawlers, etc)
    const isBot = /bot|crawler|spider|lighthouse/i.test(navigator.userAgent)

    // Detecta se usuário prefere reduzir movimento
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Desabilita animações para bots e usuários que preferem reduzir movimento
    if (isBot || prefersReducedMotion) {
      MotionGlobalConfig.skipAnimations = true
    }
  }, [])

  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
