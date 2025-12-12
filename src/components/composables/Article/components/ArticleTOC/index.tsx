'use client'

import { useActiveHeading } from '@/hooks/useActiveHeading'
import { useHeadings } from '@/hooks/useHeadingTree'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import type { HTMLAttributes, RefObject } from 'react'

interface ArticleTOCProps extends HTMLAttributes<HTMLDivElement> {
  containerRef?: RefObject<HTMLElement | null>
}

export function ArticleTOC({ className, containerRef }: ArticleTOCProps) {
  const t = useTranslations('TableOfContents')
  const { headingTree } = useHeadings(containerRef)
  const { scrollToHeading } = useScroll()

  const headingIds = headingTree ? Object.keys(headingTree.nodes) : []
  const activeId = useActiveHeading(headingIds)

  const handleHeadingClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
      event.preventDefault()

      // Scroll to the heading
      scrollToHeading(headingId)

      // Set focus on the heading for accessibility
      const target = document.getElementById(headingId)
      if (target) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    },
    [scrollToHeading]
  )

  const getIndentClass = (level: number) => {
    const indents: Record<number, string> = {
      1: 'pl-0',
      2: 'pl-4',
      3: 'pl-8',
      4: 'pl-12',
    }
    return indents[level] || 'pl-0'
  }

  const renderHeadings = (id?: string, depth = 1) => {
    if (!headingTree || !id) return null
    const node = headingTree.nodes[id]
    if (!node || node.childIds.length === 0) return null

    return (
      <ul className="space-y-1 mt-1">
        {node.childIds.map((childId) => {
          const child = headingTree.nodes[childId]
          const isActive = child.id === activeId
          return (
            <li key={child.id} className={getIndentClass(depth + 1)}>
              <a
                href={`#${child.id}`}
                onClick={(event) => handleHeadingClick(event, child.id)}
                className={cn(
                  'block py-1 text-sm transition-all duration-200 border-l-2 pl-3',
                  isActive
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-foreground/60 hover:text-foreground hover:border-foreground/20'
                )}
              >
                {child.text}
              </a>
              {renderHeadings(child.id, depth + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  if (!headingTree || headingTree.rootIds.length === 0) return null

  return (
    <div
      className={cn(
        'sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto',
        'hidden lg:block',
        className
      )}
    >
      <h3 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
        {t('title')}
      </h3>

      <nav className="space-y-2">
        {headingTree.rootIds.map((rootId) => {
          const isActive = rootId === activeId
          return (
            <div key={rootId}>
              <a
                href={`#${rootId}`}
                onClick={(event) => handleHeadingClick(event, rootId)}
                className={cn(
                  'block py-1.5 text-sm font-medium transition-all duration-200 border-l-2 pl-3',
                  isActive
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-foreground/70 hover:text-foreground hover:border-foreground/20'
                )}
              >
                {headingTree.nodes[rootId].text}
              </a>
              {renderHeadings(rootId, 1)}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
