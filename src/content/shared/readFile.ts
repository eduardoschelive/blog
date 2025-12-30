import { ContentParsingError } from '@/errors/ContentParsingError'
import { readFileSync } from 'fs'

function readFileContent(filePath: string): string {
  try {
    return readFileSync(filePath, 'utf-8')
  } catch (err) {
    throw new ContentParsingError(
      `Failed to read file at ${filePath}: ${(err as Error).message}`,
      err
    )
  }
}

export { readFileContent }
