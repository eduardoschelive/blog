import {
  ArticleRoot,
  ArticleContent,
  ArticleTOC,
  ArticleHeader,
  ArticleCover,
} from '@/components/composables/Article'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import { getArticles } from '@/content/articles'
import { getTranslations } from 'next-intl/server'
import type { Locale } from 'next-intl'
import { TbFileText, TbHome, TbFolder } from 'react-icons/tb'
import { TbCategory } from 'react-icons/tb'
import type { Metadata } from 'next'

interface ArticleProps {
  params: Promise<{
    categorySlug: string
    articleSlug: string
    locale: Locale
  }>
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { categorySlug, articleSlug, locale } = await params
  const t = await getTranslations()

  const articles = await getArticles(locale, {
    filter: { categorySlug, slug: articleSlug },
    limit: 1,
  })

  const article = articles[0]

  if (!article) {
    throw new Error(
      `Article not found: ${categorySlug}/${articleSlug} (${locale})`
    )
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundDecorations />
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
            label: article.category.title,
            href: `/categories/${categorySlug}`,
            icon: <TbFolder className="text-base shrink-0" />,
          },
          {
            label: article.title,
            icon: <TbFileText className="text-base shrink-0" />,
          },
        ]}
      />

      <ArticleRoot article={article}>
        <ArticleCover />
        <ArticleHeader />

        <div className="w-full px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
              <ArticleContent />
              <ArticleTOC />
            </div>
          </div>
        </div>
      </ArticleRoot>
    </div>
  )
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const { categorySlug, articleSlug, locale } = await params

  const articles = await getArticles(locale, {
    filter: { categorySlug, slug: articleSlug },
    limit: 1,
  })

  const article = articles[0]

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found',
    }
  }

  return {
    title: article.title,
    description: article.description || article.title,
  }
}
