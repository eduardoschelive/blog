'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants/animations'

interface RotateInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function RotateIn({ children, delay = 0, className }: RotateInProps) {
  return (
    <m.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: ANIMATION_CONFIG.duration.standard,
        ease: ANIMATION_CONFIG.easing.standard,
        delay,
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
