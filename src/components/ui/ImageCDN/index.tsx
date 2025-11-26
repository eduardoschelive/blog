'use client'

import { Image, type ImageProps } from '@heroui/react'
import NextImage from 'next/image'
import { getCDNImageUrl, type ImageTransformations } from '@/utils/cdn'

export interface ImageCDNProps extends Omit<ImageProps, 'src' | 'as'> {
  filename: string
  transformations?: ImageTransformations
  width?: number
  height?: number
  priority?: boolean
}

export function ImageCDN({
  filename,
  transformations,
  alt,
  width,
  height,
  priority = false,
  ...props
}: ImageCDNProps) {
  const imageUrl = getCDNImageUrl(filename, transformations)

  return (
    <Image
      as={NextImage}
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={100} // Use CDN transformations
      {...props}
    />
  )
}
