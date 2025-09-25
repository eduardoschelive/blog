import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getCategoryBySlug } from '@/content/getCategoryBySlug'
import type { Locale } from 'next-intl'

interface CategoryProps {
  params: Promise<{
    categorySlug: string
    locale: Locale
  }>
}

export default async function Category({ params }: CategoryProps) {
  const { categorySlug, locale } = await params
  const category = await getCategoryBySlug(categorySlug, locale)

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {category.description}
        </p>

        <div className="prose prose-lg max-w-none">{category.content}</div>
      </div>
      <Footer />
    </>
  )
}
