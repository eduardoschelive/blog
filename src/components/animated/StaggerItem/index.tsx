'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants/animations'

interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: StaggerItemProps) {
  const directions = {
    up: { y: ANIMATION_CONFIG.distance.medium },
    down: { y: -ANIMATION_CONFIG.distance.medium },
    left: { x: -ANIMATION_CONFIG.distance.medium },
    right: { x: ANIMATION_CONFIG.distance.medium },
  }

  return (
    <m.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: ANIMATION_CONFIG.duration.fast,
            ease: ANIMATION_CONFIG.easing.bounce,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
