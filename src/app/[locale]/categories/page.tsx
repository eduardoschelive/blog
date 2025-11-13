import { CategoriesList } from '@/components/layout/CategoriesList'
import { BackgroundDecorations } from '@/components/layout/BackgroundDecorations'
import { CategoriesPageHeader } from './components/CategoriesPageHeader'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export default async function CategoriesPage() {
  const t = await getTranslations('Categories')

  return (
    <div className="min-h-screen relative">
      <BackgroundDecorations />

      <CategoriesPageHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="relative">
        <div className="w-full px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <CategoriesList />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Categories')

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}
