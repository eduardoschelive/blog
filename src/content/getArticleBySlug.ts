import { ARTICLES_DIR } from '@/constants/content'
import { articleSchema, type Article } from '@/schemas/article.schema'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { compileContent } from './compileContent'
import { getContentBySlug } from './getContentBySlug'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

async function getArticleBySlug(
  categorySlug: string,
  articleSlug: string,
  locale: Locale
) {
  const article = await getContentBySlug<Article>(
    categorySlug,
    articleSlug,
    locale,
    articleSchema
  )

  const paths: Record<Locale, string> = {} as Record<Locale, string>

  const locales = readdirSync(ARTICLES_DIR).filter((item) => {
    const itemPath = path.join(ARTICLES_DIR, item)
    return statSync(itemPath).isDirectory()
  })

  for (const loc of locales) {
    if (loc === locale) {
      paths[loc as Locale] = `/${loc}/${categorySlug}/${articleSlug}`
      continue
    }

    const localePath = path.join(ARTICLES_DIR, loc)
    let found = false

    try {
      const categoryFolders = readdirSync(localePath).filter((item) => {
        const itemPath = path.join(localePath, item)
        return statSync(itemPath).isDirectory()
      })

      for (const categoryFolder of categoryFolders) {
        if (found) break

        const categoryPath = path.join(localePath, categoryFolder)
        const files = readdirSync(categoryPath).filter((file) =>
          file.endsWith('.mdx')
        )
        for (const file of files) {
          const slug = file.replace('.mdx', '')
          const filePath = path.join(categoryPath, file)

          try {
            const fileContent = readFileContent(filePath)
            const { frontmatter } = await compileContent(fileContent, filePath)
            const articleData = parseFrontmatter(
              frontmatter,
              articleSchema,
              filePath
            )

            if (articleData.id === article.id) {
              paths[loc as Locale] = `/${categoryFolder}/${slug}`
              found = true
              break
            }
          } catch {}
        }
      }
    } catch {
      // Error on reading directory, ignore and continue
    }
  }

  return {
    ...article,
    paths,
  }
}

export { getArticleBySlug }
