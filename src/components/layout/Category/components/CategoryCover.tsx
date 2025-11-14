'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'
import { m } from 'framer-motion'

interface CategoryCoverProps {
  className?: string
}

export function CategoryCover({ className }: CategoryCoverProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <CategoryImage className={cn('h-[200px] md:h-[280px]', className)} />
    </m.div>
  )
}
