import type { Locale } from 'next-intl'
import type { ZodSchema } from 'zod'

/**
 * Configuration for ContentLoader
 */
export interface ContentLoaderConfig<TBase> {
  /** Base directory where content is stored */
  baseDir: string
  /** Type of content (for logging) */
  contentType: string
  /** Zod schema for validation */
  schema: ZodSchema<TBase>
  /** Enable verbose logging */
  verbose?: boolean
}

/**
 * Function to enrich base content with additional data
 */
export interface ContentEnricher<TBase, TEnriched> {
  (
    base: TBase,
    content: React.ReactElement,
    context: {
      slug: string
      locale: Locale
      filePath: string
    }
  ): Promise<TEnriched>
}

/**
 * Options for filtering and sorting content
 */
export interface ContentQueryOptions<T> {
  /** Filter content by field values */
  filter?: Partial<T>
  /** Sort content by field */
  sort?: {
    field: keyof T
    direction: 'ASC' | 'DESC'
  }
  /** Limit number of results */
  limit?: number
}

/**
 * Result of a content loading operation
 */
export interface ContentLoadResult<T> {
  /** Successfully loaded content */
  data: T[]
  /** Number of items that failed to load */
  failures: number
  /** Total items attempted */
  total: number
}
