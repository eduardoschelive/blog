'use client'

import { m } from 'framer-motion'
import { cn } from '@heroui/react'

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
      className={cn(
        'h-1 bg-linear-to-r from-primary to-secondary rounded-full mb-6',
        className
      )}
    />
  )
}
