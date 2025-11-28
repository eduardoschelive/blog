import { ARTICLES_DIR } from '@/constants/content'
import { articleSchema } from '@/schemas/article.schema'
import type { Article } from '@/types/article.type'
import type { CategoryBase } from '@/types/category.type'
import { getGitFileDates } from '@/utils/gitDates'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import readingTime from 'reading-time'
import { compileContent } from '../shared/compileContent'
import { parseFrontmatter } from '../shared/parseFrontmatter'
import { readFileContent } from '../shared/readFile'

/**
 * @example
 * getArticleSequence("1.nodejs-apis") // 1
 * getArticleSequence("42.python-fastapi") // 42
 * getArticleSequence("nodejs-apis") // null
 */
export function getArticleSequence(slug: string): number | null {
  const match = slug.match(/^(\d+)\./)
  return match ? Number.parseInt(match[1], 10) : null
}

/**
 * @example
 * getArticleNameWithoutSequence("1.nodejs-apis") // "nodejs-apis"
 * getArticleNameWithoutSequence("42.python-fastapi") // "python-fastapi"
 * getArticleNameWithoutSequence("nodejs-apis") // "nodejs-apis"
 */
export function getArticleNameWithoutSequence(slug: string): string {
  return slug.replace(/^\d+\./, '')
}

/**
 * Loads and sorts articles by sequence number
 * @example
 * const articles = await loadArticlesFromCategory('web-servers', categoryInfo, 'en-US')
 */
export async function loadArticlesFromCategory(
  categorySlug: string,
  categoryInfo: CategoryBase,
  locale: Locale
): Promise<Article[]> {
  const categoryPath = path.join(ARTICLES_DIR, categorySlug)

  const articleFolders = readdirSync(categoryPath).filter((item) => {
    const itemPath = path.join(categoryPath, item)
    return statSync(itemPath).isDirectory()
  })

  const articlePromises = articleFolders.map(async (articleFolder) => {
    const articlePath = path.join(categoryPath, articleFolder)
    const articleFile = path.join(articlePath, `${locale}.mdx`)

    try {
      const fileContent = readFileContent(articleFile)
      const { content, frontmatter } = await compileContent(
        fileContent,
        articleFile
      )
      const parsedData = parseFrontmatter(
        frontmatter,
        articleSchema,
        articleFile
      )

      const gitDates = await getGitFileDates(articleFile)
      const stats = readingTime(fileContent)
      const calculatedReadingTime = Math.max(1, Math.ceil(stats.minutes))

      const cleanSlug = getArticleNameWithoutSequence(articleFolder)
      const sequence = getArticleSequence(articleFolder)

      const article: Article = {
        ...parsedData,
        content,
        slug: cleanSlug,
        locale,
        category: categoryInfo,
        createdAt: gitDates?.createdAt || null,
        updatedAt: gitDates?.updatedAt || null,
        sequence,
        readingTime: calculatedReadingTime,
      }

      return { article, folder: articleFolder }
    } catch (error) {
      console.warn(`Failed to load article ${articleFolder}:`, error)
      return null
    }
  })

  const articlesResults = await Promise.all(articlePromises)
  const articlesWithFolders = articlesResults.filter(
    (item): item is { article: Article; folder: string } => item !== null
  )

  const sorted = articlesWithFolders.sort((a, b) => {
    const seqA = getArticleSequence(a.folder) ?? Number.POSITIVE_INFINITY
    const seqB = getArticleSequence(b.folder) ?? Number.POSITIVE_INFINITY
    return seqA - seqB
  })

  return sorted.map((item) => item.article)
}
