import {
  ArticleContainer,
  ArticleContent,
  TableOfContents,
} from '@/components/layout/ArticleOld'
import { getArticles } from '@/content/articles'
import type { Locale } from 'next-intl'

interface ArticleProps {
  params: Promise<{
    categorySlug: string
    articleSlug: string
    locale: Locale
  }>
}

export default async function Article({ params }: ArticleProps) {
  const { categorySlug, articleSlug, locale } = await params

  const articles = await getArticles(locale, {
    filter: { categorySlug, slug: articleSlug },
    limit: 1,
  })

  const article = articles[0]

  if (!article) {
    throw new Error(
      `Article not found: ${categorySlug}/${articleSlug} (${locale})`
    )
  }

  return (
    <ArticleContainer>
      <ArticleContent>{article.content}</ArticleContent>
      <TableOfContents />
    </ArticleContainer>
  )
}
