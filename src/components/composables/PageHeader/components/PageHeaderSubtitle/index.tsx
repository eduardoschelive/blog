'use client'

import { cn } from '@heroui/react'
import type { ReactNode } from 'react'
import { FadeIn } from '@/components/animated/FadeIn'

interface PageHeaderSubtitleProps {
  children: ReactNode
  className?: string
}

export function PageHeaderSubtitle({
  children,
  className,
}: PageHeaderSubtitleProps) {
  return (
    <FadeIn direction="up" delay={0.8}>
      <p
        className={cn(
          'text-lg md:text-xl text-foreground/70 leading-relaxed mb-1',
          className
        )}
      >
        {children}
      </p>
    </FadeIn>
  )
}
