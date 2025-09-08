import type { ReactNode } from 'react'

interface ArticleLayoutProps {
  content: ReactNode
  toc: ReactNode
}

export function ArticleLayout({ content, toc }: ArticleLayoutProps) {
  return (
    <div className="grid gap-8 rtl grid-cols-1 md:grid-cols-3 w-4/5 mx-auto my-8 ">
      <div className="md:col-span-2 ltr">{content}</div>
      <div className="md:col-span-1 ltr">{toc}</div>
    </div>
  )
}
