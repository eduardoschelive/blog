'use client'

import { m, useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isLockedVisible, setIsLockedVisible] = useState(false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const isInView = useInView(ref, {
    amount: 0.2,
    margin: '0px 0px -50px 0px',
  })

  const handleScroll = useCallback(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    if (rect.bottom < 0) {
      setIsLockedVisible(true)
    } else if (rect.top > viewportHeight) {
      setIsLockedVisible(false)
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return

    let rafId: number
    let ticking = false

    const throttledScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [handleScroll])

  const shouldBeVisible = isLockedVisible || isInView

  const animation = prefersReducedMotion
    ? { opacity: 1, x: 0 }
    : shouldBeVisible
      ? { opacity: 1, x: 0 }
      : { opacity: 0, x: -20 }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }

  return (
    <m.div
      ref={ref}
      initial={
        prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
      }
      animate={animation}
      transition={transition}
      className={className}
    >
      {children}
    </m.div>
  )
}
