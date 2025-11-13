'use client'

import { useArticle } from '../../context'
import { Link } from '@/i18n/navigation'
import type { ChipProps } from '@heroui/react'
import { cn, Chip } from '@heroui/react'
import type { HTMLAttributes, ReactNode } from 'react'

interface ArticleCategoryProps extends HTMLAttributes<HTMLDivElement> {
  asChip?: boolean
  asLink?: boolean
  children?: ReactNode
  chipProps?: Omit<ChipProps, 'children'>
}

function ArticleCategory({
  className,
  asChip = false,
  asLink = false,
  children,
  chipProps,
  ...props
}: ArticleCategoryProps) {
  const { article } = useArticle()
  const content = children ?? article.category.title

  if (!asChip) {
    return (
      <div
        className={cn('text-sm font-medium text-primary', className)}
        {...props}
      >
        {content}
      </div>
    )
  }

  const chipClassName = cn(
    'cursor-pointer hover:scale-105 transition-transform font-sans',
    className
  )

  const defaultChipProps: Partial<ChipProps> = {
    color: 'primary',
    variant: 'flat',
    size: 'md',
  }

  const mergedChipProps = { ...defaultChipProps, ...chipProps }

  if (asLink) {
    return (
      <Chip
        as={Link}
        href={`/categories/${article.category.slug}`}
        {...mergedChipProps}
        className={chipClassName}
      >
        {content}
      </Chip>
    )
  }

  return (
    <Chip {...mergedChipProps} className={chipClassName}>
      {content}
    </Chip>
  )
}

export { ArticleCategory }
