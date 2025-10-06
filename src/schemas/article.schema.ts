import { z } from 'zod'

export const articleSchema = z.object({
  id: z.number(),
  title: z.string({
    error: 'Article title must be a string',
  }),
  description: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  slug: z.string(),
})

export type Article = z.infer<typeof articleSchema>
