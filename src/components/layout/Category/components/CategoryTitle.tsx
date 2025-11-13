'use client'

import { useCategory } from '../context'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'

interface CategoryTitleProps {
  className?: string
  icon?: ReactNode
}

export function CategoryTitle({ className, icon }: CategoryTitleProps) {
  const { category } = useCategory()
  return (
    <h1
      className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4',
        className
      )}
    >
      {icon}
      {category.title}
    </h1>
  )
}
