'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import { CategoryCard } from '@/components/layout/CategoryCard'
import { domAnimation, LazyMotion } from 'framer-motion'
import { PREVIEW_ARTICLES_LIMIT } from '@/constants/content'

interface CategoriesListClientProps {
  categories: CategoryWithArticles[]
}

export function CategoriesListClient({
  categories,
}: CategoriesListClientProps) {
  return (
    <div className="flex flex-col gap-8">
      <LazyMotion features={domAnimation} strict>
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            limit={PREVIEW_ARTICLES_LIMIT}
          />
        ))}
      </LazyMotion>
    </div>
  )
}
