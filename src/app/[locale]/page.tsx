import { Hero } from '@/components/layout/Hero'
import { ArticleList } from '@/components/layout/ArticleList'
import { CategoriesSidebar } from '@/components/layout/CategoriesSidebar'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'

export const dynamicParams = false

type PageParams = {
  locale: Locale
}

export async function generateStaticParams(): Promise<
  Array<{ locale: Locale }>
> {
  return LOCALES.map((locale) => ({ locale }))
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <div className="relative">
      <BackgroundDecorations />
      <Hero />
      <div className="w-full px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_1fr] gap-8 lg:gap-12">
            <div className="w-full">
              <ArticleList />
            </div>
            <CategoriesSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
