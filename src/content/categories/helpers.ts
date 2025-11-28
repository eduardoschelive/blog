import { CATEGORIES_DIR } from '@/constants/content'
import { categorySchema } from '@/schemas/category.schema'
import type { Category, CategoryBase } from '@/types/category.type'
import type { Locale } from 'next-intl'
import path from 'node:path'
import { cache } from 'react'
import { compileContent } from '../shared/compileContent'
import { parseFrontmatter } from '../shared/parseFrontmatter'
import { readFileContent } from '../shared/readFile'

export const loadCategoryInfo = cache(
  async (
    categorySlug: string,
    locale: Locale
  ): Promise<CategoryBase & { slug: string }> => {
    const defaultCategory: CategoryBase & { slug: string } = {
      slug: categorySlug,
      title: categorySlug.replace(/-/g, ' '),
      description: '',
    }

    try {
      const categoryFile = path.join(
        CATEGORIES_DIR,
        categorySlug,
        `${locale}.mdx`
      )
      const categoryContent = readFileContent(categoryFile)
      const { frontmatter } = await compileContent(
        categoryContent,
        categoryFile
      )
      const categoryData = parseFrontmatter(
        frontmatter,
        categorySchema,
        categoryFile
      )

      return {
        ...categoryData,
        slug: categorySlug,
      }
    } catch {
      return defaultCategory
    }
  }
)

/**
 * Loads full category data including compiled MDX content
 * @param categorySlug - The category slug
 * @param locale - The locale
 * @returns Category with full content
 */
export async function loadCategory(
  categorySlug: string,
  locale: Locale
): Promise<Category> {
  const filePath = path.join(CATEGORIES_DIR, categorySlug, `${locale}.mdx`)

  const fileContent = readFileContent(filePath)
  const { content, frontmatter } = await compileContent(fileContent, filePath)
  const parsedData = parseFrontmatter(frontmatter, categorySchema, filePath)

  const category: Category = {
    ...parsedData,
    content,
    locale,
    slug: categorySlug,
  }

  return category
}
