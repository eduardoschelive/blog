'use client'

import { BlurText } from '@/components/animated/BlurText'
import { cn } from '@heroui/react'
import type { ReactNode, HTMLAttributes } from 'react'
import { RotateIn } from '@/components/animated/RotateIn'

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
      {icon && <RotateIn>{icon}</RotateIn>}

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
