'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import type { HTMLAttributes, ReactNode } from 'react'

interface ArticleTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}

function ArticleTitle({
  as: Component = 'h3',
  className,
  children,
  ...props
}: ArticleTitleProps) {
  const { article } = useArticle()

  return (
    <Component className={cn('font-semibold', className)} {...props}>
      {children || article.title}
    </Component>
  )
}

export { ArticleTitle }
