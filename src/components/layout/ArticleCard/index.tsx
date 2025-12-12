'use client'

import type { Article } from '@/types/article.type'
import {
  ArticleCategory,
  ArticleDate,
  ArticleDescription,
  ArticleImage,
  ArticleLink,
  ArticleRoot,
  ArticleTitle,
  ArticleReadingTime,
} from '@/components/composables/Article'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { cn } from '@heroui/react'
import { memo } from 'react'

interface ArticleCardProps {
  article: Article
  showCategoryChip?: boolean
  showDateIcon?: boolean
  linkText: string
  className?: string
}

export const ArticleCard = memo(function ArticleCard({
  article,
  showCategoryChip = false,
  showDateIcon = false,
  linkText,
  className,
}: ArticleCardProps) {
  return (
    <ScrollReveal>
      <HoverCard>
        <ArticleRoot
          article={article}
          className={cn(
            'bg-content2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-divider/20 hover:border-divider/40',
            className
          )}
        >
          <div className="grid md:grid-cols-[300px_1fr] gap-0">
            <ArticleImage className="h-48 md:h-full group-hover:brightness-110 group-hover:scale-105 transition-all duration-300" />
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div className="flex-1">
                {showCategoryChip && (
                  <div className="mb-3">
                    <ArticleCategory asChip />
                  </div>
                )}

                <ArticleTitle
                  as="h3"
                  className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                />

                <ArticleDescription className="text-sm md:text-base mb-4 line-clamp-3" />

                <div className="mb-6 flex items-center gap-4">
                  <ArticleDate showIcon={showDateIcon} className="text-xs" />
                  <ArticleReadingTime className="text-xs" />
                </div>
              </div>
              <ArticleLink className="text-primary font-semibold">
                {linkText}
              </ArticleLink>
            </div>
          </div>
        </ArticleRoot>
      </HoverCard>
    </ScrollReveal>
  )
})
