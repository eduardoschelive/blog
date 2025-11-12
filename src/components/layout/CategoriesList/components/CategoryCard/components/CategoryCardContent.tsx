'use client'

import { useCategoryCard } from './CategoryCardRoot'
import type { ReactNode } from 'react'

interface CategoryCardContentProps {
  children?: ReactNode
}

export function CategoryCardContent({ children }: CategoryCardContentProps) {
  const { category } = useCategoryCard()

  return (
    <div className="p-6 lg:p-8 flex flex-col">
      {children || (
        <p className="text-foreground/70 mb-6 line-clamp-3 text-base">
          {category.description}
        </p>
      )}
    </div>
  )
}
