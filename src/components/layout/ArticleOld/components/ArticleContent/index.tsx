import type { HTMLAttributes, ReactNode } from 'react'

export interface ArticleContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ArticleContent({ children }: ArticleContentProps) {
  return <div className="col-span-2">{children}</div>
}

export { ArticleContent }
