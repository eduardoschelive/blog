'use client'

import { useActiveHeading } from '@/hooks/useActiveHeading'
import { useHeadings } from '@/hooks/useHeadingTree'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@heroui/react'
import { useTranslations } from 'next-intl'
import type { HTMLAttributes } from 'react'
import { FadeIn } from '@/components/animated/FadeIn'
import { Stagger } from '@/components/animated/Stagger'
import { StaggerItem } from '@/components/animated/StaggerItem'

type ArticleTOCProps = HTMLAttributes<HTMLDivElement>

export function ArticleTOC({ className }: ArticleTOCProps) {
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
      <Stagger delay={0.05}>
        <ul className="space-y-1 mt-1">
          {node.childIds.map((childId) => {
            const child = headingTree.nodes[childId]
            const isActive = child.id === activeId
            return (
              <StaggerItem key={child.id} className={getIndentClass(depth + 1)}>
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
              </StaggerItem>
            )
          })}
        </ul>
      </Stagger>
    )
  }

  if (!headingTree || headingTree.rootIds.length === 0) return null

  return (
    <FadeIn
      direction="right"
      delay={0.3}
      className={cn(
        'sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto',
        'hidden lg:block',
        className
      )}
    >
      <h3 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
        {t('title')}
      </h3>

      <Stagger delay={0.1}>
        <nav className="space-y-2">
          {headingTree.rootIds.map((rootId) => {
            const isActive = rootId === activeId
            return (
              <StaggerItem key={rootId}>
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
              </StaggerItem>
            )
          })}
        </nav>
      </Stagger>
    </FadeIn>
  )
}
