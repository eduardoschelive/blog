import { Button, type ButtonProps, Tooltip } from '@heroui/react'
import type { ReactNode } from 'react'

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  children: ReactNode
  tooltip?: string
  tooltipDelay?: number
  tooltipCloseDelay?: number
}

function IconButton({
  children,
  tooltip,
  tooltipDelay = 1000,
  tooltipCloseDelay = 200,
  ...props
}: IconButtonProps) {
  const button = (
    <Button {...props} isIconOnly radius="full" variant="light">
      {children}
    </Button>
  )

  if (tooltip) {
    return (
      <Tooltip
        content={tooltip}
        delay={tooltipDelay}
        closeDelay={tooltipCloseDelay}
      >
        {button}
      </Tooltip>
    )
  }

  return button
}

export { IconButton }
