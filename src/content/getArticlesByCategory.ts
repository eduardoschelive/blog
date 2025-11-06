import { ARTICLES_DIR, CATEGORIES_DIR } from '@/constants/content'
import { articleSchema } from '@/schemas/article.schema'
import { categorySchema } from '@/schemas/category.schema'
import type { Article } from '@/types/article'
import type { CategoryBase } from '@/types/category'
import { getGitFileDates } from '@/utils/gitDates'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

export async function getArticlesByCategory(
  categorySlug: string,
  locale: Locale
): Promise<Article[]> {
  const articles: Article[] = []
  const categoryPath = path.join(ARTICLES_DIR, categorySlug)

  // Get category information
  let categoryInfo: CategoryBase = {
    slug: categorySlug,
    title: categorySlug.replace('-', ' '),
    description: '',
  }

  try {
    const categoryFile = path.join(
      CATEGORIES_DIR,
      categorySlug,
      `${locale}.mdx`
    )
    const categoryContent = readFileContent(categoryFile)
    const { frontmatter } = await compileContent(categoryContent, categoryFile)
    const categoryData = parseFrontmatter(
      frontmatter,
      categorySchema,
      categoryFile
    )

    categoryInfo = {
      ...categoryData,
      slug: categorySlug,
    }
  } catch {
    // If category file doesn't exist, use default values
  }

  try {
    if (!statSync(categoryPath).isDirectory()) {
      return []
    }
  } catch {
    return []
  }

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
      continue
    }
  }

  return articles.sort((a, b) => {
    if (!a.createdAt && !b.createdAt) return 0
    if (!a.createdAt) return 1
    if (!b.createdAt) return -1
    return b.createdAt.getTime() - a.createdAt.getTime()
  })
}

export async function getAllArticlesGroupedByCategory(locale: Locale) {
  const categoriesWithArticles: Record<string, Article[]> = {}

  const categoryFolders = readdirSync(ARTICLES_DIR).filter((item) => {
    const itemPath = path.join(ARTICLES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  for (const categorySlug of categoryFolders) {
    const articles = await getArticlesByCategory(categorySlug, locale)
    if (articles.length > 0) {
      categoriesWithArticles[categorySlug] = articles
    }
  }

  return categoriesWithArticles
}
