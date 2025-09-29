import { CATEGORIES_DIR } from '@/constants/content'
import { categorySchema } from '@/schemas/category.schema'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

export async function getAllCategories() {
  const categories = []

  const categoryFolders = readdirSync(CATEGORIES_DIR).filter((item) => {
    const itemPath = path.join(CATEGORIES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  for (const categoryFolder of categoryFolders) {
    const categoryPath = path.join(CATEGORIES_DIR, categoryFolder)
    const files = readdirSync(categoryPath).filter((file) =>
      file.endsWith('.mdx')
    )

    for (const file of files) {
      const locale = file.replace('.mdx', '') as Locale
      const filePath = path.join(categoryPath, file)

      const fileContent = readFileContent(filePath)
      const { content, frontmatter } = await compileContent(
        fileContent,
        filePath
      )
      const parsedData = parseFrontmatter(frontmatter, categorySchema, filePath)

      categories.push({
        ...parsedData,
        content,
        currentSlug: categoryFolder,
        locale,
      })
    }
  }

  return categories
}
