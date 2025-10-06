import { ARTICLES_DIR } from '@/constants/content'
import { articleSchema, type Article } from '@/schemas/article.schema'
import { getGitFileDates } from '@/utils/gitDates'
import type { Locale } from 'next-intl'
import path from 'node:path'
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

  const articleFile = path.join(
    ARTICLES_DIR,
    categorySlug,
    articleSlug,
    `${locale}.mdx`
  )

  // Get Git dates
  const gitDates = getGitFileDates(articleFile)

  return {
    ...article,
    slug: articleSlug,
    categorySlug,
    locale,
    createdAt: gitDates?.createdAt || null,
    updatedAt: gitDates?.updatedAt || null,
  }
}

export { getArticleBySlug }
