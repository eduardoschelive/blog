'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import { createContext, useContext } from 'react'

interface CategoryContextValue {
  category: CategoryWithArticles
}

const CategoryContext = createContext<CategoryContextValue | null>(null)

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('Category components must be used within CategoryRoot')
  }
  return context
}

export { CategoryContext }
