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
 * Fetches all categories for a given locale with flexible sorting, filtering and limiting options
 * @param locale - The locale to fetch categories for
 * @param options - Optional configuration for filtering, limiting, sorting and loading articles
 * @returns Promise<Category[]> or Promise<CategoryWithArticles[]> depending on withArticles option
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

  const categories: (Category | CategoryWithArticles)[] = []

  try {
    const categoryFolders = readdirSync(CATEGORIES_DIR).filter((item) => {
      const itemPath = path.join(CATEGORIES_DIR, item)
      return statSync(itemPath).isDirectory()
    })

    for (const categorySlug of categoryFolders) {
      if (config.filter?.slug && categorySlug !== config.filter.slug) {
        continue
      }

      const categoryPath = path.join(CATEGORIES_DIR, categorySlug)
      const files = readdirSync(categoryPath).filter((file) =>
        file.endsWith('.mdx')
      )

      const localeFile = `${locale}.mdx`
      if (!files.includes(localeFile)) {
        continue
      }

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

          categories.push(categoryWithArticles)
        } else {
          categories.push(category)
        }
      } catch {
        continue
      }
    }

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
  } catch {
    return [] as unknown as T extends true ? CategoryWithArticles[] : Category[]
  }
}
