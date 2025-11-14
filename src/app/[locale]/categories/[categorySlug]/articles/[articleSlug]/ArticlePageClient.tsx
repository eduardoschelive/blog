'use client'

import {
  ArticleRoot,
  ArticleContent,
  ArticleTOC,
  ArticleHeader,
  ArticleCover,
} from '@/components/composables/Article'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import { useTranslations } from 'next-intl'
import { TbFileText, TbHome, TbFolder, TbCategory } from 'react-icons/tb'
import { useRef } from 'react'
import type { Article } from '@/types/article.type'

interface ArticlePageClientProps {
  article: Article
  categorySlug: string
}

export function ArticlePageClient({
  article,
  categorySlug,
}: ArticlePageClientProps) {
  const t = useTranslations()
  const articleContentRef = useRef<HTMLElement>(null)

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
              <ArticleContent ref={articleContentRef} />
              <ArticleTOC containerRef={articleContentRef} />
            </div>
          </div>
        </div>
      </ArticleRoot>
    </div>
  )
}
