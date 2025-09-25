'use client'

import { LOCALES } from '@/constants/locale'
import { useTranslatedNavigation } from '@/hooks/useTranslatedNavigation'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import type { Locale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { IoEarth } from 'react-icons/io5'
import { IconTooltip } from '../../ui/IconTooltip'

function LanguageSelect() {
  const t = useTranslations('Locale')
  const { navigateToLocale } = useTranslatedNavigation()

  const handleLocaleChange = (locale: Locale) => {
    navigateToLocale(locale)
  }

  return (
    <Dropdown>
      <IconTooltip
        delay={1000}
        closeDelay={200}
        content={t('tooltip.description')}
      >
        <div>
          <DropdownTrigger>
            <Button variant="light" isIconOnly radius="full">
              <IoEarth size={24} />
            </Button>
          </DropdownTrigger>
        </div>
      </IconTooltip>
      <DropdownMenu>
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
