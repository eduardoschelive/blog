import type { SortOptions } from '@/types/sort.type'
import { createSortFunction } from './sort'

/**
 * Checks if a nested object matches the filter criteria
 * @param obj - The object to check
 * @param filter - The filter criteria
 * @returns True if all filter criteria match
 */
function matchesNestedFilter(obj: unknown, filter: unknown): boolean {
  if (filter === null || filter === undefined) {
    return obj === filter
  }

  if (typeof filter !== 'object' || Array.isArray(filter)) {
    return obj === filter
  }

  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false
  }

  for (const [key, value] of Object.entries(filter)) {
    const objValue = (obj as Record<string, unknown>)[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if (!matchesNestedFilter(objValue, value)) {
        return false
      }
    } else {
      if (objValue !== value) {
        return false
      }
    }
  }

  return true
}

/**
 * Applies a filter to an array based on field-value pairs (supports nested objects)
 * @param items - Array of items to filter
 * @param filter - Object with field-value pairs to match (supports { category: { slug: 'value' } })
 * @returns Filtered array
 * @example
 * applyFilter(articles, { category: { slug: 'javascript' } })
 */
export function applyFilter<T extends Record<string, unknown>>(
  items: T[],
  filter?: Record<string, unknown>
): T[] {
  if (!filter || Object.keys(filter).length === 0) {
    return items
  }

  return items.filter((item) => {
    for (const [key, value] of Object.entries(filter)) {
      if (value !== undefined) {
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          if (!matchesNestedFilter(item[key], value)) {
            return false
          }
        } else {
          if (item[key] !== value) {
            return false
          }
        }
      }
    }
    return true
  })
}

/**
 * Applies sorting to an array (mutates original)
 * @param items - Array of items to sort
 * @param sort - Sort options with field and direction
 * @returns Sorted array
 * @example
 * applySort(articles, { field: 'title', direction: 'ASC' })
 */
export function applySort<T>(items: T[], sort?: SortOptions<T>): T[] {
  if (!sort) {
    return items
  }

  const sortFunction = createSortFunction<T>(sort)
  return items.sort(sortFunction)
}

/**
 * Applies a limit to an array (undefined = no limit)
 * @param items - Array of items to limit
 * @param limit - Maximum number of items to return
 * @returns Limited array
 * @example
 * applyLimit(articles, 10)
 */
export function applyLimit<T>(items: T[], limit?: number): T[] {
  if (!limit || limit <= 0) {
    return items
  }

  return items.slice(0, limit)
}

/**
 * Applies filter, sort and limit in sequence
 * @param items - Array of items to process
 * @param options - Object with optional filter, sort and limit
 * @returns Processed array
 * @example
 * applyCollection(articles, { filter: { category: { slug: 'js' } }, sort: { field: 'title', direction: 'ASC' }, limit: 5 })
 */
export function applyCollection<T extends Record<string, unknown>>(
  items: T[],
  options?: {
    filter?: Record<string, unknown>
    sort?: SortOptions<T>
    limit?: number
  }
): T[] {
  if (!options) {
    return items
  }

  let result = items

  if (options.filter) {
    result = applyFilter(result, options.filter)
  }

  if (options.sort) {
    result = applySort(result, options.sort)
  }

  if (options.limit) {
    result = applyLimit(result, options.limit)
  }

  return result
}
