'use client'

import { useCategory } from '../context'
import { cn, Image } from '@heroui/react'
import { HiBookOpen } from 'react-icons/hi2'

interface CategoryImageProps {
  className?: string
  height?: string
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  enableHover?: boolean
}

const iconSizes = {
  sm: 'text-5xl',
  md: 'text-7xl',
  lg: 'text-8xl',
  xl: 'text-9xl',
}

export function CategoryImage({
  className,
  height,
  iconSize = 'md',
  enableHover = false,
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
    <div
      className={cn(
        'relative w-full bg-linear-to-br from-primary/30 via-secondary/20 to-primary/20 flex items-center justify-center',
        enableHover &&
          'group-hover:from-primary/40 group-hover:via-secondary/30 group-hover:to-primary/30 transition-all duration-300',
        height,
        className
      )}
    >
      <HiBookOpen
        className={cn(
          iconSizes[iconSize],
          'opacity-50',
          enableHover &&
            'group-hover:opacity-70 transition-opacity duration-300'
        )}
      />
    </div>
  )
}
