'use client'

import { LOCALES } from '@/constants/locale'
import { usePathname } from '@/i18n/navigation'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useTranslations } from 'next-intl'
import { IoEarth } from 'react-icons/io5'
import { IconTooltip } from '../../ui/IconTooltip'

function LanguageSelect() {
  const t = useTranslations('Locale')
  const pathname = usePathname()

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
            href={pathname}
            lang={locale}
            hrefLang={locale}
            routerOptions={{
              locale,
            }}
          >
            {t(locale)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export { LanguageSelect }
