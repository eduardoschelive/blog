import { Hero } from '@/components/layout/Hero'
import { ArticleList } from '@/components/layout/ArticleList'
import { CategoriesSidebar } from '@/components/layout/CategoriesSidebar'
import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { generatePageMetadata, generateAlternates } from '@/utils/metadata'

export const dynamic = 'force-static'
export const dynamicParams = false

type PageParams = {
  locale: Locale
}

export async function generateStaticParams(): Promise<Array<PageParams>> {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('Metadata.home')

  return generatePageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    keywords: [
      'Eduardo Schelive',
      'web development',
      'software engineer',
      'cloud infrastructure',
      'software architecture',
      'technology blog',
      'programming tutorials',
      'Next.js',
      'React',
      'TypeScript',
    ],
    path: `/${locale}`,
    alternates: generateAlternates('', ''),
  })
}

interface HomePageProps {
  params: Promise<PageParams>
}

export default async function HomePage({ params }: HomePageProps) {
  await params

  return (
    <>
      <Hero />
      <div className="w-full px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_1fr] gap-8 lg:gap-12">
            <div className="w-full">
              <ArticleList />
            </div>
            <CategoriesSidebar />
          </div>
        </div>
      </div>
    </>
  )
}
