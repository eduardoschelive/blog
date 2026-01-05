import { IMAGE_DIMENSIONS } from '@/constants/images'
import type { Category } from '@/schemas/category.schema'

export type ImageVariant = 'cover' | 'thumbnail'

export function getImageSource(
  category: Category,
  variant: ImageVariant
): string | undefined {
  return variant === 'thumbnail'
    ? category.thumbnail || category.coverImage
    : category.coverImage
}

export function getDimensions(variant: ImageVariant) {
  return variant === 'thumbnail'
    ? IMAGE_DIMENSIONS.THUMBNAIL
    : IMAGE_DIMENSIONS.COVER
}
