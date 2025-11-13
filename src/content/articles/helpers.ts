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
 * Extracts the sequence number from an article slug
 * @param slug - The article slug (e.g., "1.nodejs-apis")
 * @returns The sequence number or null if not found
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
 * Removes the sequence number prefix from an article slug
 * @param slug - The article slug (e.g., "1.nodejs-apis")
 * @returns The slug without the sequence prefix
 * @example
 * getArticleNameWithoutSequence("1.nodejs-apis") // "nodejs-apis"
 * getArticleNameWithoutSequence("42.python-fastapi") // "python-fastapi"
 * getArticleNameWithoutSequence("nodejs-apis") // "nodejs-apis"
 */
export function getArticleNameWithoutSequence(slug: string): string {
  return slug.replace(/^\d+\./, '')
}

/**
 * Loads all articles from a specific category directory and sorts them by sequence number
 * @param categorySlug - The category slug (folder name)
 * @param categoryInfo - The category metadata
 * @param locale - The locale to load articles for
 * @returns Promise resolving to sorted array of articles (by sequence, then alphabetically)
 * @example
 * const articles = await loadArticlesFromCategory('web-servers', categoryInfo, 'en-US')
 */
export async function loadArticlesFromCategory(
  categorySlug: string,
  categoryInfo: CategoryBase,
  locale: Locale
): Promise<Article[]> {
  const articles: Article[] = []
  const categoryPath = path.join(ARTICLES_DIR, categorySlug)

  try {
    const articleFolders = readdirSync(categoryPath).filter((item) => {
      const itemPath = path.join(categoryPath, item)
      return statSync(itemPath).isDirectory()
    })

    for (const articleFolder of articleFolders) {
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

        const gitDates = getGitFileDates(articleFile)
        const stats = readingTime(fileContent)
        const calculatedReadingTime = Math.max(1, Math.ceil(stats.minutes))

        const cleanSlug = getArticleNameWithoutSequence(articleFolder)
        const sequence = getArticleSequence(articleFolder)

        const article: Article & { _originalFolder?: string } = {
          ...parsedData,
          content,
          slug: cleanSlug,
          locale,
          category: categoryInfo,
          createdAt: gitDates?.createdAt || null,
          updatedAt: gitDates?.updatedAt || null,
          sequence,
          readingTime: calculatedReadingTime,
          _originalFolder: articleFolder,
        }

        articles.push(article)
      } catch {
        // Skip articles that don't exist for this locale
        continue
      }
    }
  } catch {
    // Category directory doesn't exist or can't be read
    return []
  }

  const sorted = articles.sort((a, b) => {
    const folderA =
      (a as Article & { _originalFolder?: string })._originalFolder || a.slug
    const folderB =
      (b as Article & { _originalFolder?: string })._originalFolder || b.slug
    const seqA = getArticleSequence(folderA) ?? Number.POSITIVE_INFINITY
    const seqB = getArticleSequence(folderB) ?? Number.POSITIVE_INFINITY
    return seqA - seqB
  })

  return sorted.map((article) => {
    const { _originalFolder, ...cleanArticle } = article as Article & {
      _originalFolder?: string
    }
    return cleanArticle
  })
}
