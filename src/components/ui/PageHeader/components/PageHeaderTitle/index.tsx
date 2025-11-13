'use client'

import { BlurText } from '@/components/ui/BlurText'
import { m } from 'framer-motion'
import { cn } from '@heroui/react'
import type { ReactNode, HTMLAttributes } from 'react'

interface PageHeaderTitleProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  children: string
}

export function PageHeaderTitle({
  icon,
  children,
  className,
  ...props
}: PageHeaderTitleProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-6', className)} {...props}>
      {icon && (
        <m.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {icon}
        </m.div>
      )}

      <BlurText
        text={children}
        className="text-4xl md:text-5xl lg:text-6xl font-bold"
        direction="bottom"
        delay={50}
        animateBy="words"
      />
    </div>
  )
}
