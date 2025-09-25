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

  // Busca todas as pastas de idioma
  const locales = readdirSync(CATEGORIES_DIR).filter((item) => {
    const itemPath = path.join(CATEGORIES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  // Para cada idioma, carrega todas as categorias
  for (const locale of locales) {
    const localePath = path.join(CATEGORIES_DIR, locale)
    const files = readdirSync(localePath).filter((file) =>
      file.endsWith('.mdx')
    )

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(CATEGORIES_DIR, locale, file)

      const fileContent = readFileContent(filePath)
      const { content, frontmatter } = await compileContent(
        fileContent,
        filePath
      )
      const parsedData = parseFrontmatter(frontmatter, categorySchema, filePath)

      // Busca todas as versões dessa categoria em outros idiomas
      const paths: Record<Locale, string> = {} as Record<Locale, string>

      // Para cada idioma, verifica se existe uma categoria equivalente
      for (const loc of locales) {
        const locLocalePath = path.join(CATEGORIES_DIR, loc)
        const locFiles = readdirSync(locLocalePath).filter((f) =>
          f.endsWith('.mdx')
        )

        // Por enquanto, assume que slugs iguais são a mesma categoria
        const matchingFile = locFiles.find(
          (f) => f.replace('.mdx', '') === slug
        )
        if (matchingFile) {
          const matchingSlug = matchingFile.replace('.mdx', '')
          paths[loc as Locale] = `/${loc}/${matchingSlug}`
        }
      }

      categories.push({
        ...parsedData,
        content,
        currentSlug: slug,
        locale: locale as Locale,
        paths,
      })
    }
  }

  return categories
}
