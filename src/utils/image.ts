import { IMAGE_DIMENSIONS } from '@/constants/images'
import type { Category } from '@/schemas/category.schema'
import type { Article } from '@/schemas/article.schema'

export type ImageVariant = 'cover' | 'thumbnail'
export type ImageEntity = Category | Article

export function getImageSource(
  entity: ImageEntity,
  variant: ImageVariant
): string | undefined {
  return variant === 'thumbnail'
    ? entity.thumbnail || entity.coverImage
    : entity.coverImage
}

export function getDimensions(variant: ImageVariant) {
  return variant === 'thumbnail'
    ? IMAGE_DIMENSIONS.THUMBNAIL
    : IMAGE_DIMENSIONS.COVER
}
