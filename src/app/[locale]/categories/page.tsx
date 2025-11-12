import { CategoriesGrid } from '@/components/layout/CategoriesGrid'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export default async function CategoriesPage() {
  const t = await getTranslations('Categories')

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="fixed top-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/3 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

      <section className="w-full px-4 pt-20 pb-8 md:pt-28 md:pb-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="mt-6 w-20 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
          </div>
        </div>
      </section>


      <div className="relative">
        <div className="w-full px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <CategoriesGrid />
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
