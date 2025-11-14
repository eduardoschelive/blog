import { CategoriesList } from '@/components/layout/CategoriesList'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderDivider,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { BiSolidCategory } from 'react-icons/bi'

export default async function CategoriesPage() {
  const t = await getTranslations('Categories')

  return (
    <div className="min-h-screen relative pt-8">
      <BackgroundDecorations />

      <PageHeaderRoot>
        <PageHeaderTitle
          icon={
            <BiSolidCategory className="text-primary text-4xl md:text-5xl lg:text-6xl" />
          }
        >
          {t('title')}
        </PageHeaderTitle>

        <PageHeaderDivider />

        <PageHeaderSubtitle>{t('subtitle')}</PageHeaderSubtitle>
      </PageHeaderRoot>
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
