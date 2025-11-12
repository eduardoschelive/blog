'use client'

import { useCategoryCard } from './CategoryCardRoot'
import { Link } from '@heroui/react'
import { useTranslations } from 'next-intl'

export function CategoryCardHeader() {
  const { category } = useCategoryCard()
  const t = useTranslations('Categories')
  const categoryUrl = `/categories/${category.slug}`

  return (
    <div className="mb-4">
      <Link
        href={categoryUrl}
        className="text-3xl font-bold mb-2 hover:text-primary transition-colors block"
      >
        {category.title}
      </Link>
      <p className="text-sm text-foreground/60">
        {t('articlesInTrail', { count: category.articles.length })}
      </p>
    </div>
  )
}
