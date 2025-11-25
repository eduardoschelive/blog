'use client'

import { Image, type ImageProps } from '@heroui/react'
import { getCDNImageUrl, type ImageTransformations } from '@/utils/cdn'

export interface ImageCDNProps extends Omit<ImageProps, 'src'> {
  filename: string
  transformations?: ImageTransformations
}

export function ImageCDN({
  filename,
  transformations,
  alt,
  ...props
}: ImageCDNProps) {
  const imageUrl = getCDNImageUrl(filename, transformations)

  return <Image src={imageUrl} alt={alt} {...props} />
}
