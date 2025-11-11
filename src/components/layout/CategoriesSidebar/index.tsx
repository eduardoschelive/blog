import { getCategories } from '@/content/categories/getCategories'
import { getLocale, getTranslations } from 'next-intl/server'
import { CategoriesSidebarClient } from './components/CategoriesSidebarClient'

export async function CategoriesSidebar() {
  const locale = await getLocale()
  const t = await getTranslations('HomePage.categories')

  const categories = await getCategories(locale, {
    limit: 5,
    withArticles: true,
    sort: {
      field: 'title',
      direction: 'ASC',
    },
  })

  return (
    <CategoriesSidebarClient
      categories={categories}
      title={t('title')}
      viewAllText={t('viewAll')}
    />
  )
}
