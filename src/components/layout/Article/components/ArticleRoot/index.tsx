'use client'

import type { Article } from '@/types/article.type'
import type { ReactNode } from 'react'
import { ArticleContext } from '../../context'

interface ArticleRootProps {
  article: Article
  children: ReactNode
  className?: string
}

export function ArticleRoot({
  article,
  children,
  className = '',
}: ArticleRootProps) {
  return (
    <ArticleContext.Provider value={{ article }}>
      <div className={className}>{children}</div>
    </ArticleContext.Provider>
  )
}
