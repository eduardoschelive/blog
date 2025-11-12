'use client'

import { useCategoryCard } from './CategoryCardRoot'
import { cn, Image } from '@heroui/react'
import { HiBookOpen } from 'react-icons/hi2'
import type { HTMLAttributes } from 'react'

interface CategoryCardCoverProps extends HTMLAttributes<HTMLDivElement> {
  height?: string
}

export function CategoryCardCover({
  className,
  height = 'h-64 lg:h-full',
}: CategoryCardCoverProps) {
  const { category } = useCategoryCard()
  const baseClasses = cn('relative w-full', height)

  if (category.coverImage) {
    return (
      <div className={cn(baseClasses, 'overflow-hidden', className)}>
        <Image
          src={category.coverImage}
          alt={category.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          classNames={{
            wrapper: '!max-w-full h-full w-full',
            img: 'h-full w-full object-cover',
          }}
          removeWrapper
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClasses,
        'bg-linear-to-br from-primary/30 via-secondary/20 to-primary/20',
        'flex items-center justify-center',
        'group-hover:from-primary/40 group-hover:via-secondary/30 group-hover:to-primary/30',
        'transition-all duration-300',
        className
      )}
    >
      <HiBookOpen className="text-7xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
    </div>
  )
}
