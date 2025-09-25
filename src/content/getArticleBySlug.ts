import { articleSchema, type Article } from '@/schemas/article.schema'
import type { Locale } from 'next-intl'
import { getContentBySlug } from './getContentBySlug'

async function getArticleBySlug(
  categorySlug: string,
  articleSlug: string,
  locale: Locale
) {
  const article = await getContentBySlug<Article>(
    categorySlug,
    articleSlug,
    locale,
    articleSchema
  )

  return article
}

export { getArticleBySlug }
