'use client'

import { useActiveHeading } from '@/hooks/useActiveHeading'
import { useHeadings } from '@/hooks/useHeadingTree'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@heroui/react'
import { useTranslations } from 'next-intl'
import type { HTMLAttributes } from 'react'

type TableOfContentsProps = HTMLAttributes<HTMLDivElement>

export const TableOfContents = ({ className }: TableOfContentsProps) => {
  const t = useTranslations('TableOfContents')
  const { headingTree } = useHeadings()
  const { scrollToHeading } = useScroll()

  const headingIds = headingTree ? Object.keys(headingTree.nodes) : []
  const activeId = useActiveHeading(headingIds)

  const handleHeadingClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    headingId: string
  ) => {
    event.preventDefault()
    scrollToHeading(headingId)
  }

  const renderHeadings = (id?: string, depth = 1) => {
    if (!headingTree || !id) return null
    const node = headingTree.nodes[id]
    if (!node || node.childIds.length === 0) return null

    return (
      <ol>
        {node.childIds.map((childId) => {
          const child = headingTree.nodes[childId]
          const isActive = child.id === activeId
          return (
            <li key={child.id} style={{ paddingLeft: 10 }}>
              <a
                href={`#${child.id}`}
                onClick={(event) => handleHeadingClick(event, child.id)}
                className={cn(isActive ? 'text-primary font-bold' : '')}
              >
                {child.text}
              </a>
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
        'sticky top-20 max-h-[80vh] overflow-y-auto col-span-1 hidden md:block',
        className
      )}
    >
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        {t('title')}
      </h3>
      {headingTree.rootIds.map((rootId) => {
        const isActive = rootId === activeId
        return (
          <div key={rootId} style={{ marginLeft: 0 }}>
            <a
              href={`#${rootId}`}
              onClick={(event) => handleHeadingClick(event, rootId)}
              className={cn(isActive ? 'text-primary font-bold' : '')}
            >
              {headingTree.nodes[rootId].text}
            </a>
            {renderHeadings(rootId, 1)}
          </div>
        )
      })}
    </div>
  )
}
