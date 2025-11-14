'use client'

import { cn } from '@heroui/react'
import type { ReactNode, HTMLAttributes } from 'react'

interface PageHeaderRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function PageHeaderRoot({
  children,
  className,
  ...props
}: PageHeaderRootProps) {
  return (
    <section
      className={cn(
        'w-full px-4 pt-4 pb-6 md:pt-6 md:pb-8 relative',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
