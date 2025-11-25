'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants/animations'

interface ScaleInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <m.div
      initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: isMobile
          ? ANIMATION_CONFIG.duration.fast
          : ANIMATION_CONFIG.duration.standard,
        ease: ANIMATION_CONFIG.easing.standard,
        delay: isMobile ? delay * 0.5 : delay,
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
