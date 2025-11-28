import { ARTICLES_DIR } from '@/constants/content'
import type { Article } from '@/types/article.type'
import type { SortOptions } from '@/types/sort.type'
import { applyCollection } from '@/utils/collection'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { loadCategoryInfo } from '../categories/helpers'
import { loadArticlesFromCategory } from './helpers'

export type ArticleFilter = Partial<Article> & {
  categorySlug?: string
}

export type ArticleOptions = {
  limit?: number
  sort?: SortOptions<Article>
  filter?: ArticleFilter
}

const DEFAULT_ARTICLE_OPTIONS: ArticleOptions = {
  sort: {
    field: 'createdAt',
    direction: 'DESC',
  },
}

/**
 * @example
 * const articles = await getArticles('en-US', { filter: { categorySlug: 'javascript' }, sort: { field: 'createdAt', direction: 'DESC' }, limit: 5 })
 */
export async function getArticles(
  locale: Locale,
  options?: ArticleOptions
): Promise<Article[]> {
  const config = {
    ...DEFAULT_ARTICLE_OPTIONS,
    ...options,
  }

  const categoryFolders = readdirSync(ARTICLES_DIR).filter((item) => {
    const itemPath = path.join(ARTICLES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  const articlesByCategory = await Promise.all(
    categoryFolders
      .filter(
        (categorySlug) =>
          !config.filter?.categorySlug ||
          categorySlug === config.filter.categorySlug
      )
      .map(async (categorySlug) => {
        const categoryInfo = await loadCategoryInfo(categorySlug, locale)
        return loadArticlesFromCategory(categorySlug, categoryInfo, locale)
      })
  )

  const articles = articlesByCategory.flat()

  const { categorySlug: _categorySlug, ...otherFilters } = config.filter || {}
  return applyCollection(articles as unknown as Record<string, unknown>[], {
    filter: otherFilters,
    sort: config.sort as unknown as SortOptions<Record<string, unknown>>,
    limit: config.limit,
  }) as unknown as Article[]
}
