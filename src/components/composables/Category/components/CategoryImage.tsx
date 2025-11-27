'use client'

import { useCategory } from '../context'
import { cn, Image } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { TbBook } from 'react-icons/tb'
import { getCDNImageUrl } from '@/utils/cdn'
import { IMAGE_DIMENSIONS } from '@/constants/images'

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

  if (category.coverImage) {
    const imageUrl = getCDNImageUrl(category.coverImage, IMAGE_DIMENSIONS.COVER)

    return (
      <div className={cn('relative w-full overflow-hidden', height, className)}>
        <Image
          src={imageUrl}
          alt={category.title}
          className={cn(
            'object-cover w-full h-full rounded-none',
            'group-hover:scale-105 transition-transform duration-500 ease-out'
          )}
          classNames={{
            wrapper: '!max-w-full h-full w-full rounded-none',
            img: 'h-full w-full object-cover rounded-none',
          }}
          removeWrapper
        />
      </div>
    )
  }

  return (
    <FallbackImage
      icon={<TbBook />}
      gradient="medium"
      iconSize={iconSize}
      className={cn(height, className)}
    />
  )
}
