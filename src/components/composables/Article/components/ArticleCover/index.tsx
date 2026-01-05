'use client'

import { ArticleImage } from '../ArticleImage'
import { useArticle } from '../../context'

export function ArticleCover() {
  const { article } = useArticle()

  if (!article.coverImage) return null

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <ArticleImage variant="cover" className="lg:h-[400px]" />
    </div>
  )
}
