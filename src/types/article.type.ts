import type { JSXElementConstructor, ReactElement } from 'react'
import type { z } from 'zod'
import type { articleSchema } from '@/schemas/article.schema'
import type { CategoryBase } from './category.type'

export type ArticleBase = z.infer<typeof articleSchema>

export interface Article extends ArticleBase {
  content: ReactElement<unknown, string | JSXElementConstructor<unknown>>
  slug: string
  locale: string
  category: CategoryBase
  createdAt: Date | null
  updatedAt: Date | null
  sequence: number | null
}
