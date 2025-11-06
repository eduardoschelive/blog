import { ARTICLES_DIR, CATEGORIES_DIR } from '@/constants/content'
import { articleSchema } from '@/schemas/article.schema'
import { categorySchema } from '@/schemas/category.schema'
import type { Article } from '@/types/article'
import type { CategoryBase } from '@/types/category'
import { getGitFileDates } from '@/utils/gitDates'
import type { Locale } from 'next-intl'
import path from 'node:path'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

async function getArticleBySlug(
  categorySlug: string,
  articleSlug: string,
  locale: Locale
): Promise<Article> {
  // Get article content
  const articleFile = path.join(
    ARTICLES_DIR,
    categorySlug,
    articleSlug,
    `${locale}.mdx`
  )

  const fileContent = readFileContent(articleFile)
  const { content, frontmatter } = await compileContent(
    fileContent,
    articleFile
  )
  const parsedData = parseFrontmatter(frontmatter, articleSchema, articleFile)

  // Get Git dates
  const gitDates = getGitFileDates(articleFile)

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
    const { frontmatter: categoryFrontmatter } = await compileContent(
      categoryContent,
      categoryFile
    )
    const categoryData = parseFrontmatter(
      categoryFrontmatter,
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

  const article: Article = {
    ...parsedData,
    content,
    slug: articleSlug,
    locale,
    category: categoryInfo,
    createdAt: gitDates?.createdAt || null,
    updatedAt: gitDates?.updatedAt || null,
  }

  return article
}

export { getArticleBySlug }
