import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getCategories } from '@/content/categories'
import {
  CategoryRoot,
  CategoryCover,
  CategoryTitle,
  CategoryDescription,
  CategoryContent,
} from '@/components/layout/Category'
import {
  ArticleRoot,
  ArticleImage,
  ArticleTitle,
  ArticleDescription,
  ArticleDate,
  ArticleLink,
} from '@/components/layout/Article'
import { GradientDivider } from '@/components/ui/GradientDivider'
import { domAnimation, LazyMotion } from 'framer-motion'
import { BiSolidCategory } from 'react-icons/bi'

interface CategoryProps {
  params: Promise<{
    categorySlug: string
    locale: Locale
  }>
}

export default async function CategoryPage({ params }: CategoryProps) {
  const { categorySlug, locale } = await params

  const [category] = await getCategories(locale, {
    filter: { slug: categorySlug },
    withArticles: true,
  })

  return (
    <CategoryRoot category={category} className="min-h-screen">
      <div className="w-full max-w-7xl mx-auto mb-8">
        <CategoryCover />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <header>
          <CategoryTitle icon={<BiSolidCategory className="text-primary" />} />
          <GradientDivider className="mb-6" />
          <CategoryDescription />
        </header>

        <CategoryContent />

        {category.articles && category.articles.length > 0 && (
          <section className="space-y-8">
            <LazyMotion features={domAnimation} strict>
              {category.articles.map((article) => (
                <ArticleRoot
                  key={article.slug}
                  article={article}
                  className="group bg-content2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-divider/20 hover:border-divider/40"
                >
                  <div className="grid md:grid-cols-[300px_1fr] gap-0">
                    <ArticleImage className="h-48 md:h-full group-hover:brightness-110 group-hover:scale-105 transition-all duration-300" />
                    <div className="p-0 md:p-8 flex flex-col justify-between">
                      <div className="flex-1">
                        <ArticleTitle
                          as="h3"
                          className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                        />

                        <ArticleDescription className="text-sm md:text-base mb-4 line-clamp-3" />

                        <div className="mb-6">
                          <ArticleDate className="text-xs text-foreground/50" />
                        </div>
                      </div>
                      <ArticleLink className="text-primary font-semibold">
                        Read article
                      </ArticleLink>
                    </div>
                  </div>
                </ArticleRoot>
              ))}
            </LazyMotion>
          </section>
        )}
      </div>
    </CategoryRoot>
  )
}

export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  const { categorySlug, locale } = await params

  const [category] = await getCategories(locale, {
    filter: { slug: categorySlug },
    withArticles: false,
  })

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found',
    }
  }

  return {
    title: category.title,
    description: category.description,
  }
}
