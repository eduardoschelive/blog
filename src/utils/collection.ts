import type { SortOptions } from '@/types/sort.type'
import { createSortFunction } from './sort'

/**
 * @example
 * applyCollection(articles, { filter: { categorySlug: 'js' }, sort: { field: 'title', direction: 'ASC' }, limit: 5 })
 */
export function applyCollection<T extends Record<string, unknown>>(
  items: T[],
  options?: {
    filter?: Record<string, unknown>
    sort?: SortOptions<T>
    limit?: number
  }
): T[] {
  let result = items

  // Simple filter - exact match only
  if (options?.filter && Object.keys(options.filter).length > 0) {
    result = result.filter((item) => {
      return Object.entries(options.filter!).every(([key, value]) => {
        return value === undefined || item[key] === value
      })
    })
  }

  // Sort
  if (options?.sort) {
    const sortFunction = createSortFunction<T>(options.sort)
    result = [...result].sort(sortFunction)
  }

  // Limit
  if (options?.limit && options.limit > 0) {
    result = result.slice(0, options.limit)
  }

  return result
}
