import { Button, type ButtonProps } from '@heroui/react'
import type { ReactNode } from 'react'

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  children: ReactNode
}

function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <Button {...props} isIconOnly radius="full" variant="light">
      {children}
    </Button>
  )
}

export { IconButton }
