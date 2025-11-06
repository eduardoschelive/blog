'use server'

import { CATEGORIES_DIR } from '@/constants/content'
import { categorySchema } from '@/schemas/category.schema'
import type { Category } from '@/types/category'
import type { Locale } from 'next-intl'
import path from 'node:path'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

async function getCategoryBySlug(
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
  }

  return category
}

export { getCategoryBySlug }
