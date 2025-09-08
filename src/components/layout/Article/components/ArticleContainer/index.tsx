import { cn } from '@heroui/react'
import type { HTMLAttributes, ReactNode } from 'react'

interface ArticleContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode[]
}

function ArticleContainer({
  children,
  className,
  ...props
}: ArticleContainerProps) {
  return (
    <div
      className={cn(
        'grid gap-8 grid-cols-1 md:grid-cols-3 grid-flow-row-dense w-4/5 mx-auto my-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { ArticleContainer }
