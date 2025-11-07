export type SortDirection = 'ASC' | 'DESC'

export type SortOptions<T> = {
  field: keyof T
  direction: SortDirection
}

export type SortFunction<T> = (a: T, b: T) => number
