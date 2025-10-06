import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getAllCategories } from '@/content/getAllCategories'
import { getRecentArticles } from '@/content/getRecentArticles'
import { Link } from '@/i18n/navigation'
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

  const recentArticles = await getRecentArticles(locale, 6)
  const allCategories = await getAllCategories()
  const categories = allCategories
    .filter((category) => category.locale === locale)
    .slice(0, 4) // Show only first 4 categories

  const featuredArticle = recentArticles[0]
  const latestArticles = recentArticles.slice(1, 4)

  return (
    <>
      <Header />
      <main className="font-sans bg-background min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/categories"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t('hero.exploreButton')}
              </Link>
              <Link
                href="/about"
                className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                {t('hero.aboutButton')}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t('featured.title')}
            </h2>
            <Link
              // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
              href={`/categories/${featuredArticle.categorySlug}/articles/${featuredArticle.slug}`}
              className="group block"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="text-sm text-primary font-semibold mb-3 uppercase tracking-wide">
                      {featuredArticle.categorySlug.replace('-', ' ')}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {featuredArticle.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <time>
                        {featuredArticle.createdAt
                          ? new Date(
                              featuredArticle.createdAt
                            ).toLocaleDateString(locale, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Data não disponível'}
                      </time>
                      <span className="ml-auto text-primary group-hover:translate-x-2 transition-transform">
                        {t('featured.readMore')} →
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-1/2 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-8">
                    <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <div className="text-sm text-muted-foreground">
                          {t('featured.article')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

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
                  href={`/categories/${article.categorySlug}/articles/${article.slug}`}
                  className="group block"
                >
                  <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border h-full">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📄</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {article.categorySlug.replace('-', ' ')}
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
                    key={category.currentSlug}
                    // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
                    href={`/categories/${category.currentSlug}`}
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

export async function generateMetadata({ params }: HomePageProps) {
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
