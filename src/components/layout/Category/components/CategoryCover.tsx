'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'

interface CategoryCoverProps {
  className?: string
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
}

export function CategoryCover({
  className,
  iconSize = 'xl',
}: CategoryCoverProps) {
  return (
    <CategoryImage
      className={cn('h-[200px] md:h-[280px]', className)}
      iconSize={iconSize}
    />
  )
}
