import { Link } from '@/i18n/navigation'
import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { Code } from './Code'

export const components: MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold my-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold my-4" {...props} />,
  p: (props) => <p className="my-4" {...props} />,
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const className = 'text-primary hover:underline'

    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props} className={className}>
          {children}
        </Link>
      )
    }

    if (href?.startsWith('#')) {
      return (
        <Link href={href} {...props} className={className} scroll={true}>
          {children}
        </Link>
      )
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  },
  code: (props) => <Code {...props} />,
  Code: Code,
}
