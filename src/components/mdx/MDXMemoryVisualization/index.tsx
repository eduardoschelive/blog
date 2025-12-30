'use client'

import type { ReactNode } from 'react'

interface MemoryBlockProps {
  address: string
  value: string | number
  label?: string
  type?: 'contiguous' | 'linked'
  nextAddress?: string
}

interface MemoryVisualizationProps {
  title: string
  type: 'contiguous' | 'linked'
  blocks: MemoryBlockProps[]
  summary?: ReactNode
  children?: ReactNode
}

function MemoryBlock({
  address,
  value,
  label,
  type = 'contiguous',
  nextAddress,
}: MemoryBlockProps) {
  return (
    <div className="bg-content2 border-2 border-primary rounded-lg p-4 min-w-[140px] sm:min-w-[200px] text-center">
      <div className="text-secondary font-mono text-xs mb-2 flex items-center justify-center gap-1">
        {type === 'linked' && <span>📍</span>}
        <span>{address}</span>
      </div>
      <div className="text-success text-xl sm:text-2xl font-bold mb-1">
        {typeof value === 'string' && value.includes(':') ? value : value}
      </div>
      {label && <div className="text-primary text-xs mt-1">{label}</div>}
      {nextAddress && (
        <div className="text-primary text-xs font-mono mt-2">
          próximo → {nextAddress}
        </div>
      )}
    </div>
  )
}

export function MDXMemoryVisualization({
  title,
  type,
  blocks,
  summary,
  children,
}: MemoryVisualizationProps) {
  return (
    <div className="my-8 flex justify-center w-full">
      <div className="bg-linear-to-br from-content1 to-content2 border border-divider rounded-xl p-6 w-full">
        <div className="text-primary font-mono text-sm font-semibold mb-4">
          {title}
        </div>

        <div
          className={
            type === 'contiguous'
              ? 'flex gap-2 sm:gap-3 mb-5 flex-wrap justify-center'
              : 'flex flex-col gap-5 mb-5'
          }
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {blocks.map((block, index) => (
              <div key={`block-${index}`} className="flex items-center gap-3">
                <MemoryBlock {...block} type={type} />
                {type === 'linked' && index < blocks.length - 1 && (
                  <div className="text-danger text-3xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {(summary || children) && (
          <div className="font-mono text-foreground text-center text-sm border-t border-divider pt-4 mt-4">
            {summary || children}
          </div>
        )}
      </div>
    </div>
  )
}
