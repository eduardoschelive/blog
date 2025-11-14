'use client'

import { useCategory } from '../context'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'

interface CategoryLinkProps {
  className?: string
  children: ReactNode
}

export function CategoryLink({ className, children }: CategoryLinkProps) {
  const { category } = useCategory()
  const categoryUrl = `/categories/${category.slug}`

  return (
    <div className={cn('mt-auto', className)}>
      <AnimatedLink
        href={categoryUrl}
        className="text-base text-primary font-medium"
      >
        {children}
      </AnimatedLink>
    </div>
  )
}
