import { Button, type ButtonProps, Tooltip } from '@heroui/react'
import type { ReactNode } from 'react'
import { TbInfoCircle } from 'react-icons/tb'

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
        content={
          <div className="flex gap-2 items-start">
            <TbInfoCircle
              className="text-secondary flex-shrink-0 mt-0.5"
              size={16}
            />
            <span className="text-foreground/90">{tooltip}</span>
          </div>
        }
        delay={tooltipDelay}
        closeDelay={tooltipCloseDelay}
        showArrow={true}
        classNames={{
          content:
            'bg-content2/95 backdrop-blur-sm border border-secondary/30 shadow-xl px-3 py-2 text-sm rounded-lg',
          arrow: 'bg-content2/95',
        }}
        suppressHydrationWarning
      >
        {button}
      </Tooltip>
    )
  }

  return button
}

export { IconButton }
