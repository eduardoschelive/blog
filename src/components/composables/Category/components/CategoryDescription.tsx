'use client'

import { useCategory } from '../context'
import { cn } from '@heroui/react'

interface CategoryDescriptionProps {
  className?: string
}

export function CategoryDescription({ className }: CategoryDescriptionProps) {
  const { category } = useCategory()

  if (!category.description) {
    return null
  }

  return (
    <p
      className={cn(
        'text-lg md:text-xl text-foreground/70 leading-relaxed',
        className,
        className
      )}
    >
      {category.description}
    </p>
  )
}
