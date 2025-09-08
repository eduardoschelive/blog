'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { LanguageSelect } from '../LanguageSelect'
import { ThemeSwitch } from '../ThemeSwitch'

function Header() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">Eduardo Schelive</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
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
