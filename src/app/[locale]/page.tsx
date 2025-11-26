import { Hero } from '@/components/layout/Hero'
import { ArticleList } from '@/components/layout/ArticleList'
import { CategoriesSidebar } from '@/components/layout/CategoriesSidebar'
import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'

export const dynamic = 'force-static'
export const dynamicParams = false

type PageParams = {
  locale: Locale
}

export async function generateStaticParams(): Promise<Array<PageParams>> {
  return LOCALES.map((locale) => ({ locale }))
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
