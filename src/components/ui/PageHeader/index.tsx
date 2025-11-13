'use client'

import { BlurText } from '@/components/ui/BlurText'
import { m } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  showDivider?: boolean
}

export function PageHeader({
  icon,
  title,
  subtitle,
  showDivider = true,
}: PageHeaderProps) {
  return (
    <section className="w-full px-4 pt-4 pb-8 md:pt-6 md:pb-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
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
            text={title}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            direction="bottom"
            delay={50}
            animateBy="words"
          />
        </div>

        {showDivider && (
          <m.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-1 bg-linear-to-r from-primary to-secondary rounded-full mb-6"
          />
        )}

        {subtitle && (
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-lg md:text-xl text-foreground/70 leading-relaxed"
          >
            {subtitle}
          </m.p>
        )}
      </div>
    </section>
  )
}
