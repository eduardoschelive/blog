import { ARTICLES_DIR } from '@/constants/content'
import { articleSchema } from '@/schemas/article.schema'
import type { Article, ArticleBase } from '@/types/article.type'
import type { CategoryBase } from '@/types/category.type'
import {
  getGitFileDates,
  getBatchGitFileDates,
  type GitDates,
} from '@/utils/gitDates'
import type { Locale } from 'next-intl'
import path from 'node:path'
import readingTime from 'reading-time'
import { BaseContentLoader } from '../core/BaseContentLoader'
import type { ContentLoadResult } from '../core/types'

export class ArticleContentLoader extends BaseContentLoader<
  ArticleBase,
  Article
> {
  constructor() {
    super({
      baseDir: ARTICLES_DIR,
      contentType: 'Article',
      schema: articleSchema,
      verbose: false,
    })
  }

  protected async enrichContent(
    base: ArticleBase,
    content: React.ReactElement,
    context: {
      slug: string
      locale: Locale
      filePath: string
      categoryInfo?: CategoryBase
      folderName?: string
      gitDates?: GitDates | null
    }
  ): Promise<Article> {
    const gitDates =
      context.gitDates ?? (await getGitFileDates(context.filePath))

    const { readFileSync } = await import('node:fs')
    const fileContent = readFileSync(context.filePath, 'utf-8')
    const stats = readingTime(fileContent)
    const calculatedReadingTime = Math.max(1, Math.ceil(stats.minutes))

    const sequence = context.folderName
      ? this.getArticleSequence(context.folderName)
      : null

    return {
      ...base,
      content,
      slug: context.slug,
      locale: context.locale,
      category: context.categoryInfo!,
      createdAt: gitDates?.createdAt || null,
      updatedAt: gitDates?.updatedAt || null,
      sequence,
      readingTime: calculatedReadingTime,
    }
  }

  private getArticleSequence(folderName: string): number | null {
    const match = folderName.match(/^(\d+)\./)
    return match ? Number.parseInt(match[1], 10) : null
  }

  private removeSequencePrefix(folderName: string): string {
    return folderName.replace(/^\d+\./, '')
  }

  async loadFromCategory(
    categorySlug: string,
    categoryInfo: CategoryBase,
    locale: Locale
  ): Promise<Article[]> {
    const categoryPath = path.join(this.config.baseDir, categorySlug)
    const articleFolders = this.scanDirectory(categoryPath)

    const filePaths = articleFolders.map((folderName) => {
      const articlePath = path.join(categoryPath, folderName)
      return path.join(articlePath, `${locale}.mdx`)
    })

    const gitDatesMap = await getBatchGitFileDates(filePaths)

    const promises = articleFolders.map(async (folderName) => {
      const cleanSlug = this.removeSequencePrefix(folderName)
      const articlePath = path.join(categoryPath, folderName)
      const filePath = path.join(articlePath, `${locale}.mdx`)

      const result = await this.loadContentFile(filePath, cleanSlug, locale)
      if (!result) {
        return { article: null, folderName }
      }

      try {
        const absolutePath = path.resolve(filePath)
        const gitDates = gitDatesMap.get(absolutePath) ?? null

        const enriched = await this.enrichContent(result.base, result.content, {
          slug: cleanSlug,
          locale,
          filePath,
          categoryInfo,
          folderName,
          gitDates,
        })
        return { article: enriched, folderName }
      } catch (error) {
        this.logError('Failed to enrich article', {
          folderName,
          categorySlug,
          locale,
          error,
        })
        return { article: null, folderName }
      }
    })

    const results = await Promise.all(promises)

    const articlesWithFolders = results.filter(
      (item): item is { article: Article; folderName: string } =>
        item.article !== null
    )

    const sorted = articlesWithFolders.sort((a, b) => {
      const seqA =
        this.getArticleSequence(a.folderName) ?? Number.POSITIVE_INFINITY
      const seqB =
        this.getArticleSequence(b.folderName) ?? Number.POSITIVE_INFINITY
      return seqA - seqB
    })

    const articles = sorted.map((item) => item.article)

    const failures = results.length - articles.length
    if (failures > 0) {
      this.logWarning('Some articles failed to load from category', {
        categorySlug,
        loaded: articles.length,
        failed: failures,
        total: results.length,
      })
    }

    return articles
  }

  async loadFromCategories(
    categories: Array<{ slug: string; info: CategoryBase }>,
    locale: Locale
  ): Promise<ContentLoadResult<Article>> {
    const promises = categories.map(({ slug, info }) =>
      this.loadFromCategory(slug, info, locale)
    )

    const results = await Promise.all(promises)
    const data = results.flat()

    return {
      data,
      failures: 0,
      total: data.length,
    }
  }
}
