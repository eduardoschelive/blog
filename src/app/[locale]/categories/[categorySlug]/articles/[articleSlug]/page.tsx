import {
  ArticleContainer,
  ArticleContent,
  TableOfContents,
} from '@/components/layout/Article'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getArticleBySlug } from '@/content/getArticleBySlug'
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
  console.log('locale', locale)
  console.log('categorySlug', categorySlug)
  console.log('articleSlug', articleSlug)

  const article = await getArticleBySlug(categorySlug, articleSlug, locale)

  return (
    <>
      <Header />
      <ArticleContainer>
        <ArticleContent>{article.content}</ArticleContent>
        <TableOfContents />
      </ArticleContainer>
      <Footer />
    </>
  )
}
