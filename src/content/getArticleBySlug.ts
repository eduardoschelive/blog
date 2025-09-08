import { articleSchema } from '@/schemas/article.schema'
import type { Article } from '@/types/article.type'
import type { Locale } from 'next-intl'
import { getContentBySlug } from './getContentBySlug'

async function getArticleBySlug(slug: string, locale: Locale) {
  return getContentBySlug<Article>(slug, locale, articleSchema)
}

export { getArticleBySlug }
