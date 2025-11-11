'use client'

import { Link, cn } from '@heroui/react'
import { m } from 'framer-motion'
import type { LinkProps } from '@heroui/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

interface AnimatedLinkProps extends Omit<LinkProps, 'children'> {
  children: ReactNode
}

function AnimatedLink({
  children,
  isExternal,
  className,
  ...props
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  const iconSymbol = isExternal ? '↗' : '→'

  return (
    <Link
      isExternal={isExternal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      showAnchorIcon
      className={cn('inline-block w-fit', className)}
      anchorIcon={
        <m.span
          animate={
            isHovered
              ? isExternal
                ? {
                    x: [0, 3, 0],
                    y: [0, -3, 0],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
                : {
                    x: [0, 4, 0],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
              : { x: 0, y: 0 }
          }
        >
          {iconSymbol}
        </m.span>
      }
      {...props}
    >
      <span className="relative mr-2">
        {children}
        <m.span
          className="absolute left-1/2 bottom-0 h-0.5 bg-current -translate-x-1/2"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </span>
    </Link>
  )
}

export { AnimatedLink }
