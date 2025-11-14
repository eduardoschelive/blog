'use client'

import { ArticleImage } from '../ArticleImage'
import { useArticle } from '../../context'
import { ScaleIn } from '@/components/animated/ScaleIn'

export function ArticleCover() {
  const { article } = useArticle()

  if (!article.coverImage) return null

  return (
    <ScaleIn className="w-full max-w-7xl mx-auto mb-8">
      <ArticleImage className="h-[300px] md:h-[400px] lg:h-[500px]" />
    </ScaleIn>
  )
}
