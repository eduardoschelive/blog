'use client'

import { Link } from '@/i18n/navigation'
import { cn } from '@heroui/react'
import { m } from 'framer-motion'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'
import { IoArrowForward, IoOpenOutline } from 'react-icons/io5'

interface AnimatedLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode
  endContent?: ReactNode
  target?: '_blank' | '_self' | '_parent' | '_top'
}

function AnimatedLink({
  children,
  endContent,
  target,
  className,
  ...props
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isExternal = target === '_blank'

  const DefaultIcon = isExternal ? IoOpenOutline : IoArrowForward

  return (
    <Link
      target={target}
      className={cn('inline-flex items-center gap-2 relative group', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="relative">
        {children}
        <m.span
          className="absolute left-1/2 bottom-0 h-0.5 bg-current -translate-x-1/2"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </span>

      {endContent !== undefined ? (
        endContent
      ) : (
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
          <DefaultIcon className="w-4 h-4" />
        </m.span>
      )}
    </Link>
  )
}

export { AnimatedLink }
