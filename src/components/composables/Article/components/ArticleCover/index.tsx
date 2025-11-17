'use client'

import { ArticleImage } from '../ArticleImage'
import { useArticle } from '../../context'

export function ArticleCover() {
  const { article } = useArticle()

  if (!article.coverImage) return null

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <ArticleImage className="h-[250px] md:h-[300px] lg:h-[350px]" />
    </div>
  )
}
