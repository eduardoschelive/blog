'use client'

import { useCategory } from '../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { TbBook } from 'react-icons/tb'
import NextImage from 'next/image'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'
import { IMAGE_DIMENSIONS } from '@/constants/images'

interface CategoryImageProps {
  variant?: 'cover' | 'thumbnail'
  className?: string
  height?: string
  iconSize?: 'sm' | 'md' | 'lg'
}

export function CategoryImage({
  variant = 'cover',
  className,
  height,
  iconSize = 'md',
}: CategoryImageProps) {
  const { category } = useCategory()

  // Image selection logic with fallback chain
  const imageSource =
    variant === 'thumbnail'
      ? category.thumbnail || category.coverImage
      : category.coverImage

  if (!imageSource) {
    return (
      <FallbackImage
        icon={<TbBook />}
        gradient="medium"
        iconSize={iconSize}
        className={cn(height, className)}
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
    <div className={cn('relative w-full overflow-hidden', height, className)}>
      <NextImage
        src={imageUrl}
        alt={category.title}
        width={dimensions.w}
        height={dimensions.h}
        placeholder="blur"
        blurDataURL={getBlurDataURL(dimensions.w, dimensions.h)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
        className={cn(
          'object-contain w-full h-full rounded-none transition-all duration-500 ease-out',
          'group-hover:scale-105'
        )}
      />
    </div>
  )
}
