import { getArticles } from '@/content/articles'
import type { Locale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { HeroClient } from './components/HeroClient'

async function Hero() {
  const locale = (await getLocale()) as Locale

  const articles = await getArticles(locale, { limit: 1 })
  const featuredArticle = articles[0]

  return <HeroClient article={featuredArticle} />
}

export { Hero }
