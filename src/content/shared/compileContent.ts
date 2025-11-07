'use server'

import { ContentParsingError } from '@/error/ContentParsingError'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getMDXComponents } from './getMDXComponents'

async function compileContent(source: string, filePath: string) {
  try {
    return await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
      },
      components: getMDXComponents(),
    })
  } catch (err) {
    throw new ContentParsingError(
      `Failed to compile MDX for ${filePath}: ${(err as Error).message}`,
      err
    )
  }
}

export { compileContent }
