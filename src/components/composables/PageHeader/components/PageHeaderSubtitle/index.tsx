'use client'

import { m } from 'framer-motion'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'

interface PageHeaderSubtitleProps {
  children: ReactNode
  className?: string
}

export function PageHeaderSubtitle({
  children,
  className,
}: PageHeaderSubtitleProps) {
  return (
    <m.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        'text-lg md:text-xl text-foreground/70 leading-relaxed mb-1',
        className
      )}
    >
      {children}
    </m.p>
  )
}
