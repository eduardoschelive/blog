import type { MDXComponents } from 'mdx/types'
import { MDXCode } from './MDXCode'
import { MDXLink } from './MDXLink'

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
}
