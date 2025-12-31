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
import { TbWorldCog, TbInfoCircle } from 'react-icons/tb'
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
      <Tooltip
        content={
          <div className="flex gap-2 items-start">
            <TbInfoCircle
              className="text-secondary flex-shrink-0 mt-0.5"
              size={16}
            />
            <span className="text-foreground/90">
              {t('tooltip.description')}
            </span>
          </div>
        }
        delay={1000}
        closeDelay={200}
        showArrow={true}
        classNames={{
          content:
            'bg-content2/95 backdrop-blur-sm border border-secondary/30 shadow-xl px-3 py-2 text-sm rounded-lg',
          arrow: 'bg-content2/95',
        }}
      >
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
