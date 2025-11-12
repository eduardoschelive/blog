import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

interface CategoryProps {
  params: Promise<{
    categorySlug: string
    locale: Locale
  }>
}

export default async function CategoryPage({ params }: CategoryProps) {
  const { categorySlug, locale } = await params

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {locale === 'pt-BR' ? 'Página de Categoria' : 'Category Page'}
        </h1>
        <p className="text-xl text-foreground/70 mb-6">
          {locale === 'pt-BR'
            ? `Esta é a página da categoria: ${categorySlug}`
            : `This is the category page: ${categorySlug}`}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm text-primary font-medium">
            🚧{' '}
            {locale === 'pt-BR'
              ? 'Mock/Em desenvolvimento'
              : 'Mock/Under development'}
          </span>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  const { categorySlug } = await params

  return {
    title: `Category: ${categorySlug}`,
    description: `Category page for ${categorySlug}`,
  }
}
