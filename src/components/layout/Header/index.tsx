'use client'

import { HEADER_ID } from '@/constants/elements'
import { Link } from '@/i18n/navigation'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import { useTranslations } from 'next-intl'
import { LanguageSelect } from '@/components/ui/LanguageSelect'
import { RSSButton } from '@/components/ui/RSSButton'
import { SearchButton } from '@/components/ui/SearchButton'
import { ThemeSwitch } from '@/components/ui/ThemeSwitch'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TbMenu2, TbX, TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import { ScaleIn } from '@/components/animated/ScaleIn'
import { IconButton } from '@/components/ui/IconButton'
import { Link as HeroUILink } from '@heroui/react'
import { PERSONAL_INFO } from '@/constants/personal'

function Header() {
  const t = useTranslations('Navbar')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { name, social } = PERSONAL_INFO

  const menuItems = [
    { label: t('home'), href: '/' },
    { label: t('categories'), href: '/categories' },
    { label: t('about'), href: '/about' },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: social.github,
      icon: TbBrandGithub,
    },
    {
      name: 'LinkedIn',
      href: social.linkedin,
      icon: TbBrandLinkedin,
    },
  ]

  return (
    <Navbar
      isBordered
      id={HEADER_ID}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden flex-1" justify="center">
        <NavbarBrand className="flex justify-center">
          <Link href="/">
            <p className="font-bold text-inherit">{name.short}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarItem>
          <SearchButton />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          icon={(isOpen) => (
            <AnimatePresence mode="wait">
              {isOpen ? (
                <ScaleIn key="close" delay={0}>
                  <TbX size={24} />
                </ScaleIn>
              ) : (
                <ScaleIn key="menu" delay={0}>
                  <TbMenu2 size={24} />
                </ScaleIn>
              )}
            </AnimatePresence>
          )}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">{name.short}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

      <NavbarContent className="hidden sm:flex" justify="end">
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

      <NavbarMenu className="pt-6">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <Link
                  href={item.href}
                  className="w-full text-lg py-3 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>

          <div className="border-t border-divider pt-4 pb-6">
            <div className="flex justify-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <IconButton
                    key={link.name}
                    as={HeroUILink}
                    href={link.href}
                    aria-label={link.name}
                  >
                    <Icon size={22} />
                  </IconButton>
                )
              })}
              <RSSButton />
              <LanguageSelect />
            </div>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  )
}

export { Header }
