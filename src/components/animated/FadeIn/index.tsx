'use client'

import { m, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { ANIMATION_CONFIG } from '@/constants/animations'
import { useRef } from 'react'

interface FadeInProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  fast?: boolean
  style?: React.CSSProperties
  inView?: boolean
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  className,
  fast = false,
  style,
  inView = false,
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const directions = {
    up: { y: ANIMATION_CONFIG.distance.medium },
    down: { y: -ANIMATION_CONFIG.distance.medium },
    left: { x: -ANIMATION_CONFIG.distance.medium },
    right: { x: ANIMATION_CONFIG.distance.medium },
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const transition = {
    duration: fast
      ? ANIMATION_CONFIG.duration.fast
      : ANIMATION_CONFIG.duration.standard,
    ease: fast
      ? ANIMATION_CONFIG.easing.bounce
      : ANIMATION_CONFIG.easing.standard,
    delay,
  }

  const shouldAnimate = inView ? isInView : true

  return (
    <m.div
      ref={inView ? ref : undefined}
      initial={
        isMobile ? { opacity: 0 } : { opacity: 0, ...directions[direction] }
      }
      animate={
        shouldAnimate
          ? { opacity: 1, x: 0, y: 0 }
          : isMobile
            ? { opacity: 0 }
            : { opacity: 0, ...directions[direction] }
      }
      transition={
        isMobile
          ? { ...transition, duration: transition.duration * 0.6 }
          : transition
      }
      className={className}
      style={style}
    >
      {children}
    </m.div>
  )
}
