import { ContentParsingError } from '@/errors/ContentParsingError'
import type z from 'zod'

function parseFrontmatter<T>(
  frontmatter: unknown,
  schema: z.ZodType<T>,
  filePath: string
) {
  const parsed = schema.safeParse(frontmatter)
  if (!parsed.success) {
    const { path, message } = parsed.error.issues[0]
    throw new ContentParsingError(
      `Error parsing frontmatter in ${filePath}: ${path.join('.')}: ${message}`,
      parsed.error
    )
  }
  return parsed.data
}

export { parseFrontmatter }
