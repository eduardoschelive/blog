import { getCategories } from '@/content/categories'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

interface CategoriesPageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params
  const t = await getTranslations('Categories')

  const categories = await getCategories(locale)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
              href={`/categories/${category.slug}`}
              className="block"
            >
              <div className="bg-card hover:bg-accent/50 rounded-lg p-6 border transition-colors">
                <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {category.slug}
                  </span>
                  <span className="text-primary hover:underline text-sm">
                    {t('viewMore')} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('noCategories')}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: CategoriesPageProps): Promise<Metadata> {
  await params
  const t = await getTranslations('Categories')

  return {
    title: t('title'),
    description: t('description'),
  }
}
