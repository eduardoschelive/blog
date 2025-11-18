'use client'

import { Skeleton } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TbMoon, TbSun } from 'react-icons/tb'
import { IconButton } from '../../ui/IconButton'
import { flushSync } from 'react-dom'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations('Theme')

  const isDarkTheme = resolvedTheme === 'dark'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = useCallback(async () => {
    if (
      !buttonRef.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(isDarkTheme ? 'light' : 'dark')
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(isDarkTheme ? 'light' : 'dark')
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }, [isDarkTheme, setTheme])

  if (!isMounted) return <Skeleton className="rounded-full w-10 h-10" />

  const tooltipText = t('tooltip.description', {
    theme: isDarkTheme ? t('light') : t('dark'),
  })

  return (
    <IconButton
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={tooltipText}
      tooltip={tooltipText}
    >
      {isDarkTheme ? <TbMoon size={22} /> : <TbSun size={22} />}
    </IconButton>
  )
}
