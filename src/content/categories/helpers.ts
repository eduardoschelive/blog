import type { Category, CategoryBase } from '@/types/category.type'
import type { Locale } from 'next-intl'
import { categoryLoader } from '../loaders'

/**
 * Loads minimal category info (without compiled MDX content)
 * Useful for loading category references in articles
 * Results are cached via React's cache()
 *
 * @example
 * const categoryInfo = await loadCategoryInfo('javascript', 'en-US')
 * console.log(categoryInfo.title) // "JavaScript"
 */
export async function loadCategoryInfo(
  categorySlug: string,
  locale: Locale
): Promise<CategoryBase & { slug: string }> {
  return categoryLoader.loadInfo(categorySlug, locale)
}

/**
 * Loads full category data including compiled MDX content
 * Use this when you need to render the category page
 *
 * @param categorySlug - The category slug
 * @param locale - The locale
 * @returns Category with full content
 *
 * @example
 * const category = await loadCategory('javascript', 'en-US')
 * console.log(category.content) // React element
 */
export async function loadCategory(
  categorySlug: string,
  locale: Locale
): Promise<Category> {
  const result = await categoryLoader.loadOne(categorySlug, locale)

  if (!result) {
    throw new Error(
      `Category "${categorySlug}" not found for locale "${locale}"`
    )
  }

  return result
}
