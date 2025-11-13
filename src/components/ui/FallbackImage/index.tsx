'use client'

import { cn } from '@heroui/react'
import type { ReactNode } from 'react'

interface FallbackImageProps {
  icon?: ReactNode
  title?: string
  showPattern?: boolean
  gradient?: 'subtle' | 'medium' | 'strong'
  iconSize?: 'sm' | 'md' | 'lg'
  className?: string
}

export function FallbackImage({
  icon,
  title,
  showPattern = false,
  gradient = 'medium',
  iconSize = 'md',
  className,
}: FallbackImageProps) {
  const gradients = {
    subtle: 'from-primary/10 via-secondary/10 to-primary/10',
    medium: 'from-primary/30 via-secondary/20 to-primary/20',
    strong: 'from-primary/40 via-secondary/30 to-primary/30',
  }

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-9xl',
  }

  return (
    <div
      className={cn(
        'w-full bg-linear-to-br flex items-center justify-center relative overflow-hidden',
        gradients[gradient],
        className
      )}
    >
      {showPattern && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='1' opacity='.1'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="text-center relative z-10">
        <div className={cn(iconSizes[iconSize], 'mb-3 opacity-50')}>{icon}</div>
        {title && (
          <div className="text-sm text-foreground/60 uppercase tracking-wider font-bold">
            {title}
          </div>
        )}
      </div>
    </div>
  )
}
