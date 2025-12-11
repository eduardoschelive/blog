'use client'

import { useCategory } from '../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { TbBook } from 'react-icons/tb'
import NextImage from 'next/image'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'

interface CategoryImageProps {
  className?: string
  height?: string
  iconSize?: 'sm' | 'md' | 'lg'
}

export function CategoryImage({
  className,
  height,
  iconSize = 'md',
}: CategoryImageProps) {
  const { category } = useCategory()

  if (!category.coverImage) {
    return (
      <FallbackImage
        icon={<TbBook />}
        gradient="medium"
        iconSize={iconSize}
        className={cn(height, className)}
      />
    )
  }

  const imageUrl = getCloudinaryUrl(category.coverImage, {
    w: 1280,
    h: 720,
    c: 'fill',
  })

  return (
    <div className={cn('relative w-full overflow-hidden', height, className)}>
      <NextImage
        src={imageUrl}
        alt={category.title}
        width={1280}
        height={720}
        placeholder="blur"
        blurDataURL={getBlurDataURL(1280, 720)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
        className={cn(
          'object-cover w-full h-full rounded-none transition-all duration-500 ease-out',
          'group-hover:scale-105'
        )}
      />
    </div>
  )
}
