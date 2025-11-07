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
 * Fetches all articles for a given locale with flexible sorting, filtering and limiting options
 * @param locale - The locale to fetch articles for
 * @param options - Optional configuration for filtering, limiting and sorting
 * @returns Promise<Article[]> - Array of articles matching the criteria
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

  const articles: Article[] = []

  try {
    const categoryFolders = readdirSync(ARTICLES_DIR).filter((item) => {
      const itemPath = path.join(ARTICLES_DIR, item)
      return statSync(itemPath).isDirectory()
    })

    for (const categorySlug of categoryFolders) {
      if (
        config.filter?.categorySlug &&
        categorySlug !== config.filter.categorySlug
      ) {
        continue
      }

      const categoryInfo = await loadCategoryInfo(categorySlug, locale)

      const categoryArticles = await loadArticlesFromCategory(
        categorySlug,
        categoryInfo,
        locale
      )

      articles.push(...categoryArticles)
    }

    // Apply filter, sort and limit using collection utilities
    // categorySlug is handled during loading, other filters use deep path support
    const { categorySlug: _categorySlug, ...otherFilters } = config.filter || {}
    return applyCollection(articles as unknown as Record<string, unknown>[], {
      filter: otherFilters,
      sort: config.sort as unknown as SortOptions<Record<string, unknown>>,
      limit: config.limit,
    }) as unknown as Article[]
  } catch {
    return []
  }
}
