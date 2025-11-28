import { CATEGORIES_DIR } from '@/constants/content'
import type { Category, CategoryWithArticles } from '@/types/category.type'
import type { SortOptions } from '@/types/sort.type'
import { applyCollection } from '@/utils/collection'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { loadArticlesFromCategory } from '../articles/helpers'
import { loadCategory, loadCategoryInfo } from './helpers'

export type CategoryFilter = Partial<Category>

export type CategoryOptions<T extends boolean = false> = {
  limit?: number
  sort?: SortOptions<T extends true ? CategoryWithArticles : Category>
  withArticles?: T
  filter?: CategoryFilter
}

const DEFAULT_CATEGORY_OPTIONS: CategoryOptions<false> = {
  sort: {
    field: 'title',
    direction: 'ASC',
  },
  withArticles: false,
}

/**
 * @example
 * const categories = await getCategories('en-US', { withArticles: true, filter: { slug: 'javascript' }, limit: 5 })
 */
export async function getCategories<T extends boolean = false>(
  locale: Locale,
  options?: Partial<CategoryOptions<T>>
): Promise<T extends true ? CategoryWithArticles[] : Category[]> {
  const config = {
    ...DEFAULT_CATEGORY_OPTIONS,
    ...options,
  } as CategoryOptions<T>

  const categoryFolders = readdirSync(CATEGORIES_DIR).filter((item) => {
    const itemPath = path.join(CATEGORIES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  const categoriesPromises = categoryFolders
    .filter((categorySlug) => {
      if (config.filter?.slug && categorySlug !== config.filter.slug) {
        return false
      }

      const categoryPath = path.join(CATEGORIES_DIR, categorySlug)
      const files = readdirSync(categoryPath).filter((file) =>
        file.endsWith('.mdx')
      )

      const localeFile = `${locale}.mdx`
      return files.includes(localeFile)
    })
    .map(async (categorySlug) => {
      try {
        const category = await loadCategory(categorySlug, locale)

        if (config.withArticles) {
          const categoryInfo = await loadCategoryInfo(categorySlug, locale)
          const articles = await loadArticlesFromCategory(
            categorySlug,
            categoryInfo,
            locale
          )

          const categoryWithArticles: CategoryWithArticles = {
            ...category,
            articles,
          }

          return categoryWithArticles
        } else {
          return category
        }
      } catch (error) {
        console.warn(`Failed to load category ${categorySlug}:`, error)
        return null
      }
    })

  const categoriesResults = await Promise.all(categoriesPromises)
  const categories = categoriesResults.filter(
    (cat): cat is Category | CategoryWithArticles => cat !== null
  )

  const { slug: _slug, ...otherFilters } = config.filter || {}
  const result = applyCollection(
    categories as unknown as Record<string, unknown>[],
    {
      filter: otherFilters,
      sort: config.sort as unknown as SortOptions<Record<string, unknown>>,
      limit: config.limit,
    }
  )

  return result as unknown as T extends true
    ? CategoryWithArticles[]
    : Category[]
}
