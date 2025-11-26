'use client'

import { cn } from '@heroui/react'
import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import { createElement } from 'react'

interface PageHeaderTitleProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  children: string
  as?: ElementType
}

export function PageHeaderTitle({
  icon,
  children,
  className,
  as = 'h1',
  ...props
}: PageHeaderTitleProps) {
  const Heading = as

  return (
    <div className={cn('flex items-center gap-4 mb-6', className)} {...props}>
      {icon && <div>{icon}</div>}

      {createElement(
        Heading,
        { className: 'text-4xl md:text-5xl lg:text-6xl font-bold' },
        children
      )}
    </div>
  )
}
