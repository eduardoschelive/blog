import type { ImageTransformations } from './cdn'

export function getCloudinaryUrl(
  filename: string,
  transformations?: ImageTransformations
): string {
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
