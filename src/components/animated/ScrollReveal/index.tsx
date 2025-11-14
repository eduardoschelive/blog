'use client'

import { m, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isLockedVisible, setIsLockedVisible] = useState(false)

  const isInView = useInView(ref, {
    amount: 0.2,
    margin: '0px 0px -50px 0px',
  })

  useEffect(() => {
    if (!ref.current) return

    let rafId: number

    const handleScroll = () => {
      if (!ref.current) return

      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (rect.bottom < 0) {
          setIsLockedVisible(true)
          return
        }
        if (rect.top > viewportHeight) {
          setIsLockedVisible(false)
          return
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const shouldBeVisible = isLockedVisible || isInView

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={shouldBeVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
