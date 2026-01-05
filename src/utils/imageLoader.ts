import type { ImageLoaderProps } from 'next/image'

export default function cloudinaryLoader({
  src,
  width,
}: ImageLoaderProps): string {
  if (!src.startsWith('/__cloudinary/')) {
    return `${src}?w=${width}`
  }

  const match = src.match(/\/__cloudinary\/([^/]+)\/(.+)$/)

  if (!match) {
    return `${src}?w=${width}`
  }

  const [, transformations, filename] = match

  const parts = transformations.split(',')
  const newParts: string[] = []
  let originalWidth = 0
  let originalHeight = 0

  for (const part of parts) {
    const [key, value] = part.split('_')
    if (key === 'w') {
      originalWidth = parseInt(value)
    } else if (key === 'h') {
      originalHeight = parseInt(value)
    } else {
      newParts.push(part)
    }
  }

  const aspectRatio = originalHeight / originalWidth
  const height = Math.round(width * aspectRatio)

  newParts.unshift(`w_${width}`, `h_${height}`)

  const extensionMatch = filename.match(/\.([^.]+)$/)
  const format = extensionMatch ? extensionMatch[1] : 'webp'

  newParts.push(`f_${format}`)

  return `https://cdn.eduardoschelive.com/images/${newParts.join(',')}/${filename}`
}
