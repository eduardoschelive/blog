import { Button, type ButtonProps, Tooltip } from '@heroui/react'
import type { ReactNode } from 'react'

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  children: ReactNode
  tooltip?: string
  tooltipDelay?: number
  tooltipCloseDelay?: number
  [key: string]: unknown
}

function IconButton({
  children,
  tooltip,
  tooltipDelay = 1000,
  tooltipCloseDelay = 200,
  ...props
}: IconButtonProps) {
  const button = (
    <Button
      {...props}
      isIconOnly
      radius="full"
      variant="light"
      suppressHydrationWarning
    >
      {children}
    </Button>
  )

  if (tooltip) {
    return (
      <Tooltip
        content={tooltip}
        delay={tooltipDelay}
        closeDelay={tooltipCloseDelay}
        suppressHydrationWarning
      >
        {button}
      </Tooltip>
    )
  }

  return button
}

export { IconButton }
