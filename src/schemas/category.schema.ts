import { z } from 'zod'

export const categorySchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  coverImage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
})

export type Category = z.infer<typeof categorySchema>
