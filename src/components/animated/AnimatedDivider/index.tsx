'use client'

import { m } from 'framer-motion'
import { GradientDivider } from '@/components/ui/GradientDivider'

export function AnimatedDivider() {
  return (
    <m.div
      initial={{ width: '0%' }}
      animate={{ width: '100%' }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.4,
      }}
      className="mb-6"
    >
      <GradientDivider />
    </m.div>
  )
}
