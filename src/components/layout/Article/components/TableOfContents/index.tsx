'use client'

import { useHeadings } from '@/app/hooks/useHeadingTree'
import { Link } from '@/i18n/navigation'
import { cn } from '@heroui/react'
import type { HTMLAttributes, ReactNode } from 'react'

interface TableOfContentsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const TableOfContents = ({ className }: TableOfContentsProps) => {
  const { headingTree } = useHeadings()

  const renderHeadings = (id?: string, depth = 1) => {
    if (!headingTree || !id) return null
    const node = headingTree.nodes[id]
    if (!node || node.childIds.length === 0) return null

    return (
      <ol>
        {node.childIds.map((childId) => {
          const child = headingTree.nodes[childId]
          return (
            <li key={child.id} style={{ paddingLeft: 10 }}>
              <Link href={`#${child.id}`} scroll>
                {child.text}
              </Link>
              {renderHeadings(child.id, depth + 1)}
            </li>
          )
        })}
      </ol>
    )
  }

  if (!headingTree || headingTree.rootIds.length === 0) return null

  return (
    <div
      className={cn(
        'sticky top-20 max-h-[80vh] overflow-y-aut col-span-1 hidden md:block',
        className
      )}
    >
      {headingTree.rootIds.map((rootId) => (
        <div key={rootId} style={{ marginLeft: 0 }}>
          <Link href={`#${rootId}`} scroll>
            {headingTree.nodes[rootId].text}
          </Link>
          {renderHeadings(rootId, 1)}
        </div>
      ))}
    </div>
  )
}
