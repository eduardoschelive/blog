'use client'

import { useArticle } from '../../context'
import { cn, Image } from '@heroui/react'
import type { HTMLAttributes } from 'react'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  fallbackIcon?: string
  showPattern?: boolean
}

interface FallbackImageProps {
  className?: string
  showPattern: boolean
  fallbackIcon: string
  categoryTitle: string
}

const FallbackImage = ({
  className,
  showPattern,
  fallbackIcon,
  categoryTitle,
}: FallbackImageProps) => (
  <div
    className={cn(
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
      className={className}
      showPattern={showPattern}
      fallbackIcon={fallbackIcon}
      categoryTitle={article.category.title}
    />
  )
}
