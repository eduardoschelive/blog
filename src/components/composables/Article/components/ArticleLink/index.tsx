'use client'

import { useArticle } from '../../context'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import type { ComponentProps, ReactNode } from 'react'

interface ArticleLinkProps
  extends Omit<ComponentProps<typeof AnimatedLink>, 'href'> {
  children: ReactNode
}

const buildArticleUrl = (categorySlug: string, articleSlug: string): string => {
  return `/categories/${categorySlug}/articles/${articleSlug}`
}

function ArticleLink({ children, ...props }: ArticleLinkProps) {
  const { article } = useArticle()

  const href = buildArticleUrl(article.category.slug, article.slug)

  return (
    <AnimatedLink href={href} {...props}>
      {children}
    </AnimatedLink>
  )
}

export { ArticleLink }
