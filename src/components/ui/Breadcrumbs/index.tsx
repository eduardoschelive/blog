'use client'

import { Link } from '@/i18n/navigation'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'
import { FadeIn } from '@/components/animated/FadeIn'
import { TbChevronRight } from 'react-icons/tb'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <FadeIn direction="down" fast>
      <nav className={cn('w-full px-4 pt-12 pb-4 hidden md:block', className)}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {items.map((item, index) => {
              const isLast = index === items.length - 1
              return (
                <div key={index} className="flex items-center gap-2">
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      {item.icon && (
                        <span className="text-base">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                      {item.icon && (
                        <span className="text-base">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </div>
                  )}
                  {!isLast && <TbChevronRight className="text-foreground/40" />}
                </div>
              )
            })}
          </div>
        </div>
      </nav>
    </FadeIn>
  )
}
