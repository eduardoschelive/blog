'use client'

import { useArticle } from '../../context'
import { cn, Image } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { getCDNImageUrl } from '@/utils/cdn'
import { IMAGE_DIMENSIONS } from '@/constants/images'
import type { HTMLAttributes } from 'react'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  fallbackIcon?: string
}

export function ArticleImage({
  className,
  fallbackIcon = '📰',
  ...props
}: ArticleImageProps) {
  const { article } = useArticle()

  if (article.coverImage) {
    const imageUrl = getCDNImageUrl(article.coverImage, IMAGE_DIMENSIONS.COVER)

    return (
      <div
        className={cn('relative overflow-hidden w-full', className)}
        {...props}
      >
        <Image
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover rounded-none"
          classNames={{
            wrapper: '!max-w-full h-full w-full rounded-none',
            img: 'h-full w-full object-cover rounded-none',
          }}
          fetchPriority="high"
          removeWrapper
        />
      </div>
    )
  }

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
