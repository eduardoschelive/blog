'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'

interface CategoryCoverProps {
  className?: string
}

export function CategoryCover({ className }: CategoryCoverProps) {
  return <CategoryImage className={cn('h-[200px] md:h-[280px]', className)} />
}
