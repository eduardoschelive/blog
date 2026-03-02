'use server'

import { ContentParsingError } from '@/errors/ContentParsingError'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getMDXComponents } from './getMDXComponents'
import remarkGfm from 'remark-gfm'

async function compileContent(source: string, filePath: string) {
  try {
    return await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        // Content is author-controlled, not user-submitted, so JS expressions are safe
        blockJS: false,
        blockDangerousJS: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
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
