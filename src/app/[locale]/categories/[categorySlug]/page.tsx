import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getCategories } from '@/content/categories'
import { LOCALES } from '@/constants/locale'
import {
  CategoryRoot,
  CategoryCover,
  CategoryContent,
} from '@/components/composables/Category'
import { ArticleCard } from '@/components/layout/ArticleCard'
import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { GradientDivider } from '@/components/ui/GradientDivider'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { TbCategory } from 'react-icons/tb'
import { TbHome, TbFolder } from 'react-icons/tb'

export const dynamic = 'force-static'
export const dynamicParams = false

type PageParams = {
  categorySlug: string
  locale: Locale
}

interface PageProps {
  params: Promise<PageParams>
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const params: PageParams[] = []

  for (const locale of LOCALES) {
    const categories = await getCategories(locale)

    for (const category of categories) {
      params.push({
        locale,
        categorySlug: category.slug,
      })
    }
  }

  return params
}

export default async function CategoryPage({ params }: PageProps) {
  const { categorySlug, locale } = await params
  const t = await getTranslations()

  const [category] = await getCategories(locale, {
    filter: { slug: categorySlug },
    withArticles: true,
  })

  return (
    <CategoryRoot category={category} className="min-h-screen">
      <Breadcrumbs
        items={[
          {
            label: t('Navbar.home'),
            href: '/',
            icon: <TbHome className="text-base shrink-0" />,
          },
          {
            label: t('Navbar.categories'),
            href: '/categories',
            icon: <TbCategory className="text-base shrink-0" />,
          },
          {
            label: category.title,
            icon: <TbFolder className="text-base shrink-0" />,
          },
        ]}
      />

      <div className="w-full max-w-7xl mx-auto mb-8">
        <CategoryCover />
      </div>

      <PageHeaderRoot>
        <PageHeaderTitle
          icon={
            <TbCategory className="text-primary text-4xl md:text-5xl lg:text-6xl" />
          }
        >
          {category.title}
        </PageHeaderTitle>

        <GradientDivider />

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
}: PageProps): Promise<Metadata> {
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
