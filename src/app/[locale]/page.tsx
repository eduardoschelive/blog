import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/layout/Hero'
import { getArticles } from '@/content/articles'
import { getCategories } from '@/content/categories'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

interface HomePageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations('HomePage')

  const recentArticles = await getArticles(locale, { limit: 6 })
  const categories = await getCategories(locale, { limit: 4 })

  const featuredArticle = recentArticles[0]
  const latestArticles = recentArticles.slice(1, 4)

  return (
    <>
      <Header />
      <main className="font-sans bg-background">
        {/* Hero Section */}
        <Hero
          latestArticle={
            featuredArticle
              ? {
                  title: featuredArticle.title,
                  slug: featuredArticle.slug,
                  description: featuredArticle.description,
                  coverImage: featuredArticle.coverImage,
                  category: featuredArticle.category,
                  createdAt: featuredArticle.createdAt,
                }
              : undefined
          }
        />
        {/* Latest Articles */}
        {latestArticles.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t('latest.title')}</h2>
              <Link
                href="/categories"
                className="text-primary hover:underline font-medium"
              >
                {t('latest.viewAll')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
                  href={`/categories/${article.category.slug}/articles/${article.slug}`}
                  className="group block"
                >
                  <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border h-full">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📄</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {article.category.title}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString(
                              locale,
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )
                          : 'Data não disponível'}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="bg-secondary/5 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {t('categories.title')}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {t('categories.subtitle')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
                    href={`/categories/${category.slug}`}
                    className="group block"
                  >
                    <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 border group-hover:border-primary/50">
                      <div className="text-3xl mb-3">📚</div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/categories"
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  {t('categories.viewAll')} →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Link
              href="/about"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              {t('cta.button')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('HomePage')

  return {
    title: locale === 'pt-BR' ? 'Início' : 'Home',
    description: t('hero.subtitle'),
    openGraph: {
      title: t('hero.title'),
      description: t('hero.subtitle'),
      type: 'website',
    },
  }
}
