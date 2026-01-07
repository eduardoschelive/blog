import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { PERSONAL_INFO } from '@/constants/personal'
import { getCDNImageUrl } from '@/utils/cdn'
import { IMAGE_DIMENSIONS } from '@/constants/images'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eduardoschelive.com'

interface BaseMetadataParams {
  locale: Locale
  title: string
  description: string
  keywords?: string[]
  path?: string
  alternates?: {
    en?: string
    pt?: string
  }
}

interface OpenGraphParams {
  type?: 'website' | 'article' | 'profile'
  image?: string
  imageAlt?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

interface MetadataParams extends BaseMetadataParams {
  openGraph?: OpenGraphParams
  noIndex?: boolean
}

/**
 * Processes cover image for OG - generates procedural overlay image
 * Takes coverImage filename and creates OG image with text overlay
 */
function processCoverImage(
  coverImage?: string,
  title?: string,
  subtitle?: string
): string | undefined {
  if (!coverImage) return undefined

  // Build full CDN URL for the cover image
  const cdnImageUrl =
    coverImage.startsWith('http://') || coverImage.startsWith('https://')
      ? coverImage
      : getCDNImageUrl(coverImage, IMAGE_DIMENSIONS.OG)

  // Generate procedural OG image with overlay
  const params = new URLSearchParams({
    image: cdnImageUrl,
    title: title || '',
    ...(subtitle && { subtitle }),
  })

  return `${SITE_URL}/api/og/image?${params.toString()}`
}

/**
 * Generates OG image URL with dynamic parameters
 */
function generateOgImageUrl(
  title: string,
  subtitle?: string,
  customImage?: string
): string {
  if (customImage) {
    return customImage
  }

  const params = new URLSearchParams({
    title: title,
    subtitle: subtitle || 'Software Engineer',
    theme: 'gradient',
  })

  return `${SITE_URL}/api/og?${params.toString()}`
}

/**
 * Generates comprehensive SEO metadata for pages
 */
export function generatePageMetadata({
  locale,
  title,
  description,
  keywords = [],
  path = '',
  alternates,
  openGraph,
  noIndex = false,
}: MetadataParams): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`
  const ogType = openGraph?.type || 'website'

  let ogImage: string

  const processedCoverImage = processCoverImage(
    openGraph?.image,
    title,
    description
  )
  if (processedCoverImage) {
    ogImage = processedCoverImage
  } else if (openGraph?.type === 'article') {
    ogImage = generateOgImageUrl(title, 'Article')
  } else if (path.includes('categories') || path.includes('categorias')) {
    ogImage = generateOgImageUrl(title, 'Category')
  } else if (path.includes('about') || path.includes('sobre')) {
    ogImage = generateOgImageUrl(
      'Eduardo Guiraldelli Schelive',
      'Software Engineer'
    )
  } else {
    ogImage = generateOgImageUrl('Eduardo Schelive', 'Software Engineer')
  }

  const ogImageAlt = openGraph?.imageAlt || title

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [
      {
        name: PERSONAL_INFO.name.full,
        url: SITE_URL,
      },
    ],
    creator: PERSONAL_INFO.name.full,
    publisher: PERSONAL_INFO.name.full,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates
        ? {
            'en-US': alternates.en ? `${SITE_URL}${alternates.en}` : undefined,
            'pt-BR': alternates.pt ? `${SITE_URL}${alternates.pt}` : undefined,
          }
        : undefined,
    },
    openGraph: {
      type: ogType,
      locale: locale,
      url: canonicalUrl,
      title,
      description,
      siteName: `${PERSONAL_INFO.name.short} Blog`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime: openGraph?.publishedTime,
        modifiedTime: openGraph?.modifiedTime,
        authors: openGraph?.authors || [PERSONAL_INFO.name.full],
        tags: openGraph?.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@eduardoschelive',
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
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
  }

  return metadata
}

/**
 * Helper to build localized paths
 */
export function buildLocalizedPath(
  locale: Locale,
  segments: Array<{ en: string; pt: string }>
): string {
  const localizedSegments = segments.map((segment) =>
    locale === 'en-US' ? segment.en : segment.pt
  )
  return `/${locale}/${localizedSegments.join('/')}`
}

/**
 * Helper to generate alternate language paths
 */
export function generateAlternates(
  enPath: string,
  ptPath: string
): { en: string; pt: string } {
  return {
    en: `/en-US${enPath}`,
    pt: `/pt-BR${ptPath}`,
  }
}
