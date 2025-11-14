'use client'

import { LOCALES } from '@/constants/locale'
import { useTranslatedNavigation } from '@/hooks/useTranslatedNavigation'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from '@heroui/react'
import type { Locale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { TbWorldCog } from 'react-icons/tb'
import { IconButton } from '../../ui/IconButton'
import { useState, useEffect } from 'react'

function LanguageSelect() {
  const t = useTranslations('Locale')
  const { navigateToLocale } = useTranslatedNavigation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = (locale: Locale) => {
    navigateToLocale(locale)
  }

  if (!mounted) {
    return (
      <IconButton aria-label={t('tooltip.description')}>
        <TbWorldCog size={22} strokeWidth={1.5} />
      </IconButton>
    )
  }

  return (
    <Dropdown>
      <Tooltip content={t('tooltip.description')} delay={1000} closeDelay={200}>
        <div suppressHydrationWarning>
          <DropdownTrigger>
            <IconButton aria-label={t('tooltip.description')}>
              <TbWorldCog size={22} strokeWidth={1.5} />
            </IconButton>
          </DropdownTrigger>
        </div>
      </Tooltip>
      <DropdownMenu aria-label={t('tooltip.description')}>
        {LOCALES.map((locale) => (
          <DropdownItem
            key={locale}
            onPress={() => handleLocaleChange(locale)}
            lang={locale}
            hrefLang={locale}
          >
            {t(locale)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export { LanguageSelect }
