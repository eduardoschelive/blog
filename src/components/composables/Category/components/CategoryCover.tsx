'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'
import { ScaleIn } from '@/components/animated/ScaleIn'

interface CategoryCoverProps {
  className?: string
}

export function CategoryCover({ className }: CategoryCoverProps) {
  return (
    <ScaleIn>
      <CategoryImage className={cn('h-[200px] md:h-[280px]', className)} />
    </ScaleIn>
  )
}
