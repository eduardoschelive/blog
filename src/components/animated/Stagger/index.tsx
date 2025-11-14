'use client'

import { m, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

interface StaggerProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Stagger({ children, delay = 0.1, className }: StaggerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
