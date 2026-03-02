import type { ImageTransformations } from './cdn'

export function getCloudinaryUrl(
  filename: string,
  transformations?: ImageTransformations
): string {
  // SVGs are vector and don't support raster transformations like c_fill.
  // Serve directly with explicit format so Cloudinary can locate the file.
  if (filename.endsWith('.svg')) {
    return `https://res.cloudinary.com/dzttinf61/image/upload/f_svg/${filename}`
  }

  const extensionMatch = filename.match(/\.([^.]+)$/)
  const format = (extensionMatch?.[1] ?? 'auto') as ImageTransformations['f']

  const params = {
    q: 90,
    ...transformations,
    f: format,
  }

  const transformParts = Object.entries(params)
    .map(([key, value]) => `${key}_${value}`)
    .join(',')

  return `/__cloudinary/${transformParts}/${filename}`
}
