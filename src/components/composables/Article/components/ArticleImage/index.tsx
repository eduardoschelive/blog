'use client'

import { useArticle } from '../../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import type { HTMLAttributes } from 'react'
import NextImage from 'next/image'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'
import { getImageSource, getDimensions, type ImageVariant } from '@/utils/image'

interface ArticleImageProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ImageVariant
  fallbackIcon?: string
  responsive?: {
    mobile: ImageVariant
    desktop: ImageVariant
  }
}

export function ArticleImage({
  variant = 'cover',
  className,
  fallbackIcon = '📰',
  responsive,
  ...props
}: ArticleImageProps) {
  const { article } = useArticle()

  if (responsive) {
    const mobileImageSource = getImageSource(article, responsive.mobile)
    const desktopImageSource = getImageSource(article, responsive.desktop)

    if (!mobileImageSource && !desktopImageSource) {
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

    const mobileDimensions = getDimensions(responsive.mobile)
    const desktopDimensions = getDimensions(responsive.desktop)

    const mobileImageUrl = getCloudinaryUrl(
      mobileImageSource!,
      mobileDimensions
    )
    const desktopImageUrl = getCloudinaryUrl(
      desktopImageSource!,
      desktopDimensions
    )

    return (
      <div
        className={cn('relative overflow-hidden w-full', className)}
        {...props}
      >
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={desktopImageUrl}
            width={desktopDimensions.w}
            height={desktopDimensions.h}
          />
          <img
            src={mobileImageUrl}
            alt={article.title}
            width={mobileDimensions.w}
            height={mobileDimensions.h}
            loading="eager"
            className="w-full h-full object-cover rounded-none transition-opacity duration-300"
          />
        </picture>
      </div>
    )
  }

  const imageSource = getImageSource(article, variant)

  if (!imageSource) {
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

  const dimensions = getDimensions(variant)
  const imageUrl = getCloudinaryUrl(imageSource, dimensions)

  return (
    <div
      className={cn('relative overflow-hidden w-full', className)}
      {...props}
    >
      <NextImage
        src={imageUrl}
        alt={article.title}
        width={dimensions.w}
        height={dimensions.h}
        priority
        placeholder="blur"
        blurDataURL={getBlurDataURL(dimensions.w, dimensions.h)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
        className="w-full h-full object-cover rounded-none transition-opacity duration-300"
      />
    </div>
  )
}
