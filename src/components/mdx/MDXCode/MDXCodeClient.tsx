'use client'

import { useTheme } from 'next-themes'
import { CodeActions } from './CodeActions'
import type { ComponentPropsWithoutRef } from 'react'

interface MDXCodeClientProps extends ComponentPropsWithoutRef<'code'> {
  darkCode: string
  lightCode: string
  rawCode: string
  lang?: string
}

export function MDXCodeClient({
  darkCode,
  lightCode,
  rawCode,
  lang,
  ...props
}: MDXCodeClientProps) {
  const { theme } = useTheme()
  const code = theme === 'light' ? lightCode : darkCode

  return (
    <div className="bg-content1 rounded-lg shadow-lg overflow-hidden not-prose my-6 code-block border border-divider">
      <div className="flex items-center justify-between px-4 py-3 bg-content2">
        <span className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-danger block shrink-0"></span>
          <span className="w-3 h-3 rounded-full bg-warning block shrink-0"></span>
          <span className="w-3 h-3 rounded-full bg-success block shrink-0"></span>
        </span>
        <CodeActions code={rawCode} lang={lang} />
      </div>
      <div className="p-4">
        <code {...props} dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  )
}
