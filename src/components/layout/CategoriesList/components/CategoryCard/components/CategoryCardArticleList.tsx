'use client'

import { useCategoryCard } from './CategoryCardRoot'
import { PREVIEW_ARTICLES_LIMIT } from '@/constants/content'
import { Link } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { HiDocumentText } from 'react-icons/hi2'

export function CategoryCardArticleList() {
  const { category } = useCategoryCard()
  const t = useTranslations('Categories')

  const previewArticles = useMemo(
    () => category.articles.slice(0, PREVIEW_ARTICLES_LIMIT),
    [category.articles]
  )

  const hasArticles = previewArticles.length > 0

  if (!hasArticles) {
    return (
      <div className="text-center py-8 flex-1 flex items-center justify-center">
        <p className="text-foreground/50">{t('comingSoon')}</p>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm font-semibold text-primary mb-4">
        📍 {t('startHere')}
      </p>

      <div className="space-y-3 mb-6">
        {previewArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/categories/${category.slug}/articles/${article.slug}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-content2 transition-colors group"
            aria-label={`Read article: ${article.title}`}
          >
            <div
              className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center
                         group-hover:bg-primary/20 transition-colors"
            >
              {article.sequence ? (
                <span className="text-primary font-bold">
                  {article.sequence}
                </span>
              ) : (
                <HiDocumentText className="text-primary text-xl" />
              )}
            </div>
            <p className="flex-1 min-w-0 font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
