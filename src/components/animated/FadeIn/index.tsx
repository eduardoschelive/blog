'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants/animations'

interface FadeInProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  fast?: boolean
  style?: React.CSSProperties
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  className,
  fast = false,
  style,
}: FadeInProps) {
  const directions = {
    up: { y: ANIMATION_CONFIG.distance.medium },
    down: { y: -ANIMATION_CONFIG.distance.medium },
    left: { x: -ANIMATION_CONFIG.distance.medium },
    right: { x: ANIMATION_CONFIG.distance.medium },
  }

  const transition = {
    duration: fast
      ? ANIMATION_CONFIG.duration.fast
      : ANIMATION_CONFIG.duration.standard,
    ease: fast
      ? ANIMATION_CONFIG.easing.bounce
      : ANIMATION_CONFIG.easing.standard,
    delay,
  }

  return (
    <m.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  )
}
