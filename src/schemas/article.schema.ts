import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string({
    error: 'Article title must be a string',
  }),
})
