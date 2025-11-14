'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import type { HTMLAttributes } from 'react'
import { FadeIn } from '@/components/animated/FadeIn'

export function ArticleContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { article } = useArticle()

  return (
    <FadeIn direction="up" delay={0.2} inView>
      <article className={cn('max-w-none prose', className)} {...props}>
        {article.content}
      </article>
    </FadeIn>
  )
}
