import { CategoriesList } from '@/components/layout/CategoriesList'
import { BackgroundDecorations } from '@/components/layout/BackgroundDecorations'
import { GradientDivider } from '@/components/ui/GradientDivider'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BiSolidCategory } from 'react-icons/bi'

export default async function CategoriesPage() {
  const t = await getTranslations('Categories')

  return (
    <div className="min-h-screen relative">
      <BackgroundDecorations />

      <section className="w-full px-4 pt-20 pb-8 md:pt-28 md:pb-12 relative">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 flex items-center gap-4">
            <BiSolidCategory className="text-primary" />
            {t('title')}
          </h1>
          <GradientDivider className="mb-6" />

          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

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
