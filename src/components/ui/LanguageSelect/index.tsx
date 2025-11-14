'use client'

import { LOCALES } from '@/constants/locale'
import { useTranslatedNavigation } from '@/hooks/useTranslatedNavigation'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import type { Locale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { TbWorld } from 'react-icons/tb'
import { IconTooltip } from '../../ui/IconTooltip'
import { IconButton } from '../../ui/IconButton'

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
            <IconButton>
              <TbWorld size={22} />
            </IconButton>
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
