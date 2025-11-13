'use client'

import { useArticle } from '../../context'
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
  const { article } = useArticle()
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
