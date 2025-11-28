import { getArticles } from '@/content/articles/getArticles'
import { getCategories } from '@/content/categories/getCategories'
import { LOCALES } from '@/constants/locale'
import type { MetadataRoute } from 'next'
import type { Locale } from 'next-intl'
import {
  getLocalizedArticleUrl,
  getLocalizedCategoryUrl,
} from '@/utils/localizedUrl'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eduardoschelive.com'

type LocalizedUrls = Record<Locale, string>

interface SitemapConfig {
  url: string
  lastModified?: Date | string | null
  changeFrequency: 'weekly' | 'monthly'
  priority: number
  alternates: LocalizedUrls
}

function createBilingualEntries(config: SitemapConfig): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    entries.push({
      url: config.alternates[locale],
      lastModified: config.lastModified || new Date(),
      changeFrequency: config.changeFrequency,
      priority: config.priority,
      alternates: {
        languages: {
          'en-US': config.alternates['en-US'],
          'pt-BR': config.alternates['pt-BR'],
        },
      },
    })
  }

  return entries
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = []

  const staticPages = [
    { en: '/', pt: '/' },
    { en: '/about', pt: '/sobre' },
    { en: '/categories', pt: '/categorias' },
  ]

  for (const page of staticPages) {
    const entries = createBilingualEntries({
      url: page.en,
      changeFrequency: 'weekly',
      priority: page.en === '/' ? 1.0 : 0.8,
      alternates: {
        'en-US': `${BASE_URL}/en-US${page.en}`,
        'pt-BR': `${BASE_URL}/pt-BR${page.pt}`,
      },
    })
    sitemapEntries.push(...entries)
  }

  const categoriesEn = await getCategories('en-US')

  for (const category of categoriesEn) {
    const alternates: LocalizedUrls = {
      'en-US': getLocalizedCategoryUrl(category.slug, 'en-US', BASE_URL),
      'pt-BR': getLocalizedCategoryUrl(category.slug, 'pt-BR', BASE_URL),
    }

    const entries = createBilingualEntries({
      url: category.slug,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates,
    })
    sitemapEntries.push(...entries)
  }

  const articlesEn = await getArticles('en-US')

  for (const article of articlesEn) {
    const alternates: LocalizedUrls = {
      'en-US': getLocalizedArticleUrl(
        article.category.slug,
        article.slug,
        'en-US',
        BASE_URL
      ),
      'pt-BR': getLocalizedArticleUrl(
        article.category.slug,
        article.slug,
        'pt-BR',
        BASE_URL
      ),
    }

    const entries = createBilingualEntries({
      url: article.slug,
      lastModified: article.updatedAt || article.createdAt,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates,
    })
    sitemapEntries.push(...entries)
  }

  return sitemapEntries
}
