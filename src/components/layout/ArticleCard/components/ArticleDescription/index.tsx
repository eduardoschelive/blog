'use client'

import { useArticleCard } from '../ArticleRoot'
import { cn } from '@heroui/react'
import type { HTMLAttributes, ReactNode } from 'react'

interface ArticleDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

function ArticleDescription({
  className,
  children,
  ...props
}: ArticleDescriptionProps) {
  const { article } = useArticleCard()
  const content = children ?? article.description

  if (!content) {
    return null
  }

  return (
    <p className={cn('text-muted-foreground', className)} {...props}>
      {content}
    </p>
  )
}

export { ArticleDescription }
