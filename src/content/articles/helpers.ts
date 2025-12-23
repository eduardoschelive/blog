import type { Article } from '@/types/article.type'
import type { CategoryBase } from '@/types/category.type'
import type { Locale } from 'next-intl'
import { articleLoader } from '../loaders'

/**
 * @example
 * getArticleSequence("1.nodejs-apis") // 1
 * getArticleSequence("42.python-fastapi") // 42
 * getArticleSequence("nodejs-apis") // null
 */
export function getArticleSequence(slug: string): number | null {
  const match = slug.match(/^(\d+)\./)
  return match ? Number.parseInt(match[1], 10) : null
}

/**
 * @example
 * getArticleNameWithoutSequence("1.nodejs-apis") // "nodejs-apis"
 * getArticleNameWithoutSequence("42.python-fastapi") // "python-fastapi"
 * getArticleNameWithoutSequence("nodejs-apis") // "nodejs-apis"
 */
export function getArticleNameWithoutSequence(slug: string): string {
  return slug.replace(/^\d+\./, '')
}

/**
 * Loads and sorts articles by sequence number from a specific category
 *
 * @example
 * const categoryInfo = await loadCategoryInfo('web-servers', 'en-US')
 * const articles = await loadArticlesFromCategory('web-servers', categoryInfo, 'en-US')
 */
export async function loadArticlesFromCategory(
  categorySlug: string,
  categoryInfo: CategoryBase,
  locale: Locale
): Promise<Article[]> {
  return articleLoader.loadFromCategory(categorySlug, categoryInfo, locale)
}
