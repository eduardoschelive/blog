import { ARTICLES_DIR } from '@/constants/content'
import { articleSchema } from '@/schemas/article.schema'
import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import type { JSXElementConstructor, ReactElement } from 'react'
import type { z } from 'zod'
import { compileContent } from './compileContent'
import { parseFrontmatter } from './parseFrontmatter'
import { readFileContent } from './readFile'

type Article = z.infer<typeof articleSchema> & {
  content: ReactElement<unknown, string | JSXElementConstructor<unknown>>
  slug: string
  categorySlug: string
  locale: string
}

export async function getRecentArticles(locale: Locale, limit = 10) {
  const articles: Article[] = []

  try {
    const categoryFolders = readdirSync(ARTICLES_DIR).filter((item) => {
      const itemPath = path.join(ARTICLES_DIR, item)
      return statSync(itemPath).isDirectory()
    })

    for (const categorySlug of categoryFolders) {
      const categoryPath = path.join(ARTICLES_DIR, categorySlug)

      try {
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

            articles.push({
              ...parsedData,
              content,
              slug: articleFolder,
              categorySlug,
              locale,
            })
          } catch {
            // Skip articles that don't exist for this locale
            continue
          }
        }
      } catch {
        // Skip categories that don't exist
        continue
      }
    }

    // Sort articles by publishedAt date (newest first) and limit
    return articles
      .sort(
        (a, b) =>
          new Date(b.publishedAt || '').getTime() -
          new Date(a.publishedAt || '').getTime()
      )
      .slice(0, limit)
  } catch {
    return []
  }
}
