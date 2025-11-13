'use client'

import { useCategory } from '../context'
import { cn } from '@heroui/react'

interface CategoryContentProps {
  className?: string
}

export function CategoryContent({ className }: CategoryContentProps) {
  const { category } = useCategory()
  return (
    <article
      className={cn('prose prose-lg dark:prose-invert max-w-none', className)}
    >
      {category.content}
    </article>
  )
}
