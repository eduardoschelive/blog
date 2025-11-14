'use client'

import type { Article } from '@/types/article.type'
import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { ArticleCard } from '@/components/layout/ArticleCard'
import { Link } from '@/i18n/navigation'

interface ArticleListClientProps {
  articles: Article[]
}

function ArticleListClient({ articles }: ArticleListClientProps) {
  const t = useTranslations('HomePage.latest')

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
      </div>

      <div className="grid gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={`${article.slug}-${article.locale}`}
            article={article}
            showCategoryChip
            showDateIcon
            linkText={t('readMore')}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          as={Link}
          href="/articles"
          color="primary"
          size="lg"
          className="font-semibold"
        >
          {t('viewAll')} →
        </Button>
      </div>
    </section>
  )
}

export { ArticleListClient }
