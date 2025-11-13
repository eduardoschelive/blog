import { cn } from '@heroui/react'

interface GradientDividerProps {
  className?: string
}

export function GradientDivider({ className }: GradientDividerProps = {}) {
  return (
    <div
      className={cn(
        'w-full h-1 bg-linear-to-r from-primary to-secondary rounded-full',
        className
      )}
    />
  )
}
