'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import { CategoryCard } from '../CategoryCard'

interface CategoriesGridClientProps {
  categories: CategoryWithArticles[]
  locale: string
}

export function CategoriesGridClient({
  categories,
}: CategoriesGridClientProps) {
  return (
    <div className="flex flex-col gap-8">
      {categories.map((category, index) => (
        <CategoryCard key={category.slug} category={category} index={index} />
      ))}
    </div>
  )
}
