import type { Locale } from 'next-intl'
import { cache } from 'react'
import { applyCollection } from '@/utils/collection'
import { ContentLoader } from './ContentLoader'
import type { ContentLoadResult, ContentQueryOptions } from './types'

export abstract class BaseContentLoader<TBase, TEnriched> extends ContentLoader<
  TBase,
  TEnriched
> {
  loadOne = cache(
    async (slug: string, locale: Locale): Promise<TEnriched | null> => {
      const filePath = this.buildFilePath(slug, locale)

      const result = await this.loadContentFile(filePath, slug, locale)
      if (!result) {
        return null
      }

      try {
        return await this.enrichContent(result.base, result.content, {
          slug,
          locale,
          filePath,
        })
      } catch (error) {
        this.logError('Failed to enrich content', { slug, locale, error })
        return null
      }
    }
  )

  async loadMany(
    slugs: string[],
    locale: Locale
  ): Promise<ContentLoadResult<TEnriched>> {
    const promises = slugs.map((slug) => this.loadOne(slug, locale))
    const results = await Promise.all(promises)

    const data = results.filter((item) => item !== null) as TEnriched[]

    return {
      data,
      failures: results.length - data.length,
      total: results.length,
    }
  }

  async loadAll(
    locale: Locale,
    options?: ContentQueryOptions<TEnriched>
  ): Promise<TEnriched[]> {
    this.logInfo('Loading all content', { locale, options })

    const slugs = this.scanDirectory(this.config.baseDir)

    const filter = options?.filter as Record<string, unknown> | undefined
    const filteredSlugs = filter?.slug
      ? slugs.filter((s) => s === filter.slug)
      : slugs

    const result = await this.loadMany(filteredSlugs, locale)

    if (result.failures > 0) {
      this.logWarning('Some items failed to load', {
        loaded: result.data.length,
        failed: result.failures,
        total: result.total,
      })
    } else {
      this.logInfo('Successfully loaded all content', {
        count: result.data.length,
      })
    }

    return this.applyOptions(result.data, options)
  }

  protected applyOptions(
    items: TEnriched[],
    options?: ContentQueryOptions<TEnriched>
  ): TEnriched[] {
    if (!options) {
      return items
    }

    const filter = options.filter || {}
    const { slug: _slug, ...restFilter } = filter as Record<string, unknown>

    return applyCollection(items as unknown as Record<string, unknown>[], {
      filter: restFilter,
      sort: options.sort as {
        field: string
        direction: 'ASC' | 'DESC'
      },
      limit: options.limit,
    }) as unknown as TEnriched[]
  }
}
