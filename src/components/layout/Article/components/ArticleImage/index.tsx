'use client'

import { useArticle } from '../../context'
import { cn, Image } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import type { HTMLAttributes } from 'react'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  fallbackIcon?: string
  showPattern?: boolean
}

export function ArticleImage({
  className,
  fallbackIcon = '📰',
  showPattern = true,
  ...props
}: ArticleImageProps) {
  const { article } = useArticle()

  if (article.coverImage) {
    return (
      <div
        className={cn('relative overflow-hidden w-full', className)}
        {...props}
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover rounded-none"
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
      icon={fallbackIcon}
      title={article.category.title}
      showPattern={showPattern}
      gradient="medium"
      iconSize="md"
      className={className}
    />
  )
}
