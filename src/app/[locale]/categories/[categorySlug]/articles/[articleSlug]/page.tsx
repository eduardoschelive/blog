import { ArticlePageClient } from './ArticlePageClient'
import { getArticles } from '@/content/articles'
import type { Locale } from 'next-intl'
import type { Metadata } from 'next'

interface ArticleProps {
  params: Promise<{
    categorySlug: string
    articleSlug: string
    locale: Locale
  }>
}

export default async function ArticlePage({ params }: ArticleProps) {
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

  return <ArticlePageClient article={article} categorySlug={categorySlug} />
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const { categorySlug, articleSlug, locale } = await params

  const articles = await getArticles(locale, {
    filter: { categorySlug, slug: articleSlug },
    limit: 1,
  })

  const article = articles[0]

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found',
    }
  }

  return {
    title: article.title,
    description: article.description || article.title,
  }
}
