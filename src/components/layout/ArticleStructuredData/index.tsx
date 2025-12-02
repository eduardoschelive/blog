import type { Article } from '@/types/article.type'
import { getLocalizedArticleUrl } from '@/utils/localizedUrl'
import type { Locale } from 'next-intl'

interface ArticleStructuredDataProps {
  article: Article
  locale: Locale
}

/**
 * Generates structured data (JSON-LD) for article SEO
 * Enables rich snippets in Google search results
 */
export function ArticleStructuredData({
  article,
  locale,
}: ArticleStructuredDataProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eduardoschelive.com'

  const articleUrl = getLocalizedArticleUrl(
    article.category.slug,
    article.slug,
    locale,
    baseUrl
  )

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description || '',
    datePublished: article.createdAt?.toISOString(),
    dateModified: article.updatedAt?.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Eduardo Schelive',
      url: `${baseUrl}/${locale}${locale === 'pt-BR' ? '/sobre' : '/about'}`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Eduardo Schelive',
    },
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: article.category.title,
    keywords: article.keywords?.join(', ') || '',
    inLanguage: locale,
    ...(article.coverImage && {
      image: {
        '@type': 'ImageObject',
        url: article.coverImage,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
