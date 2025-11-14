'use client'

import { CategoryImage } from './CategoryImage'
import { cn } from '@heroui/react'
import { FadeIn } from '@/components/animated/FadeIn'

interface CategoryCoverProps {
  className?: string
}

export function CategoryCover({ className }: CategoryCoverProps) {
  return (
    <FadeIn direction="up">
      <CategoryImage className={cn('h-[200px] md:h-[280px]', className)} />
    </FadeIn>
  )
}
