'use client'

import { cn } from '@heroui/react'
import { type ReactNode, useCallback, useRef, useState } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

const ROTATION_THRESHOLD = 0.5

export function TiltCard({ children, className, maxTilt = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      // Only update if change is significant
      if (
        Math.abs(rotateX - rotation.x) > ROTATION_THRESHOLD ||
        Math.abs(rotateY - rotation.y) > ROTATION_THRESHOLD
      ) {
        setRotation({ x: rotateX, y: rotateY })
      }
    },
    [maxTilt, rotation.x, rotation.y]
  )

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'md:transition-transform md:duration-300 md:ease-out md:will-change-transform',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}
