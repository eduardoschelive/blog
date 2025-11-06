'use client'

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
}

export function RotatingText({
  words,
  interval = 3000,
  className = '',
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <LazyMotion features={domAnimation} strict>
      <span className={`inline-block ${className}`}>
        <AnimatePresence mode="wait">
          <m.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            className="inline-block"
          >
            {words[currentIndex]}
          </m.span>
        </AnimatePresence>
      </span>
    </LazyMotion>
  )
}
