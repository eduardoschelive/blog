'use client'

import { m } from 'framer-motion'
import { GradientDivider } from '@/components/ui/GradientDivider'

interface PageHeaderDividerProps {
  className?: string
}

export function PageHeaderDivider({ className }: PageHeaderDividerProps) {
  return (
    <m.div
      initial={{ width: '0%' }}
      animate={{ width: '100%' }}
      transition={{
        duration: 0.6,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="mb-6"
    >
      <GradientDivider className={className} />
    </m.div>
  )
}
