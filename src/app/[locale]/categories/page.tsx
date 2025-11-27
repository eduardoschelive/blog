import { CategoriesList } from '@/components/layout/CategoriesList'
import { LOCALES } from '@/constants/locale'
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { GradientDivider } from '@/components/ui/GradientDivider'
import { TbCategory } from 'react-icons/tb'
import { generatePageMetadata, generateAlternates } from '@/utils/metadata'

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
    <div className="min-h-screen pt-8">
      <PageHeaderRoot>
        <PageHeaderTitle
          icon={
            <TbCategory className="text-primary text-4xl md:text-5xl lg:text-6xl" />
          }
        >
          {t('title')}
        </PageHeaderTitle>

        <GradientDivider />

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
  const { locale } = await params
  const t = await getTranslations('Metadata.categories')

  return generatePageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    keywords: [
      'categories',
      'topics',
      'web development',
      'cloud infrastructure',
      'tutorials',
      'guides',
      'programming',
      'technology',
    ],
    path: `/${locale}/${locale === 'en-US' ? 'categories' : 'categorias'}`,
    alternates: generateAlternates('/categories', '/categorias'),
  })
}
