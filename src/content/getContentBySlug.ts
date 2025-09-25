'use server'

import { CONTENT_DIR } from '@/constants/content'
import type { Locale } from 'next-intl'
import path from 'node:path'
import type z from 'zod'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

async function getContentBySlug<T>(
  categorySlug: string,
  articleSlug: string,
  locale: Locale,
  schema: z.ZodType<T>
) {
  const filePath = path.join(
    CONTENT_DIR,
    locale,
    categorySlug,
    `${articleSlug}.mdx`
  )

  const fileContent = readFileContent(filePath)
  const { content, frontmatter } = await compileContent(fileContent, filePath)

  const parsedData = parseFrontmatter(frontmatter, schema, filePath)

  return {
    content,
    ...parsedData,
    slug: articleSlug,
    categorySlug,
  }
}

export { getContentBySlug }
