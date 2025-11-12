'use client'

import { AnimatedLink } from '@/components/ui/AnimatedLink'
import type { CategoryWithArticles } from '@/types/category.type'
import { Image, Link } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

const PREVIEW_ARTICLES_LIMIT = 3

interface CategoryCardProps {
  category: CategoryWithArticles
  index: number
}

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations('Categories')

  const firstThreeArticles = useMemo(
    () => category.articles.slice(0, PREVIEW_ARTICLES_LIMIT),
    [category.articles]
  )
  const hasArticles = firstThreeArticles.length > 0

  return (
    <article
      className="group bg-content1 border border-divider/20 rounded-xl overflow-hidden
                 hover:border-divider/40 shadow-lg hover:shadow-2xl transition-all duration-300
                 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0"
      aria-label={`${category.title} category with ${category.articles.length} articles`}
    >
      {category.coverImage ? (
        <div className="relative w-full h-64 lg:h-full overflow-hidden">
          <Image
            src={category.coverImage}
            alt={category.title}
            className="object-cover w-full h-full group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
            classNames={{
              wrapper: '!max-w-full h-full w-full',
              img: 'h-full w-full object-cover',
            }}
            removeWrapper
          />
        </div>
      ) : (
        <div
          className="relative w-full h-64 lg:h-full bg-linear-to-br from-primary/30 via-secondary/20 to-primary/20
                       flex items-center justify-center group-hover:from-primary/40 group-hover:via-secondary/30 
                       group-hover:to-primary/30 transition-all duration-300"
        >
          <span className="text-7xl opacity-50 group-hover:opacity-70 transition-opacity duration-300">
            📚
          </span>
        </div>
      )}

      <div className="p-6 lg:p-8 flex flex-col">
        <div className="mb-4">
          <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {category.title}
          </h3>
          <p className="text-sm text-foreground/60">
            {t('articlesInTrail', { count: category.articles.length })}
          </p>
        </div>

        <p className="text-foreground/70 mb-6 line-clamp-3 text-base">
          {category.description}
        </p>

        {hasArticles ? (
          <>
            <p className="text-sm font-semibold text-primary mb-4">
              📍 {t('startHere')}
            </p>

            <div className="space-y-3 mb-6 flex-1">
              {firstThreeArticles.map((article) => (
                <Link
                  key={article.slug}
                  // @ts-expect-error - Dynamic route typing
                  href={`/categories/${category.slug}/articles/${article.slug}`}
                  className="flex items-start gap-4 p-3 rounded-lg 
                               hover:bg-content2 transition-colors group"
                  aria-label={`Read article: ${article.title}`}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-full 
                                bg-primary/10 flex items-center justify-center
                                group-hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-primary font-bold">
                      {firstThreeArticles.indexOf(article) + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex items-center">
                    <p
                      className="font-medium line-clamp-2 
                                  group-hover:text-primary transition-colors"
                    >
                      {article.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-auto">
              <AnimatedLink
                // @ts-expect-error - Dynamic route typing
                href={`/categories/${category.slug}`}
                className="text-base text-primary font-medium"
              >
                {t('viewFullTrail')}
              </AnimatedLink>
            </div>
          </>
        ) : (
          <div className="text-center py-8 flex-1 flex items-center justify-center">
            <p className="text-foreground/50">{t('comingSoon')}</p>
          </div>
        )}
      </div>
    </article>
  )
}
