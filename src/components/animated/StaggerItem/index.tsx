'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants/animations'

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: ANIMATION_CONFIG.distance.medium },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: ANIMATION_CONFIG.duration.fast,
        ease: ANIMATION_CONFIG.easing.bounce,
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
