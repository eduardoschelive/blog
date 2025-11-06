import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  slug: z.string(),
  coverImage: z.string().optional(),
})

export type Article = z.infer<typeof articleSchema>
