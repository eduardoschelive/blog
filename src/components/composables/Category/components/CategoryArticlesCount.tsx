'use client'

import { useTranslations } from 'next-intl'
import { useCategory } from '../context'
import { cn } from '@heroui/react'

interface CategoryArticlesCountProps {
  className?: string
}

export function CategoryArticlesCount({
  className,
}: CategoryArticlesCountProps) {
  const { category } = useCategory()
  const t = useTranslations('Categories')

  if (category.articles.length <= 1) {
    return null
  }

  return (
    <div className={cn('mt-6 pt-4 border-t border-divider', className)}>
      <p className="text-xs text-foreground/50 text-center'">
        {t('articlesCount', { count: category.articles.length })}
      </p>
    </div>
  )
}
