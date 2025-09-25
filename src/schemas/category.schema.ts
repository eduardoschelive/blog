import { z } from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  color: z.string(),
  icon: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.string(),
  slug: z.string(),
})

export type CategoryFrontmatter = z.infer<typeof categorySchema>
