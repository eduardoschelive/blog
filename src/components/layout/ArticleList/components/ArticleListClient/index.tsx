'use client'

import type { Article } from '@/types/article.type'
import { useTranslations } from 'next-intl'
import { AnimatedArticleCard } from '../AnimatedArticleCard'

interface ArticleListClientProps {
  articles: Article[]
}

function ArticleListClient({ articles }: ArticleListClientProps) {
  const t = useTranslations('HomePage.latest')

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-8">
          {articles.map((article) => (
            <AnimatedArticleCard
              key={`${article.slug}-${article.locale}`}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { ArticleListClient }
