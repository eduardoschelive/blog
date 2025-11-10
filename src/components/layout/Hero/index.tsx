import { getArticles } from '@/content/articles'
import { getLocale } from 'next-intl/server'
import { HeroClient } from './components/HeroClient'

async function Hero() {
  const locale = await getLocale()

  const articles = await getArticles(locale, { limit: 1 })
  const latestArticle = articles[0]

  return <HeroClient article={latestArticle} />
}

export { Hero }
