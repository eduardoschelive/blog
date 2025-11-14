'use client'

import { Breadcrumbs as HeroUIBreadcrumbs, BreadcrumbItem } from '@heroui/react'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'
import { FadeIn } from '@/components/animated/FadeIn'

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
      <nav className={cn('w-full px-4 pt-12 pb-4', className)}>
        <div className="max-w-7xl mx-auto">
          <HeroUIBreadcrumbs
            separator="/"
            itemClasses={{
              item: 'text-foreground/60 data-[current=true]:text-foreground data-[current=true]:font-medium hover:text-primary transition-colors',
              separator: 'text-foreground/40',
            }}
          >
            {items.map((item, index) => (
              <BreadcrumbItem
                key={index}
                href={item.href}
                startContent={item.icon}
                className="max-w-[200px] sm:max-w-none truncate"
              >
                {item.label}
              </BreadcrumbItem>
            ))}
          </HeroUIBreadcrumbs>
        </div>
      </nav>
    </FadeIn>
  )
}
