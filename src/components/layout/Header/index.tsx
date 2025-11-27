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
} from '@heroui/react'
import { useTranslations } from 'next-intl'
import { LanguageSelect } from '@/components/ui/LanguageSelect'
import { RSSButton } from '@/components/ui/RSSButton'
import { SearchButton } from '@/components/ui/SearchButton'
import { ThemeSwitch } from '@/components/ui/ThemeSwitch'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TbMenu2, TbX, TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import { IconButton } from '@/components/ui/IconButton'
import { Link as HeroUILink } from '@heroui/react'
import { PERSONAL_INFO } from '@/constants/personal'
import Image from 'next/image'

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
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/favicon-32x32.png"
              alt="Logo"
              width={24}
              height={24}
              className="rounded"
            />
            <p className="font-bold text-inherit">{name.short}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <div className="flex gap-1 items-center">
          <NavbarItem>
            <SearchButton />
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <TbX key="close" size={22} />
              ) : (
                <TbMenu2 key="menu" size={22} />
              )}
            </AnimatePresence>
          </IconButton>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/favicon-32x32.png"
              alt="Logo"
              width={24}
              height={24}
              className="rounded"
            />
            <p className="font-bold text-inherit">{name.short}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            href="/"
            className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
          >
            {t('home')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/categories"
            className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
          >
            {t('categories')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/about"
            className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
          >
            {t('about')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-1" justify="end">
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

      <NavbarMenu className="pt-6 pb-safe">
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

          <div className="border-t border-divider pt-4 pb-20 mb-safe">
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
