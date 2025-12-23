import type { Locale } from 'next-intl'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { compileContent } from '../shared/compileContent'
import { parseFrontmatter } from '../shared/parseFrontmatter'
import { readFileContent } from '../shared/readFile'
import type { ContentLoaderConfig } from './types'

export abstract class ContentLoader<TBase, TEnriched> {
  protected readonly config: ContentLoaderConfig<TBase>

  constructor(config: ContentLoaderConfig<TBase>) {
    this.config = config
  }

  protected scanDirectory(baseDir: string): string[] {
    try {
      return readdirSync(baseDir).filter((item) => {
        const itemPath = path.join(baseDir, item)
        return statSync(itemPath).isDirectory()
      })
    } catch (error) {
      this.logError('Failed to scan directory', { baseDir, error })
      return []
    }
  }

  protected async loadContentFile(
    filePath: string,
    slug: string,
    locale: Locale
  ): Promise<{ base: TBase; content: React.ReactElement } | null> {
    try {
      const fileContent = readFileContent(filePath)
      const { content, frontmatter } = await compileContent(
        fileContent,
        filePath
      )
      const parsedData = parseFrontmatter(
        frontmatter,
        this.config.schema,
        filePath
      )

      return {
        base: parsedData as TBase,
        content,
      }
    } catch (error) {
      this.logError('Failed to load content file', {
        filePath,
        slug,
        locale,
        error,
      })
      return null
    }
  }

  protected abstract enrichContent(
    base: TBase,
    content: React.ReactElement,
    context: {
      slug: string
      locale: Locale
      filePath: string
    }
  ): Promise<TEnriched>

  protected logError(message: string, context: Record<string, unknown>): void {
    const { error, ...safeContext } = context
    console.error(
      `[${this.config.contentType}] ${message}:`,
      safeContext,
      error instanceof Error ? error.message : error
    )
  }

  protected logWarning(
    message: string,
    context: Record<string, unknown>
  ): void {
    console.warn(`[${this.config.contentType}] ${message}:`, context)
  }

  protected logInfo(message: string, context?: Record<string, unknown>): void {
    if (this.config.verbose) {
      console.log(
        `[${this.config.contentType}] ${message}`,
        context ? context : ''
      )
    }
  }

  protected buildFilePath(slug: string, locale: Locale): string {
    return path.join(this.config.baseDir, slug, `${locale}.mdx`)
  }

  protected contentExists(slug: string, locale: Locale): boolean {
    try {
      const filePath = this.buildFilePath(slug, locale)
      const stat = statSync(filePath)
      return stat.isFile()
    } catch {
      return false
    }
  }

  protected validateLocales(slug: string, requiredLocales: Locale[]): boolean {
    const missing = requiredLocales.filter(
      (locale) => !this.contentExists(slug, locale)
    )

    if (missing.length > 0) {
      this.logWarning('Missing locale files', { slug, missingLocales: missing })
      return false
    }

    return true
  }
}
