'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import type { HTMLAttributes } from 'react'
import NextImage from 'next/image'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  fallbackIcon?: string
}

export function ArticleImage({
  className,
  fallbackIcon = '📰',
  ...props
}: ArticleImageProps) {
  const { article } = useArticle()

  if (!article.coverImage) {
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

  const imageUrl = getCloudinaryUrl(article.coverImage, {
    w: 1280,
    h: 720,
    c: 'fill',
  })

  return (
    <div
      className={cn('relative overflow-hidden w-full', className)}
      {...props}
    >
      <NextImage
        src={imageUrl}
        alt={article.title}
        width={1280}
        height={720}
        priority
        placeholder="blur"
        blurDataURL={getBlurDataURL(1280, 720)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
        className="w-full h-full object-cover rounded-none transition-opacity duration-300"
      />
    </div>
  )
}
