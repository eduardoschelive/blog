'use client'

import { HEADER_ID } from '@/constants/elements'
import { Link } from '@/i18n/navigation'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { LanguageSelect } from '../LanguageSelect'
import { RSSButton } from '../RSSButton'
import { SearchButton } from '../SearchButton'
import { ThemeSwitch } from '../ThemeSwitch'

function Header() {
  const t = useTranslations('Navbar')

  return (
    <Navbar isBordered id={HEADER_ID}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">Eduardo Schelive</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/" className="font-medium text-inherit hover:underline">
            {t('home')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/categories"
            className="font-medium text-inherit hover:underline"
          >
            {t('categories')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/about"
            className="font-medium text-inherit hover:underline"
          >
            {t('about')}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SearchButton />
        </NavbarItem>
        <NavbarItem>
          <RSSButton />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <LanguageSelect />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export { Header }
