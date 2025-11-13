'use client'

import { ArticleDate } from '../ArticleDate'
import { ArticleReadingTime } from '../ArticleReadingTime'
import { ArticleCategory } from '../ArticleCategory'
import { m } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function ArticleMetadata() {
  const t = useTranslations('Article')

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.6,
      }}
      className="text-sm text-foreground/70 mb-6 flex items-center justify-between flex-wrap gap-4"
    >
      <p className="flex flex-wrap items-center gap-1.5 italic">
        <span>{t('filedUnder')}</span>
        <ArticleCategory />
        <span>{t('on')}</span>
        <ArticleDate />
      </p>
      <ArticleReadingTime className="text-foreground/60" />
    </m.div>
  )
}
