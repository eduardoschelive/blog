import { CategoriesList } from '@/components/layout/CategoriesList'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import { LOCALES } from '@/constants/locale'
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { TbCategory } from 'react-icons/tb'

export const dynamic = 'force-static'
export const dynamicParams = false

type PageParams = {
  locale: Locale
}

interface PageProps {
  params: Promise<PageParams>
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function CategoriesPage({ params }: PageProps) {
  await params
  const t = await getTranslations('Categories')

  return (
    <div className="min-h-screen relative pt-8">
      <BackgroundDecorations />

      <PageHeaderRoot>
        <PageHeaderTitle
          icon={
            <TbCategory className="text-primary text-4xl md:text-5xl lg:text-6xl" />
          }
        >
          {t('title')}
        </PageHeaderTitle>

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  await params
  const t = await getTranslations('Categories')

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}
