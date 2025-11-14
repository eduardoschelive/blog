'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import type { HTMLAttributes, ReactNode } from 'react'
import { formatDate, DEFAULT_DATE_FORMAT } from '@/utils/date'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

interface ArticleDateProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  format?: Intl.DateTimeFormatOptions
  showIcon?: boolean
}

function ArticleDate({
  className,
  children,
  format = DEFAULT_DATE_FORMAT,
  showIcon,
  ...props
}: ArticleDateProps) {
  const { article } = useArticle()
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
    <span
      className={cn(
        'inline-flex items-center gap-1 text-foreground/60',
        className
      )}
      {...props}
    >
      {showIcon && <HiOutlineCalendarDays className="w-3.5 h-3.5" />}
      <time dateTime={dateTime}>{content}</time>
    </span>
  )
}

export { ArticleDate }
