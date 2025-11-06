import type { JSXElementConstructor, ReactElement } from 'react'
import type { z } from 'zod'
import type { categorySchema } from '@/schemas/category.schema'

export type CategoryBase = z.infer<typeof categorySchema>

export interface Category extends CategoryBase {
  content: ReactElement<unknown, string | JSXElementConstructor<unknown>>
  locale: string
}
