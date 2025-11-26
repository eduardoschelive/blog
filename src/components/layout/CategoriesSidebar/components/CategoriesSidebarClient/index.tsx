'use client'

import { AnimatedLink } from '@/components/animated/AnimatedLink'
import { Link } from '@/i18n/navigation'
import type { CategoryWithArticles } from '@/types/category.type'
import { useTranslations } from 'next-intl'
import { cn } from '@heroui/react'

interface CategoriesSidebarClientProps {
  categories: CategoryWithArticles[]
}

export function CategoriesSidebarClient({
  categories,
}: CategoriesSidebarClientProps) {
  const t = useTranslations('HomePage.categories')

  return (
    <div
      className={cn('hidden lg:block sticky top-20 lg:top-24 self-start mt-24')}
    >
      <div className="flex items-center mb-6">
        <AnimatedLink
          href="/categories"
          className="text-2xl font-semibold hover:text-primary transition-colors duration-200"
        >
          {t('title')}
        </AnimatedLink>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group block border-l-2 border-secondary/40 hover:border-primary pl-4 py-2 transition-all duration-300"
          >
            <div className="flex items-baseline justify-between gap-2 mb-1 min-w-0">
              <h3 className="text-foreground group-hover:text-primary transition-colors duration-200 font-semibold truncate flex-1 min-w-0">
                {category.title}
              </h3>
              <span className="text-xs text-foreground/40 group-hover:text-secondary transition-colors duration-200 tabular-nums shrink-0">
                {category.articles.length}
              </span>
            </div>
            <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-200 line-clamp-2">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
