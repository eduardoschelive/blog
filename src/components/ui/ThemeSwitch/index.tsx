'use client'

import { Skeleton } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TbMoon, TbSun } from 'react-icons/tb'
import { IconButton } from '../../ui/IconButton'
import { useThemeAnimation } from '@/hooks/useThemeAnimation'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const t = useTranslations('Theme')

  const isDarkTheme = resolvedTheme === 'dark'

  const { ref, toggleWithAnimation } = useThemeAnimation({
    duration: 300,
    blurAmount: 1,
    onToggle: () => {
      setTheme(isDarkTheme ? 'light' : 'dark')
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Skeleton className="rounded-full w-10 h-10" />

  const tooltipText = t('tooltip.description', {
    theme: isDarkTheme ? t('light') : t('dark'),
  })

  return (
    <IconButton
      ref={ref}
      onClick={toggleWithAnimation}
      aria-label={tooltipText}
      tooltip={tooltipText}
    >
      {isDarkTheme ? <TbMoon size={22} /> : <TbSun size={22} />}
    </IconButton>
  )
}
