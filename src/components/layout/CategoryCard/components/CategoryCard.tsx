'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import {
  CategoryRoot,
  CategoryImage,
  CategoryLink,
} from '@/components/composables/Category'
import { HoverCard } from '@/components/ui/HoverCard'
import { Link } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { TbFileText } from 'react-icons/tb'
import { memo } from 'react'

interface CategoryCardProps {
  category: CategoryWithArticles
  limit?: number
}

export const CategoryCard = memo(function CategoryCard({
  category,
  limit = 3,
}: CategoryCardProps) {
  const t = useTranslations('Categories')
  const previewArticles = category.articles.slice(0, limit)
  const hasArticles = previewArticles.length > 0

  return (
    <HoverCard>
      <CategoryRoot
        category={category}
        className="bg-content2 border border-divider/20 rounded-xl overflow-hidden
                   shadow-lg grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0"
      >
        <CategoryImage
          responsive={{ mobile: 'cover', desktop: 'thumbnail' }}
          height="h-48 lg:h-full"
          iconSize="md"
        />

        <div className="p-4 lg:p-8 flex flex-col">
          <div className="mb-3 lg:mb-4">
            <Link
              href={`/categories/${category.slug}`}
              className="text-3xl font-bold mb-2 hover:text-primary transition-colors block"
            >
              {category.title}
            </Link>
            <p className="text-sm text-foreground/60">
              {t('articlesInTrail', { count: category.articles.length })}
            </p>
          </div>

          <p className="text-foreground/70 mb-4 lg:mb-6 line-clamp-2 lg:line-clamp-3 text-sm lg:text-base">
            {category.description}
          </p>

          {!hasArticles && (
            <div className="text-center py-6 lg:py-8 flex-1 flex items-center justify-center">
              <p className="text-foreground/50 text-sm lg:text-base">
                {t('comingSoon')}
              </p>
            </div>
          )}

          {hasArticles && (
            <>
              <p className="text-xs lg:text-sm font-semibold text-primary mb-3 lg:mb-4">
                📍 {t('startHere')}
              </p>

              <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                {previewArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/categories/${category.slug}/articles/${article.slug}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-content2 transition-colors group"
                    aria-label={`${t('readArticle')}: ${article.title}`}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {article.sequence ? (
                        <span className="text-primary font-bold">
                          {article.sequence}
                        </span>
                      ) : (
                        <TbFileText className="text-primary text-xl" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <CategoryLink>{t('viewFullTrail')}</CategoryLink>
        </div>
      </CategoryRoot>
    </HoverCard>
  )
})
