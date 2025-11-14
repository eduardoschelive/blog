import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getCategories } from '@/content/categories'
import {
  CategoryRoot,
  CategoryCover,
  CategoryContent,
} from '@/components/layout/Category'
import { ArticleCard } from '@/components/layout/ArticleCard'
import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderDivider,
  PageHeaderSubtitle,
} from '@/components/ui/PageHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { BiSolidCategory } from 'react-icons/bi'
import { HiHome, HiFolder } from 'react-icons/hi2'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'

interface CategoryProps {
  params: Promise<{
    categorySlug: string
    locale: Locale
  }>
}

export default async function CategoryPage({ params }: CategoryProps) {
  const { categorySlug, locale } = await params
  const t = await getTranslations()

  const [category] = await getCategories(locale, {
    filter: { slug: categorySlug },
    withArticles: true,
  })

  return (
    <CategoryRoot category={category} className="min-h-screen">
      <BackgroundDecorations />
      <Breadcrumbs
        items={[
          {
            label: t('Navbar.home'),
            href: '/',
            icon: <HiHome className="text-base shrink-0" />,
          },
          {
            label: t('Navbar.categories'),
            href: '/categories',
            icon: <BiSolidCategory className="text-base shrink-0" />,
          },
          {
            label: category.title,
            icon: <HiFolder className="text-base shrink-0" />,
          },
        ]}
      />

      <div className="w-full max-w-7xl mx-auto mb-8">
        <CategoryCover />
      </div>

      <PageHeaderRoot>
        <PageHeaderTitle
          icon={
            <BiSolidCategory className="text-primary text-4xl md:text-5xl lg:text-6xl" />
          }
        >
          {category.title}
        </PageHeaderTitle>

        <PageHeaderDivider />

        {category.description && (
          <PageHeaderSubtitle>{category.description}</PageHeaderSubtitle>
        )}
      </PageHeaderRoot>

      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal>
            <CategoryContent />
          </ScrollReveal>

          {category.articles && category.articles.length > 0 && (
            <section className="space-y-8">
              {category.articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  showDateIcon
                  linkText={t('Categories.readArticle')}
                />
              ))}
            </section>
          )}
        </div>
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
