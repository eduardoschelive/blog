'use client'

import { BlurText } from '@/components/animated/BlurText'
import { cn } from '@heroui/react'
import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import { RotateIn } from '@/components/animated/RotateIn'

interface PageHeaderTitleProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  children: string
  as?: ElementType
}

export function PageHeaderTitle({
  icon,
  children,
  className,
  as = 'h1',
  ...props
}: PageHeaderTitleProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-6', className)} {...props}>
      {icon && <RotateIn>{icon}</RotateIn>}

      <BlurText
        as={as}
        text={children}
        className="text-4xl md:text-5xl lg:text-6xl font-bold"
        direction="bottom"
        delay={50}
        animateBy="words"
      />
    </div>
  )
}
