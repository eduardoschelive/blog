'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import { useTranslations } from 'next-intl'
import type { HTMLAttributes } from 'react'
import { HiClock } from 'react-icons/hi2'
export function ArticleReadingTime({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { article } = useArticle()
  const t = useTranslations('Article')

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-foreground/60',
        className
      )}
      {...props}
    >
      <HiClock className="w-3.5 h-3.5" />
      {t('readingTime', { minutes: article.readingTime })}
    </span>
  )
}
