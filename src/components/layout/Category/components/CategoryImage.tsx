'use client'

import { useCategory } from '../context'
import { cn, Image } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { HiBookOpen } from 'react-icons/hi2'

interface CategoryImageProps {
  className?: string
  height?: string
  iconSize?: 'sm' | 'md' | 'lg'
  enableHover?: boolean
  showPattern?: boolean
}

export function CategoryImage({
  className,
  height,
  iconSize = 'md',
  enableHover = false,
  showPattern = true,
}: CategoryImageProps) {
  const { category } = useCategory()

  if (category.coverImage) {
    return (
      <div className={cn('relative w-full overflow-hidden', height, className)}>
        <Image
          src={category.coverImage}
          alt={category.title}
          className={cn(
            'object-cover w-full h-full rounded-none',
            enableHover &&
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
      icon={<HiBookOpen />}
      showPattern={showPattern}
      gradient="medium"
      iconSize={iconSize}
      className={cn(height, className)}
    />
  )
}
