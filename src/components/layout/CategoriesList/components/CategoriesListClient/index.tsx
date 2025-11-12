'use client'

import type { CategoryWithArticles } from '@/types/category.type'
import {
  CategoryCardRoot,
  CategoryCardCover,
  CategoryCardHeader,
  CategoryCardContent,
  CategoryCardArticleList,
  CategoryCardFooter,
} from '../CategoryCard'
import { domAnimation, LazyMotion } from 'framer-motion'

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
          <CategoryCardRoot
            key={category.slug}
            category={category}
            className="group bg-content2 border border-divider/20 rounded-xl overflow-hidden
                     shadow-lg hover:scale-[1.05] transition-all duration-300
                     grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0"
          >
            <CategoryCardCover />

            <CategoryCardContent>
              <CategoryCardHeader />
              <p className="text-foreground/70 mb-6 line-clamp-3 text-base">
                {category.description}
              </p>
              <CategoryCardArticleList />
              <CategoryCardFooter />
            </CategoryCardContent>
          </CategoryCardRoot>
        ))}
      </LazyMotion>
    </div>
  )
}
