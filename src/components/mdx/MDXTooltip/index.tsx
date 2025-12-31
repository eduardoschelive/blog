'use client'

import { useState } from 'react'
import { Tooltip } from '@heroui/react'
import type { ReactNode } from 'react'
import { TbInfoCircle } from 'react-icons/tb'

interface MDXTooltipProps {
  children: ReactNode
  content: string
  title?: string
}

export function MDXTooltip({ children, content, title }: MDXTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen((prev) => !prev)
  }

  return (
    <Tooltip
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div className="flex gap-2">
          <TbInfoCircle className="text-secondary shrink-0 mt-0.5" size={16} />
          <div className="flex flex-col gap-1.5">
            {title && (
              <div className="font-semibold text-secondary text-sm">
                {title}
              </div>
            )}
            <div className="text-foreground/90 leading-relaxed text-sm text-justify">
              {content}
            </div>
          </div>
        </div>
      }
      delay={300}
      closeDelay={100}
      className="max-w-xs"
      classNames={{
        content:
          'bg-content2/95 backdrop-blur-sm border border-secondary/30 shadow-xl px-4 py-3 text-sm rounded-lg',
      }}
    >
      <span
        onClick={handleClick}
        className="text-secondary underline decoration-2 decoration-secondary/40 underline-offset-2 cursor-pointer hover:decoration-secondary transition-colors font-medium tap-highlight-transparent"
      >
        {children}
      </span>
    </Tooltip>
  )
}
