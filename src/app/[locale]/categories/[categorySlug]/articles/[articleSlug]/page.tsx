import { ArticlePageClient } from './ArticlePageClient'
import { ArticleStructuredData } from '@/components/layout/ArticleStructuredData'
import { getArticles } from '@/content/articles'
import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { generatePageMetadata, generateAlternates } from '@/utils/metadata'

export const dynamic = 'force-static'
export const dynamicParams = false

type PageParams = {
  categorySlug: string
  articleSlug: string
  locale: Locale
}

interface PageProps {
  params: Promise<PageParams>
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const params: PageParams[] = []

  for (const locale of LOCALES) {
    const articles = await getArticles(locale)

    for (const article of articles) {
      params.push({
        locale,
        categorySlug: article.category.slug,
        articleSlug: article.slug,
      })
    }
  }

  return params
}

export default async function ArticlePage({ params }: PageProps) {
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
    <>
      <ArticleStructuredData article={article} locale={locale} />
      <ArticlePageClient article={article} categorySlug={categorySlug} />
    </>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categorySlug, articleSlug, locale } = await params

  const articles = await getArticles(locale, {
    filter: { categorySlug, slug: articleSlug },
    limit: 1,
  })

  const article = articles[0]

  if (!article) {
    const t = await getTranslations('Article.notFound')
    return {
      title: t('title'),
      description: t('description'),
    }
  }

  const publishedDate = article.createdAt
    ? new Date(article.createdAt).toISOString()
    : undefined
  const modifiedDate = article.updatedAt
    ? new Date(article.updatedAt).toISOString()
    : publishedDate

  const categorySlugLocalized = article.category.slug
  const articleSlugLocalized = article.slug
  const categoryPath = locale === 'en-US' ? 'categories' : 'categorias'
  const articlesPath = locale === 'en-US' ? 'articles' : 'artigos'

  return generatePageMetadata({
    locale,
    title: article.title,
    description: article.description || article.title,
    keywords: article.keywords || [],
    path: `/${locale}/${categoryPath}/${categorySlugLocalized}/${articlesPath}/${articleSlugLocalized}`,
    alternates: generateAlternates(
      `/categories/${categorySlug}/articles/${articleSlug}`,
      `/categorias/${categorySlug}/artigos/${articleSlug}`
    ),
    openGraph: {
      type: 'article',
      image: article.coverImage,
      imageAlt: article.title,
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      tags: article.keywords || [],
    },
  })
}
