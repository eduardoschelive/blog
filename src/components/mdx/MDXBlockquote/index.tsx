import { TbQuote } from 'react-icons/tb'
import type { ComponentPropsWithoutRef } from 'react'

type MDXBlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

function MDXBlockquote({ children, ...props }: MDXBlockquoteProps) {
  return (
    <blockquote
      className="my-6 border-l-4 border-l-secondary bg-secondary/5 rounded-r-lg pl-6 pr-4 py-4 relative"
      {...props}
    >
      <TbQuote
        className="absolute -left-3 top-4 text-secondary bg-background rounded-full p-1 shrink-0"
        size={24}
      />
      <div className="text-foreground/90 [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>code]:text-xs">
        {children}
      </div>
    </blockquote>
  )
}

export { MDXBlockquote }
