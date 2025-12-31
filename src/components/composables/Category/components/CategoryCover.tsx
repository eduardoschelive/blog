'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'

interface CategoryCoverProps {
  className?: string
}

export function CategoryCover({ className }: CategoryCoverProps) {
  return (
    <CategoryImage
      className={cn('h-[250px] md:h-[350px] lg:h-[400px]', className)}
    />
  )
}
