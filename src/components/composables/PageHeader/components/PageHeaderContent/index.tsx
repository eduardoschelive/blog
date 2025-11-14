'use client'

import type { ReactNode, HTMLAttributes } from 'react'

interface PageHeaderContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function PageHeaderContent({
  children,
  className,
  ...props
}: PageHeaderContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
