'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import { CategoryCard } from '@/components/layout/CategoryCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PREVIEW_ARTICLES_LIMIT } from '@/constants/content'

interface CategoriesListClientProps {
  categories: CategoryWithArticles[]
}

export function CategoriesListClient({
  categories,
}: CategoriesListClientProps) {
  return (
    <div className="flex flex-col gap-8">
      {categories.map((category) => (
        <ScrollReveal key={category.slug}>
          <CategoryCard category={category} limit={PREVIEW_ARTICLES_LIMIT} />
        </ScrollReveal>
      ))}
    </div>
  )
}
