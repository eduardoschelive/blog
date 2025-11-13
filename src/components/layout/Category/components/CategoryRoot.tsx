'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import type { ReactNode } from 'react'
import { CategoryContext } from '../context'

interface CategoryRootProps {
  category: CategoryWithArticles
  children: ReactNode
  className?: string
}

export function CategoryRoot({
  category,
  children,
  className = '',
}: CategoryRootProps) {
  return (
    <CategoryContext.Provider value={{ category }}>
      <div className={className}>{children}</div>
    </CategoryContext.Provider>
  )
}
