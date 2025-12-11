'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { getCDNImageUrl } from '@/utils/cdn'
import type { HTMLAttributes } from 'react'
import NextImage from 'next/image'

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
    // Generate responsive image URLs for different viewport sizes
    const imageSizes = {
      mobile: getCDNImageUrl(article.coverImage, {
        w: 640,
        h: 360,
        c: 'fill',
        f: 'auto',
        q: 'auto',
      }),
      tablet: getCDNImageUrl(article.coverImage, {
        w: 1024,
        h: 576,
        c: 'fill',
        f: 'auto',
        q: 'auto',
      }),
      desktop: getCDNImageUrl(article.coverImage, {
        w: 1280,
        h: 720,
        c: 'fill',
        f: 'auto',
        q: 'auto',
      }),
    }

    return (
      <div
        className={cn('relative overflow-hidden w-full', className)}
        {...props}
      >
        <NextImage
          src={imageSizes.desktop}
          alt={article.title}
          width={1280}
          height={720}
          priority
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          srcSet={`${imageSizes.mobile} 640w, ${imageSizes.tablet} 1024w, ${imageSizes.desktop} 1280w`}
          className="w-full h-full object-cover rounded-none"
          style={{ objectFit: 'cover' }}
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
