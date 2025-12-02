import type { MDXComponents } from 'mdx/types'
import { MDXCode } from './MDXCode'
import { MDXLink } from './MDXLink'
import { MDXCallout } from './MDXCallout'
import { MDXTerminal } from './MDXTerminal'
import { MDXBlockquote } from './MDXBlockquote'
import { MDXTable, MDXThead, MDXTbody, MDXTr, MDXTh, MDXTd } from './MDXTable'
import { ImageCDN } from '@/components/ui/ImageCDN'

export const components: MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold my-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold my-4" {...props} />,
  p: (props) => <p className="my-4" {...props} />,
  a: (props) => <MDXLink {...props} />,
  pre: ({ children }) => <>{children}</>,
  code: (props) => {
    if (props.className?.includes('language-')) {
      const lang = props.className.replace('language-', '')
      return <MDXCode {...props} lang={lang} />
    }
    return (
      <code className="bg-content2 px-1.5 py-0.5 rounded text-sm" {...props} />
    )
  },
  img: (props) => (
    <ImageCDN
      filename={props.src?.replace(/^\/images\//, '') || ''}
      alt={props.alt || ''}
      transformations={{ f: 'auto', q: 'auto', dpr: 'auto' }}
      className="rounded-lg my-4"
      width={800}
      height={600}
    />
  ),
  blockquote: MDXBlockquote,
  ul: (props) => (
    <ul
      className="list-disc list-outside ml-6 my-4 space-y-2 marker:text-primary"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-outside ml-6 my-4 space-y-2 marker:text-primary"
      {...props}
    />
  ),
  li: (props) => <li className="text-foreground/90 pl-2" {...props} />,
  table: MDXTable,
  thead: MDXThead,
  tbody: MDXTbody,
  tr: MDXTr,
  th: MDXTh,
  td: MDXTd,
  Callout: MDXCallout,
  Terminal: MDXTerminal,
}
