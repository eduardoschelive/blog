import { highlighter } from '@/shiki/highlighter'
import type { ComponentPropsWithoutRef } from 'react'
import './styles.css'

interface CodeProps extends ComponentPropsWithoutRef<'code'> {
  children: string
  lang: string
  theme: string
}

async function Code({ children, lang, theme, ...props }: CodeProps) {
  const code = highlighter.codeToHtml(String(children), {
    lang: lang || 'ts',
    theme: theme || 'tokyo-night',
  })

  return (
    <div className="bg-[#1a1b26] rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center px-4 py-3 bg-[#24283b]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-4">
        <span {...props} dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  )
}

export { Code }
