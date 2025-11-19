'use client'

import { useArticle } from '../../context'
import { cn, Tooltip } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import type { HTMLAttributes, ReactNode } from 'react'
import { formatDate, DEFAULT_DATE_FORMAT } from '@/utils/date'
import { TbCalendar } from 'react-icons/tb'

interface ArticleDateProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  format?: Intl.DateTimeFormatOptions
  showIcon?: boolean
  showUpdatedTooltip?: boolean
}

function ArticleDate({
  className,
  children,
  format = DEFAULT_DATE_FORMAT,
  showIcon,
  showUpdatedTooltip = false,
  ...props
}: ArticleDateProps) {
  const { article } = useArticle()
  const locale = useLocale()
  const t = useTranslations('Article')

  const formattedDate = formatDate(article.createdAt, locale, format)
  const formattedUpdatedDate = formatDate(article.updatedAt, locale, format)
  const content = children ?? formattedDate ?? t('dateNotAvailable')

  const dateTime = article.createdAt
    ? typeof article.createdAt === 'string'
      ? article.createdAt
      : article.createdAt.toISOString()
    : undefined

  const hasUpdated =
    article.updatedAt &&
    article.createdAt &&
    article.updatedAt.getTime() !== article.createdAt.getTime()

  const dateElement = (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-foreground/60',
        showUpdatedTooltip && hasUpdated && 'cursor-help',
        className
      )}
      {...props}
    >
      {showIcon && <TbCalendar className="w-3.5 h-3.5" />}
      <time dateTime={dateTime}>{content}</time>
    </span>
  )

  if (showUpdatedTooltip && hasUpdated && formattedUpdatedDate) {
    return (
      <Tooltip
        content={t('updatedAt', { date: formattedUpdatedDate })}
        delay={500}
        closeDelay={200}
      >
        {dateElement}
      </Tooltip>
    )
  }

  return dateElement
}

export { ArticleDate }
