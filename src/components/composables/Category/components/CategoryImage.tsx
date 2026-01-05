'use client'

import { useCategory } from '../context'
import { cn } from '@heroui/react'
import { FallbackImage } from '@/components/ui/FallbackImage'
import { TbBook } from 'react-icons/tb'
import NextImage from 'next/image'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'
import { getImageSource, getDimensions, type ImageVariant } from '@/utils/image'

interface CategoryImageProps {
  variant?: ImageVariant
  className?: string
  height?: string
  iconSize?: 'sm' | 'md' | 'lg'
  responsive?: {
    mobile: ImageVariant
    desktop: ImageVariant
  }
}

export function CategoryImage({
  variant = 'cover',
  className,
  height,
  iconSize = 'md',
  responsive,
}: CategoryImageProps) {
  const { category } = useCategory()

  if (responsive) {
    const mobileImageSource = getImageSource(category, responsive.mobile)
    const desktopImageSource = getImageSource(category, responsive.desktop)

    if (!mobileImageSource && !desktopImageSource) {
      return (
        <FallbackImage
          icon={<TbBook />}
          gradient="medium"
          iconSize={iconSize}
          className={cn(height, className)}
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
      <>
        {/* Mobile version */}
        <div
          className={cn(
            'relative w-full overflow-hidden lg:hidden',
            height,
            className
          )}
        >
          <NextImage
            src={mobileImageUrl}
            alt={category.title}
            width={mobileDimensions.w}
            height={mobileDimensions.h}
            placeholder="blur"
            blurDataURL={getBlurDataURL(mobileDimensions.w, mobileDimensions.h)}
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-contain w-full h-full rounded-none transition-all duration-500 ease-out group-hover:scale-105"
          />
        </div>
        {/* Desktop version */}
        <div
          className={cn(
            'relative w-full overflow-hidden hidden lg:block',
            height,
            className
          )}
        >
          <NextImage
            src={desktopImageUrl}
            alt={category.title}
            width={desktopDimensions.w}
            height={desktopDimensions.h}
            placeholder="blur"
            blurDataURL={getBlurDataURL(
              desktopDimensions.w,
              desktopDimensions.h
            )}
            sizes="(min-width: 1024px) 300px, 0px"
            className="object-contain w-full h-full rounded-none transition-all duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </>
    )
  }

  const imageSource = getImageSource(category, variant)

  if (!imageSource) {
    return (
      <FallbackImage
        icon={<TbBook />}
        gradient="medium"
        iconSize={iconSize}
        className={cn(height, className)}
      />
    )
  }

  const dimensions = getDimensions(variant)
  const imageUrl = getCloudinaryUrl(imageSource, dimensions)

  return (
    <div className={cn('relative w-full overflow-hidden', height, className)}>
      <NextImage
        src={imageUrl}
        alt={category.title}
        width={dimensions.w}
        height={dimensions.h}
        placeholder="blur"
        blurDataURL={getBlurDataURL(dimensions.w, dimensions.h)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
        className="object-contain w-full h-full rounded-none transition-all duration-500 ease-out group-hover:scale-105"
      />
    </div>
  )
}
