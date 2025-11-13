'use client'

import type { Article } from '@/types/article.type'
import type { ReactNode } from 'react'
import { ArticleContext } from '../../context'

interface ArticleRootProps {
  article?: Article
  children: ReactNode
  className?: string
  fallback?: ReactNode
}

const SkeletonFallback = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="w-full h-56 bg-linear-to-br from-primary/10 via-secondary/10 to-primary/10 flex items-center justify-center relative overflow-hidden animate-pulse">
      <div className="text-center relative z-10">
        <div className="text-6xl mb-3 opacity-30">📰</div>
        <div className="text-sm text-foreground/30 uppercase tracking-wider font-bold">
          Loading...
        </div>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-foreground/10 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-foreground/10 rounded animate-pulse w-full" />
      <div className="h-4 bg-foreground/10 rounded animate-pulse w-5/6" />
      <div className="h-3 bg-foreground/10 rounded animate-pulse w-24 mt-4" />
    </div>
  </div>
)

export function ArticleRoot({
  article,
  children,
  className = '',
  fallback,
}: ArticleRootProps) {
  if (!article) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <SkeletonFallback className={className} />
    )
  }

  return (
    <ArticleContext.Provider value={{ article }}>
      <div className={className}>{children}</div>
    </ArticleContext.Provider>
  )
}
