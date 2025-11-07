'use client'

import { useArticleCard } from '../ArticleRoot'
import { cn } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import type { HTMLAttributes, ReactNode } from 'react'
import { formatDate, DEFAULT_DATE_FORMAT } from '@/utils/date'

interface ArticleDateProps extends HTMLAttributes<HTMLTimeElement> {
  children?: ReactNode
  format?: Intl.DateTimeFormatOptions
}

function ArticleDate({
  className,
  children,
  format = DEFAULT_DATE_FORMAT,
  ...props
}: ArticleDateProps) {
  const { article } = useArticleCard()
  const locale = useLocale()
  const t = useTranslations('Article')

  const formattedDate = formatDate(article.createdAt, locale, format)
  const content = children ?? formattedDate ?? t('dateNotAvailable')

  const dateTime = article.createdAt
    ? typeof article.createdAt === 'string'
      ? article.createdAt
      : article.createdAt.toISOString()
    : undefined

  return (
    <time
      className={cn('text-xs text-muted-foreground', className)}
      dateTime={dateTime}
      {...props}
    >
      {content}
    </time>
  )
}

export { ArticleDate }
