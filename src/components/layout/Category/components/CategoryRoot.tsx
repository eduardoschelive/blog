'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import type { ReactNode } from 'react'
import { CategoryContext } from '../context'

interface CategoryRootProps {
  category?: CategoryWithArticles
  children: ReactNode
  className?: string
  fallback?: ReactNode
}

const SkeletonFallback = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="w-full h-96 bg-linear-to-br from-primary/10 via-secondary/10 to-primary/10 flex items-center justify-center relative overflow-hidden animate-pulse">
      <div className="text-center relative z-10">
        <div className="text-9xl mb-4 opacity-30">📚</div>
        <div className="text-sm text-foreground/30 uppercase tracking-wider font-bold">
          Loading Category...
        </div>
      </div>
    </div>
  </div>
)

export function CategoryRoot({
  category,
  children,
  className = '',
  fallback,
}: CategoryRootProps) {
  if (!category) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <SkeletonFallback className={className} />
    )
  }

  return (
    <CategoryContext.Provider value={{ category }}>
      <div className={className}>{children}</div>
    </CategoryContext.Provider>
  )
}
