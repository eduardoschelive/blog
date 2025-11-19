import { highlightCode } from '@/shiki/highlighter'
import type { BundledLanguage } from 'shiki/langs'
import type { BundledTheme } from 'shiki/themes'
import type { ComponentPropsWithoutRef } from 'react'
import { CodeActions } from './CodeActions'
import './styles.css'

interface CodeProps extends ComponentPropsWithoutRef<'code'> {
  children: string
  lang?: string
  theme?: string
}

async function MDXCode({ children, lang, theme, ...props }: CodeProps) {
  const code = await highlightCode(
    String(children),
    (lang || 'typescript') as BundledLanguage,
    (theme || 'tokyo-night') as BundledTheme
  )

  return (
    <div className="bg-[#1a1b26] rounded-lg shadow-lg overflow-hidden not-prose my-6">
      <div className="flex items-center justify-between px-4 py-3 bg-[#24283b]">
        <span className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
        </span>
        <CodeActions code={String(children)} lang={lang} />
      </div>
      <div className="p-4">
        <code {...props} dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  )
}

export { MDXCode }
