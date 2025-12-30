import { getCategories } from '@/content/categories'
import { getLocale, getTranslations } from 'next-intl/server'
import { CategoriesListClient } from './components/CategoriesListClient'

export async function CategoriesList() {
  const locale = await getLocale()
  const categories = await getCategories(locale, { withArticles: true })
  const t = await getTranslations('Categories')

  if (categories.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-primary/80 via-secondary/60 to-primary/80 bg-clip-text text-transparent">
            {t('emptyState.title')}
          </h2>
          <p className="text-foreground/70 text-lg mb-6">
            {t('emptyState.subtitle')}
          </p>
          <p className="text-primary font-semibold">{t('emptyState.cta')}</p>
        </div>
      </div>
    )
  }

  return <CategoriesListClient categories={categories} />
}
