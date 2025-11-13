'use client'

import { Breadcrumbs as HeroUIBreadcrumbs, BreadcrumbItem } from '@heroui/react'
import { m } from 'framer-motion'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'

export interface BreadcrumbItemData {
  label: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbsProps {
  items: BreadcrumbItemData[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <m.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn('w-full px-4 pt-12 pb-4', className)}
    >
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
    </m.nav>
  )
}
