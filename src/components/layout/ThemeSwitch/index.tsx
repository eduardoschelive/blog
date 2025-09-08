'use client'

import { Button, Skeleton } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { IconTooltip } from '../../ui/IconTooltip'

export function ThemeSwitch() {
  const buttonRef = useRef<HTMLButtonElement>(null)
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
      <Button
        isIconOnly
        onPress={handleThemeChange}
        radius="full"
        variant="light"
        ref={buttonRef}
      >
        {isDarkTheme ? <IoMoon size={24} /> : <IoSunny size={24} />}
      </Button>
    </IconTooltip>
  )
}
