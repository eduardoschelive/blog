'use client'

import { ArticleDate } from '../ArticleDate'
import { ArticleReadingTime } from '../ArticleReadingTime'
import { useTranslations } from 'next-intl'
import { useArticle } from '../../context'
import { Link } from '@/i18n/navigation'

export function ArticleMetadata() {
  const t = useTranslations('Article')
  const { article } = useArticle()

  return (
    <div className="text-sm mb-6 space-y-3">
      <p className="flex flex-wrap items-center gap-1.5 text-foreground/70">
        <span>{t('filedUnder')}</span>
        <Link
          href={`/categories/${article.category.slug}`}
          className="font-medium text-primary hover:underline"
        >
          {article.category.title}
        </Link>
        <span>{t('on')}</span>
        <ArticleDate />
      </p>

      <ArticleReadingTime />
    </div>
  )
}
