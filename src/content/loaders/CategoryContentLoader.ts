import { CATEGORIES_DIR } from '@/constants/content'
import { categorySchema } from '@/schemas/category.schema'
import type { Category, CategoryBase } from '@/types/category.type'
import type { Locale } from 'next-intl'
import { BaseContentLoader } from '../core/BaseContentLoader'

export class CategoryContentLoader extends BaseContentLoader<
  CategoryBase,
  Category
> {
  constructor() {
    super({
      baseDir: CATEGORIES_DIR,
      contentType: 'Category',
      schema: categorySchema,
      verbose: false,
    })
  }

  protected async enrichContent(
    base: CategoryBase,
    content: React.ReactElement,
    context: {
      slug: string
      locale: Locale
      filePath: string
    }
  ): Promise<Category> {
    return {
      ...base,
      content,
      locale: context.locale,
      slug: context.slug,
    }
  }

  async loadInfo(
    slug: string,
    locale: Locale
  ): Promise<CategoryBase & { slug: string }> {
    const filePath = this.buildFilePath(slug, locale)

    try {
      const result = await this.loadContentFile(filePath, slug, locale)
      if (!result) {
        return this.getDefaultCategoryInfo(slug)
      }

      return {
        ...result.base,
        slug,
      }
    } catch (error) {
      this.logWarning('Failed to load category info, using defaults', {
        slug,
        locale,
        error,
      })
      return this.getDefaultCategoryInfo(slug)
    }
  }

  private getDefaultCategoryInfo(
    slug: string
  ): CategoryBase & { slug: string } {
    return {
      slug,
      title: slug.replace(/-/g, ' '),
      description: '',
    }
  }
}
