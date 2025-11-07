import { ARTICLES_DIR } from '@/constants/content'
import { articleSchema } from '@/schemas/article.schema'
import type { Article } from '@/types/article.type'
import type { CategoryBase } from '@/types/category.type'
import { getGitFileDates } from '@/utils/gitDates'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { compileContent } from '../shared/compileContent'
import { parseFrontmatter } from '../shared/parseFrontmatter'
import { readFileContent } from '../shared/readFile'

/**
 * Loads all articles from a specific category directory
 * @param categorySlug - The category slug
 * @param categoryInfo - The category information (must include slug)
 * @param locale - The locale
 * @returns Array of articles from this category
 */
export async function loadArticlesFromCategory(
  categorySlug: string,
  categoryInfo: CategoryBase & { slug: string },
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

        // Get Git dates
        const gitDates = getGitFileDates(articleFile)

        const article: Article = {
          ...parsedData,
          content,
          slug: articleFolder,
          locale,
          category: categoryInfo,
          createdAt: gitDates?.createdAt || null,
          updatedAt: gitDates?.updatedAt || null,
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

  return articles
}
