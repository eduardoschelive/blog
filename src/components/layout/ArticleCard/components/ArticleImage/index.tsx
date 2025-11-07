'use client'

import { useArticleCard } from '../ArticleRoot'
import type { ImageProps } from '@heroui/react'
import { cn, Image } from '@heroui/react'
import type { HTMLAttributes } from 'react'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  fallbackIcon?: string
  imageClassName?: string
  height?: string
  showPattern?: boolean
  imageProps?: Omit<ImageProps, 'src' | 'alt'>
}

interface FallbackImageProps {
  className: string
  height: string
  showPattern: boolean
  fallbackIcon: string
  categoryTitle: string
}

const FallbackImage = ({
  className,
  height,
  showPattern,
  fallbackIcon,
  categoryTitle,
}: FallbackImageProps) => (
  <div
    className={cn(
      height,
      'w-full bg-linear-to-br from-primary/30 via-secondary/20 to-primary/20 flex items-center justify-center relative overflow-hidden',
      className
    )}
  >
    {showPattern && (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    )}
    <div className="text-center relative z-10">
      <div className="text-6xl mb-3">{fallbackIcon}</div>
      <div className="text-sm text-foreground/60 uppercase tracking-wider font-bold">
        {categoryTitle}
      </div>
    </div>
  </div>
)

function ArticleImage({
  className,
  imageClassName,
  fallbackIcon = '📰',
  height = 'h-56',
  showPattern = true,
  imageProps,
  ...props
}: ArticleImageProps) {
  const { article } = useArticleCard()

  if (article.coverImage) {
    return (
      <Image
        src={article.coverImage}
        alt={article.title}
        className={cn('w-full object-cover', height, imageClassName)}
        classNames={{ wrapper: 'w-full' }}
        {...imageProps}
      />
    )
  }

  return (
    <FallbackImage
      className={className!}
      height={height}
      showPattern={showPattern}
      fallbackIcon={fallbackIcon}
      categoryTitle={article.category.title}
      {...props}
    />
  )
}

export { ArticleImage }
