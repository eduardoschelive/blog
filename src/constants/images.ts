import type { ImageTransformations } from '@/utils/cdn'

/**
 * Standard image dimensions for different use cases
 */

export const IMAGE_DIMENSIONS = {
  /**
   * Cover images for articles and categories
   * Used in full-width hero sections
   */
  COVER: {
    w: 1600,
    h: 900,
    c: 'fill',
    f: 'auto',
    q: 'auto',
  } satisfies ImageTransformations,

  /**
   * Thumbnail images for cards and listings
   * Used in article/category cards
   */
  THUMBNAIL: {
    w: 800,
    h: 450,
    c: 'fill',
    f: 'auto',
    q: 'auto',
  } satisfies ImageTransformations,

  /**
   * Open Graph images for social sharing
   * Standard OG image size (1200x630)
   */
  OG: {
    w: 1200,
    h: 630,
    c: 'fill',
    g: 'auto',
    f: 'auto',
    q: 'auto',
  } satisfies ImageTransformations,
} as const
