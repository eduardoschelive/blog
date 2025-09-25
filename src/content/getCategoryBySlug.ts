'use server'

import { CATEGORIES_DIR } from '@/constants/content'
import { categorySchema } from '@/schemas/category.schema'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

async function getCategoryBySlug(categorySlug: string, locale: Locale) {
  const filePath = path.join(CATEGORIES_DIR, locale, `${categorySlug}.mdx`)

  const fileContent = readFileContent(filePath)
  const { content, frontmatter } = await compileContent(fileContent, filePath)

  const parsedData = parseFrontmatter(frontmatter, categorySchema, filePath)

  const paths: Record<Locale, string> = {} as Record<Locale, string>

  const locales = readdirSync(CATEGORIES_DIR).filter((item) => {
    const itemPath = path.join(CATEGORIES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  for (const loc of locales) {
    if (loc === locale) {
      paths[loc as Locale] = `/${categorySlug}`
      continue
    }

    const localePath = path.join(CATEGORIES_DIR, loc)
    const files = readdirSync(localePath).filter((file) =>
      file.endsWith('.mdx')
    )

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(CATEGORIES_DIR, loc, file)

      try {
        const fileContent = readFileContent(filePath)
        const { frontmatter } = await compileContent(fileContent, filePath)
        const categoryData = parseFrontmatter(
          frontmatter,
          categorySchema,
          filePath
        )

        if (categoryData.id === parsedData.id) {
          paths[loc as Locale] = `/${loc}/${slug}`
          break
        }
      } catch {
        // Error on parsing, ignore and continue
      }
    }
  }

  return {
    content,
    ...parsedData,
    slug: categorySlug,
    paths,
  }
}

export { getCategoryBySlug }
