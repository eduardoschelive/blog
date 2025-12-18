import type { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eduardoschelive.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/en-US/',
          '/pt-BR/',
          '/favicon.ico',
          '/icon.png',
          '/icon-192.png',
          '/icon-512.png',
          '/apple-icon.png',
          '/manifest.json',
        ],
        disallow: ['/', '/api/', '/_next/', '/search/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
