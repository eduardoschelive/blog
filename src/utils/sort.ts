import type { SortOptions } from '@/types/sort.type'

/**
 * Creates a reusable sort function based on the provided sort options
 * @param options - The sort options containing field and direction
 * @returns A comparison function that can be used with Array.sort()
 * @example
 * const sortFn = createSortFunction({ field: 'title', direction: 'ASC' })
 * articles.sort(sortFn)
 */
export function createSortFunction<T>(
  options: SortOptions<T>
): (a: T, b: T) => number {
  const { field, direction } = options
  const multiplier = direction === 'ASC' ? 1 : -1

  return (a: T, b: T): number => {
    const aValue = a[field]
    const bValue = b[field]

    // Handle null/undefined values - always push them to the end
    if (aValue == null && bValue == null) return 0
    if (aValue == null) return 1
    if (bValue == null) return -1

    // Handle Date objects
    if (aValue instanceof Date && bValue instanceof Date) {
      return (aValue.getTime() - bValue.getTime()) * multiplier
    }

    // Handle numbers
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * multiplier
    }

    // Handle strings (case-insensitive)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return (
        aValue.localeCompare(bValue, undefined, { sensitivity: 'base' }) *
        multiplier
      )
    }

    // Handle booleans
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return (Number(aValue) - Number(bValue)) * multiplier
    }

    // Fallback: try to compare as strings
    return String(aValue).localeCompare(String(bValue)) * multiplier
  }
}

/**
 * Default sort function for articles - sorts by createdAt DESC
 * @param a - First item
 * @param b - Second item
 * @returns Comparison result
 * @example
 * articles.sort(defaultArticleSortFunction)
 */
export function defaultArticleSortFunction<
  T extends { createdAt: Date | null },
>(a: T, b: T): number {
  if (!a.createdAt && !b.createdAt) return 0
  if (!a.createdAt) return 1
  if (!b.createdAt) return -1
  return b.createdAt.getTime() - a.createdAt.getTime()
}
