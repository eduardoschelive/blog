import type { Metadata } from 'next'
import { PERSONAL_INFO } from '@/constants/personal'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://eduardoschelive.com'

/**
 * 🔄 REUTILIZÁVEL: Base metadata builder
 * Função helper que cria metadados completos com OpenGraph, Twitter Cards, etc.
 * Use esta função em todas as páginas para garantir consistência.
 */
interface BaseMetadataParams {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  locale?: string
}

export function createBaseMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  locale = 'en-US',
}: BaseMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`
  const imageUrl = image || `${SITE_URL}/og-default.png`

  const metadata: Metadata = {
    title,
    description,
    authors: [
      {
        name: PERSONAL_INFO.name.full,
        url: PERSONAL_INFO.social.github,
      },
    ],
    creator: PERSONAL_INFO.name.full,
    publisher: PERSONAL_INFO.name.full,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${SITE_URL}/en-US${path}`,
        'pt-BR': `${SITE_URL}/pt-BR${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: `${PERSONAL_INFO.name.short} | Blog`,
      locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@eduardoschelive',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    keywords: tags,
  }

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [PERSONAL_INFO.name.full],
      tags,
    }
  }

  return metadata
}
