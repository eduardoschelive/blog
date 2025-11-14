'use client'

import { Skeleton } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TbMoon, TbSun } from 'react-icons/tb'
import { IconTooltip } from '../../ui/IconTooltip'
import { IconButton } from '../../ui/IconButton'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const t = useTranslations('Theme')

  const isDarkTheme = resolvedTheme === 'dark'

  const handleThemeChange = (): void => {
    const newTheme = isDarkTheme ? 'light' : 'dark'
    setTheme(newTheme)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Skeleton className="rounded-full w-10 h-10" />

  return (
    <IconTooltip
      delay={1000}
      closeDelay={200}
      content={t('tooltip.description', {
        theme: isDarkTheme ? t('light') : t('dark'),
      })}
    >
      <IconButton
        onClick={handleThemeChange}
        aria-label={t('tooltip.description', {
          theme: isDarkTheme ? t('light') : t('dark'),
        })}
      >
        {isDarkTheme ? <TbMoon size={22} /> : <TbSun size={22} />}
      </IconButton>
    </IconTooltip>
  )
}
