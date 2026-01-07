import type { ReactNode } from 'react'

interface MDXDefinitionProps {
  term: string
  children: ReactNode
  id?: string
}

export function MDXDefinition({ term, children, id }: MDXDefinitionProps) {
  return (
    <div id={id} className="my-4">
      <h3 className="text-2xl font-bold flex items-start gap-3">
        <span className="text-primary mt-1">•</span>
        <div>
          <span className="text-primary">{term}:</span>{' '}
          <span className="font-normal text-foreground/90 text-lg">
            {children}
          </span>
        </div>
      </h3>
    </div>
  )
}
