import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getArticlesByCategory } from '@/content/getArticlesByCategory'
import { getCategoryBySlug } from '@/content/getCategoryBySlug'
import { Link } from '@/i18n/navigation'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

interface CategoryProps {
  params: Promise<{
    categorySlug: string
    locale: Locale
  }>
}

export default async function Category({ params }: CategoryProps) {
  const { categorySlug, locale } = await params
  const t = await getTranslations('Categories')
  const category = await getCategoryBySlug(categorySlug, locale)
  const articles = await getArticlesByCategory(categorySlug, locale)

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/categories" className="hover:text-primary">
                  {t('title')}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{category.title}</li>
            </ol>
          </nav>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              {category.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {articles.length}{' '}
              {articles.length === 1 ? t('article') : t('articles')}
            </p>
          </div>

          {/* Category Content */}
          {category.content && (
            <div className="prose prose-lg max-w-none mb-12">
              {category.content}
            </div>
          )}

          {/* Articles List */}
          {articles.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'pt-BR' ? 'Artigos' : 'Articles'}
              </h2>
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow"
                >
                  <Link
                    // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
                    href={`/categories/${categorySlug}/articles/${article.slug}`}
                    className="group block"
                  >
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <time>
                        {new Date(article.publishedAt || '').toLocaleDateString(
                          locale,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                      <span className="text-primary group-hover:underline">
                        {locale === 'pt-BR' ? 'Ler artigo' : 'Read article'} →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {locale === 'pt-BR'
                  ? 'Nenhum artigo encontrado nesta categoria.'
                  : 'No articles found in this category.'}
              </p>
              <Link
                href="/categories"
                className="text-primary hover:underline text-sm mt-4 inline-block"
              >
                ←{' '}
                {locale === 'pt-BR'
                  ? 'Voltar às categorias'
                  : 'Back to categories'}
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function generateMetadata({ params }: CategoryProps) {
  const { categorySlug, locale } = await params

  try {
    const category = await getCategoryBySlug(categorySlug, locale)

    return {
      title: category.title,
      description: category.description,
      openGraph: {
        title: category.title,
        description: category.description,
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    }
  }
}
