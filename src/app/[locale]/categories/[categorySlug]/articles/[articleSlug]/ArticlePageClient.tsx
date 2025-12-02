'use client'

import {
  ArticleRoot,
  ArticleContent,
  ArticleTOC,
  ArticleHeader,
  ArticleCover,
} from '@/components/composables/Article'
import { ShareButtons } from '@/components/layout/ShareButtons'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getLocalizedArticleUrl } from '@/utils/localizedUrl'
import { useTranslations, useLocale } from 'next-intl'
import { TbFileText, TbHome, TbFolder, TbCategory } from 'react-icons/tb'
import { useRef, useEffect } from 'react'
import type { Article } from '@/types/article.type'
import { useScroll } from '@/hooks/useScroll'

interface ArticlePageClientProps {
  article: Article
  categorySlug: string
}

export function ArticlePageClient({
  article,
  categorySlug,
}: ArticlePageClientProps) {
  const t = useTranslations()
  const locale = useLocale()
  const articleContentRef = useRef<HTMLElement>(null)
  const { scrollToHeading } = useScroll()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eduardoschelive.com'
  const articleUrl = getLocalizedArticleUrl(
    categorySlug,
    article.slug,
    locale as 'pt-BR' | 'en-US',
    baseUrl
  )

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.slice(1)

    const element = document.getElementById(id)
    if (element) {
      scrollToHeading(id)
      return
    }

    const observer = new MutationObserver(() => {
      const el = document.getElementById(id)
      if (el) {
        observer.disconnect()
        scrollToHeading(id)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id'],
    })

    return () => observer.disconnect()
  }, [scrollToHeading])

  return (
    <div className="min-h-screen">
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
              <aside className="space-y-8">
                <ShareButtons title={article.title} url={articleUrl} />
                <ArticleTOC containerRef={articleContentRef} />
              </aside>
            </div>
          </div>
        </div>
      </ArticleRoot>
    </div>
  )
}
