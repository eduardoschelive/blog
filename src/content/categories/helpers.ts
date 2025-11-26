import { CATEGORIES_DIR } from '@/constants/content'
import { categorySchema } from '@/schemas/category.schema'
import type { Category, CategoryBase } from '@/types/category.type'
import type { Locale } from 'next-intl'
import path from 'node:path'
import { compileContent } from '../shared/compileContent'
import { parseFrontmatter } from '../shared/parseFrontmatter'
import { readFileContent } from '../shared/readFile'

const categoryCache = new Map<string, CategoryBase & { slug: string }>()

/**
 * Loads category information (without content) for a given category slug and locale
 * @param categorySlug - The category slug
 * @param locale - The locale
 * @param useCache - Whether to use cache (default: true)
 * @returns CategoryBase with slug included, or default fallback if category doesn't exist
 */
export async function loadCategoryInfo(
  categorySlug: string,
  locale: Locale,
  useCache = true
): Promise<CategoryBase & { slug: string }> {
  const cacheKey = `${categorySlug}-${locale}`

  if (useCache && categoryCache.has(cacheKey)) {
    return categoryCache.get(cacheKey)!
  }

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
    const { frontmatter } = await compileContent(categoryContent, categoryFile)
    const categoryData = parseFrontmatter(
      frontmatter,
      categorySchema,
      categoryFile
    )

    const result = {
      ...categoryData,
      slug: categorySlug,
    }

    if (useCache) {
      categoryCache.set(cacheKey, result)
    }

    return result
  } catch {
    if (useCache) {
      categoryCache.set(cacheKey, defaultCategory)
    }
    return defaultCategory
  }
}

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

/**
 * Clears the category cache (useful for tests or when data changes)
 */
export function clearCategoryCache(): void {
  categoryCache.clear()
}
