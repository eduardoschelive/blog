'use client'

import { Link, cn } from '@heroui/react'
import { m } from 'framer-motion'
import type { LinkProps } from '@heroui/react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import type { Pathname } from '@/i18n/pathnames'

interface AnimatedLinkProps extends Omit<LinkProps, 'children' | 'href'> {
  children: ReactNode
  href?: Pathname | (string & {})
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
      className={cn('inline-flex items-center gap-1 w-fit', className)}
      {...props}
    >
      <span className="relative">
        {children}
        <m.span
          className="absolute left-1/2 bottom-0 h-0.5 bg-current -translate-x-1/2"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        />
      </span>
      <m.span
        className="inline-block"
        animate={
          isHovered
            ? isExternal
              ? {
                  x: [0, 3, 0],
                  y: [0, -3, 0],
                  transition: {
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  },
                }
              : {
                  x: [0, 4, 0],
                  transition: {
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  },
                }
            : { x: 0, y: 0 }
        }
      >
        {iconSymbol}
      </m.span>
    </Link>
  )
}

export { AnimatedLink }
