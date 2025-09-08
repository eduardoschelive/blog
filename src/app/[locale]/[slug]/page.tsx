import {
  ArticleContainer,
  ArticleContent,
  TableOfContents,
} from '@/components/layout/Article'
import { getArticleBySlug } from '@/content/getArticleBySlug'
import type { Locale } from 'next-intl'

interface ArticleProps {
  params: Promise<{
    slug: string
    locale: Locale
  }>
}

export default async function Article({ params }: ArticleProps) {
  const { slug, locale } = await params
  const article = await getArticleBySlug(slug, locale)

  return (
    <ArticleContainer>
      <ArticleContent>{article.content}</ArticleContent>
      <TableOfContents />
    </ArticleContainer>
  )
}
