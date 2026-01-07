import type { ImageTransformations } from './cdn'

export function getCloudinaryUrl(
  filename: string,
  transformations?: ImageTransformations
): string {
  // SVGs don't need Cloudinary transformations, return direct CDN URL
  if (filename.endsWith('.svg')) {
    return `https://cdn.eduardoschelive.com/images/${filename}`
  }

  const params = {
    q: 90,
    f: 'auto',
    ...transformations,
  }

  const transformParts = Object.entries(params)
    .map(([key, value]) => `${key}_${value}`)
    .join(',')

  return `/__cloudinary/${transformParts}/${filename}`
}
