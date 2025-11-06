'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
  showCaret?: boolean
  caretClassName?: string
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  onComplete,
  showCaret = true,
  caretClassName = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex === 0 && delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(1)
      }, delay)
      return () => clearTimeout(delayTimeout)
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }

    if (currentIndex > text.length && !isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete])

  return (
    <LazyMotion features={domAnimation} strict>
      <span className={className}>
        {displayedText}
        {showCaret && (
          <m.span
            className={caretClassName}
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            _
          </m.span>
        )}
      </span>
    </LazyMotion>
  )
}
