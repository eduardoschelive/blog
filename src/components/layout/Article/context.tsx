'use client'

import type { Article } from '@/types/article.type'
import { createContext, useContext } from 'react'

interface ArticleContextValue {
  article: Article
}

const ArticleContext = createContext<ArticleContextValue | null>(null)

export const useArticle = () => {
  const context = useContext(ArticleContext)
  if (!context) {
    throw new Error('Article components must be used within ArticleRoot')
  }
  return context
}

export { ArticleContext }
