import { getArticles } from '@/content/articles'
import { getLocale } from 'next-intl/server'
import { ArticleListClient } from './components/ArticleListClient'

async function ArticleList() {
  const locale = await getLocale()

  const articles = await getArticles(locale, {
    sort: { field: 'createdAt', direction: 'DESC' },
  })

  return <ArticleListClient articles={articles} />
}

export { ArticleList }
