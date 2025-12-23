import { ARTICLES_DIR } from '@/constants/content'
import type { Article } from '@/types/article.type'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { articleLoader, categoryLoader } from '../loaders'
import type { ContentQueryOptions } from '../core/types'

export type ArticleFilter = Partial<Article> & {
  categorySlug?: string
}

export type ArticleOptions = ContentQueryOptions<Article> & {
  filter?: ArticleFilter
}

const DEFAULT_ARTICLE_OPTIONS: ArticleOptions = {
  sort: {
    field: 'createdAt',
    direction: 'DESC',
  },
}

export async function getArticles(
  locale: Locale,
  options?: ArticleOptions
): Promise<Article[]> {
  const config = {
    ...DEFAULT_ARTICLE_OPTIONS,
    ...options,
  }

  const categoryFolders = readdirSync(ARTICLES_DIR).filter((item) => {
    const itemPath = path.join(ARTICLES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  const filteredCategories = config.filter?.categorySlug
    ? categoryFolders.filter(
        (categorySlug) => categorySlug === config.filter?.categorySlug
      )
    : categoryFolders

  const categoriesWithInfo = await Promise.all(
    filteredCategories.map(async (categorySlug) => {
      const info = await categoryLoader.loadInfo(categorySlug, locale)
      return { slug: categorySlug, info }
    })
  )

  const result = await articleLoader.loadFromCategories(
    categoriesWithInfo,
    locale
  )

  const { categorySlug: _categorySlug, ...restFilter } = config.filter || {}

  return articleLoader['applyOptions'](result.data, {
    ...config,
    filter: restFilter,
  })
}
