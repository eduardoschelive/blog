'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

export const ArticleContent = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLDivElement>
>(function ArticleContent({ className, ...props }, ref) {
  const { article } = useArticle()

  return (
    <article ref={ref} className={cn('max-w-none prose', className)} {...props}>
      {article.content}
    </article>
  )
})
