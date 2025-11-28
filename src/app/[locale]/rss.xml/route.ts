import { getArticles } from '@/content/articles/getArticles'
import { LOCALES } from '@/constants/locale'
import { getLocalizedArticleUrl } from '@/utils/localizedUrl'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://eduardoschelive.com'
const MAX_ARTICLES = 50

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.home' })

  const articles = await getArticles(locale, {
    sort: { field: 'createdAt', direction: 'DESC' },
    limit: MAX_ARTICLES,
  })

  const rssItems = articles
    .map((article) => {
      const articleUrl = getLocalizedArticleUrl(
        article.category.slug,
        article.slug,
        locale,
        BASE_URL
      )

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid>${articleUrl}</guid>
      <description><![CDATA[${article.description || ''}]]></description>
      <pubDate>${article.createdAt?.toUTCString() || ''}</pubDate>
      <category><![CDATA[${article.category.title}]]></category>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${t('title')}</title>
    <link>${BASE_URL}/${locale}</link>
    <description>${t('description')}</description>
    <language>${locale}</language>
    <atom:link href="${BASE_URL}/${locale}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}
