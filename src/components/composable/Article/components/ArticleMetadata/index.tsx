'use client'

import { ArticleDate } from '../ArticleDate'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/animated/FadeIn'
import { useArticle } from '../../context'
import { Link } from '@/i18n/navigation'

export function ArticleMetadata() {
  const t = useTranslations('Article')
  const { article } = useArticle()

  return (
    <FadeIn direction="up" delay={0.6} fast>
      <div className="text-sm mb-4">
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
      </div>
    </FadeIn>
  )
}
