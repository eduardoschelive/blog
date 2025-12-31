'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import type { HTMLAttributes } from 'react'
import NextImage from 'next/image'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'
import { IMAGE_DIMENSIONS } from '@/constants/images'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'cover' | 'thumbnail'
  fallbackIcon?: string
}

export function ArticleImage({
  variant = 'cover',
  className,
  fallbackIcon = '📰',
  ...props
}: ArticleImageProps) {
  const { article } = useArticle()

  // Image selection logic with fallback chain
  const imageSource =
    variant === 'thumbnail'
      ? article.thumbnail || article.coverImage
      : article.coverImage

  if (!imageSource) {
    return (
      <FallbackImage
        icon={fallbackIcon}
        title={article.category.title}
        gradient="medium"
        iconSize="md"
        className={className}
      />
    )
  }

  // Dimension selection based on variant
  const dimensions =
    variant === 'thumbnail'
      ? IMAGE_DIMENSIONS.THUMBNAIL
      : IMAGE_DIMENSIONS.COVER

  const imageUrl = getCloudinaryUrl(imageSource, dimensions)

  return (
    <div
      className={cn('relative overflow-hidden w-full', className)}
      {...props}
    >
      <NextImage
        src={imageUrl}
        alt={article.title}
        width={dimensions.w}
        height={dimensions.h}
        priority
        placeholder="blur"
        blurDataURL={getBlurDataURL(dimensions.w, dimensions.h)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
        className="w-full h-full object-cover rounded-none transition-opacity duration-300"
      />
    </div>
  )
}
