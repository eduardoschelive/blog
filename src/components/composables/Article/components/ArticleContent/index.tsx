'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import type { HTMLAttributes } from 'react'

type ArticleContentProps = HTMLAttributes<HTMLDivElement>

export function ArticleContent({ className, ...props }: ArticleContentProps) {
  const { article } = useArticle()

  return (
    <article
      className={cn(
        'prose prose-invert max-w-none',
        'prose-headings:scroll-mt-24',
        'prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6',
        'prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4',
        'prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3',
        'prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2',
        'prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-code:text-secondary prose-code:bg-content2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-[#1a1b26] prose-pre:border prose-pre:border-divider/20',
        'prose-img:rounded-lg prose-img:shadow-lg',
        'prose-ul:my-6 prose-ol:my-6',
        'prose-li:text-foreground/80 prose-li:my-2',
        className
      )}
      {...props}
    >
      {article.content}
    </article>
  )
}
