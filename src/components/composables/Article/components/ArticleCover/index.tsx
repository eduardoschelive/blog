'use client'

import { ArticleImage } from '../ArticleImage'
import { useArticle } from '../../context'
import { m } from 'framer-motion'

export function ArticleCover() {
  const { article } = useArticle()

  if (!article.coverImage) return null

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="w-full max-w-7xl mx-auto mb-8"
    >
      <ArticleImage className="h-[300px] md:h-[400px] lg:h-[500px]" />
    </m.div>
  )
}
