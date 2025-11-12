'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { createContext, useContext, type ReactNode } from 'react'

interface CategoryCardContextValue {
  category: CategoryWithArticles
}

const CategoryCardContext = createContext<CategoryCardContextValue | null>(null)

export const useCategoryCard = () => {
  const context = useContext(CategoryCardContext)
  if (!context) {
    throw new Error(
      'CategoryCard components must be used within CategoryCardRoot'
    )
  }
  return context
}

interface CategoryCardRootProps {
  category: CategoryWithArticles
  children: ReactNode
  className?: string
}

export function CategoryCardRoot({
  category,
  children,
  className = '',
}: CategoryCardRootProps) {
  return (
    <CategoryCardContext.Provider value={{ category }}>
      <LazyMotion features={domAnimation} strict>
        <m.article className={className}>{children}</m.article>
      </LazyMotion>
    </CategoryCardContext.Provider>
  )
}
