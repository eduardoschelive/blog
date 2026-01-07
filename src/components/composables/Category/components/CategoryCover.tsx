'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'

interface CategoryCoverProps {
  className?: string
}

export function CategoryCover({ className }: CategoryCoverProps) {
  return (
    <CategoryImage variant="cover" className={cn('lg:h-[400px]', className)} />
  )
}
