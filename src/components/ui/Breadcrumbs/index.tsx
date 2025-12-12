'use client'

import { Link } from '@/i18n/navigation'
import { cn } from '@heroui/react'
import type { ReactNode } from 'react'
import { TbChevronRight } from 'react-icons/tb'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('Navigation.breadcrumb')

  return (
    <nav
      aria-label={t('label')}
      className={cn('w-full px-4 pt-12 pb-4 hidden md:block', className)}
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className="flex items-center gap-2">
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
                  <span
                    className="flex items-center gap-2 text-sm text-foreground font-medium"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && (
                      <span className="text-base">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </span>
                )}
                {!isLast && <TbChevronRight className="text-foreground/40" />}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
