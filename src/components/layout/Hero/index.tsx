import { getArticles } from '@/content/articles'
import type { Locale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { HeroClient } from './HeroClient'

async function Hero() {
  const locale = (await getLocale()) as Locale

  // Fetch featured article
  const articles = await getArticles(locale, { limit: 1 })
  const featuredArticle = articles[0]

  return <HeroClient article={featuredArticle} />
}

export { Hero }
