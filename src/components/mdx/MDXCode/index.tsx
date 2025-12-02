import { highlightCode } from '@/shiki/highlighter'
import type { BundledLanguage } from 'shiki/langs'
import type { ComponentPropsWithoutRef } from 'react'
import { MDXCodeClient } from './MDXCodeClient'
import './styles.css'

interface CodeProps extends ComponentPropsWithoutRef<'code'> {
  children: string
  lang?: string
}

async function MDXCode({ children, lang, ...props }: CodeProps) {
  const rawCode = String(children).trim()
  const languageToUse = (lang || 'typescript') as BundledLanguage

  const [darkCode, lightCode] = await Promise.all([
    highlightCode(rawCode, languageToUse, 'tokyo-night'),
    highlightCode(rawCode, languageToUse, 'tokyo-night-light'),
  ])

  return (
    <MDXCodeClient
      darkCode={darkCode}
      lightCode={lightCode}
      rawCode={rawCode}
      lang={lang}
      {...props}
    />
  )
}

export { MDXCode }
