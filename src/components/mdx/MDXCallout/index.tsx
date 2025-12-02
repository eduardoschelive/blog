'use client'

import { Card, CardBody, tv } from '@heroui/react'
import {
  TbInfoCircle,
  TbAlertTriangle,
  TbCheck,
  TbX,
  TbBulb,
} from 'react-icons/tb'
import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'danger' | 'note'

interface MDXCalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const calloutStyles = tv({
  slots: {
    card: 'my-4 border-l-4',
    icon: 'shrink-0 mt-0.5',
    title: 'font-semibold mb-1',
  },
  variants: {
    type: {
      info: {
        card: 'bg-primary/10 border-l-primary',
        icon: 'text-primary',
        title: 'text-primary',
      },
      warning: {
        card: 'bg-warning/10 border-l-warning',
        icon: 'text-warning',
        title: 'text-warning',
      },
      success: {
        card: 'bg-success/10 border-l-success',
        icon: 'text-success',
        title: 'text-success',
      },
      danger: {
        card: 'bg-danger/10 border-l-danger',
        icon: 'text-danger',
        title: 'text-danger',
      },
      note: {
        card: 'bg-secondary/10 border-l-secondary',
        icon: 'text-secondary',
        title: 'text-secondary',
      },
    },
  },
  defaultVariants: {
    type: 'info',
  },
})

const iconMap = {
  info: TbInfoCircle,
  warning: TbAlertTriangle,
  success: TbCheck,
  danger: TbX,
  note: TbBulb,
}

function MDXCallout({ type = 'info', title, children }: MDXCalloutProps) {
  const styles = calloutStyles({ type })
  const Icon = iconMap[type]

  return (
    <Card className={styles.card()} shadow="none">
      <CardBody className="gap-2">
        <div className="flex items-start gap-3">
          <Icon className={`${styles.icon()} shrink-0`} size={20} />
          <div className="grow min-w-0">
            {title && <h4 className={styles.title()}>{title}</h4>}
            <div className="text-foreground/90 text-sm [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>code]:text-xs">
              {children}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export { MDXCallout }
