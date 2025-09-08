'use client'

import type { TooltipProps, VariantProps } from '@heroui/react'
import { Tooltip, tv } from '@heroui/react'
import type { ElementType } from 'react'
import { IoInformationCircle } from 'react-icons/io5'

const tooltipVariants = tv({
  base: 'text-xl',
  variants: {
    variant: {
      info: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

const variantIcons: Record<
  keyof typeof tooltipVariants.variants.variant,
  ElementType
> = {
  info: IoInformationCircle,
}

interface IconTooltipProps
  extends TooltipProps,
    VariantProps<typeof tooltipVariants> {}

export function IconTooltip({
  variant = 'info',
  content,
  children,
  ...props
}: IconTooltipProps) {
  const Icon = variantIcons[variant]

  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="flex items-center justify-around gap-2">
            <Icon className={tooltipVariants({ variant })} />
            <span className="text-tiny">{content}</span>
          </div>
        </div>
      }
      {...props}
    >
      {children}
    </Tooltip>
  )
}
