import { cn } from '@heroui/react'
import type { ReactNode } from 'react'

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <div
      className={cn(
        'group transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  )
}
