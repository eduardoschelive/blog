import type { Category, CategoryWithArticles } from '@/types/category.type'
import type { Locale } from 'next-intl'
import { articleLoader, categoryLoader } from '../loaders'
import type { ContentQueryOptions } from '../core/types'

export type CategoryFilter = Partial<Category>

export type CategoryOptions<T extends boolean = false> = ContentQueryOptions<
  T extends true ? CategoryWithArticles : Category
> & {
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

export async function getCategories<T extends boolean = false>(
  locale: Locale,
  options?: Partial<CategoryOptions<T>>
): Promise<T extends true ? CategoryWithArticles[] : Category[]> {
  const config = {
    ...DEFAULT_CATEGORY_OPTIONS,
    ...options,
  } as CategoryOptions<T>

  const categories = await categoryLoader.loadAll(
    locale,
    config as ContentQueryOptions<Category>
  )

  if (!config.withArticles) {
    return categories as T extends true ? CategoryWithArticles[] : Category[]
  }

  const categoriesWithArticles = await Promise.all(
    categories.map(async (category) => {
      const categoryInfo = await categoryLoader.loadInfo(category.slug, locale)
      const articles = await articleLoader.loadFromCategory(
        category.slug,
        categoryInfo,
        locale
      )

      const categoryWithArticles: CategoryWithArticles = {
        ...category,
        articles,
      }

      return categoryWithArticles
    })
  )

  return categoriesWithArticles as T extends true
    ? CategoryWithArticles[]
    : Category[]
}
