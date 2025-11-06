import { z } from 'zod'

export const categorySchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
})

export type Category = z.infer<typeof categorySchema>
