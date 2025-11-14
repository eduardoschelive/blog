'use client'

import { FOOTER_ID } from '@/constants/elements'
import { useTranslations } from 'next-intl'
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import { IconTooltip } from '@/components/ui/IconTooltip'
import { IconButton } from '@/components/ui/IconButton'
import { LanguageSelect } from '@/components/ui/LanguageSelect'
import { RSSButton } from '@/components/ui/RSSButton'
import { SearchButton } from '@/components/ui/SearchButton'
import { ThemeSwitch } from '@/components/ui/ThemeSwitch'

function Footer() {
  const t = useTranslations('Footer')

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/eduardoschelive',
      icon: IoLogoGithub,
      tooltip: t('social.github'),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/eduardoschelive',
      icon: IoLogoLinkedin,
      tooltip: t('social.linkedin'),
    },
  ]

  return (
    <footer
      id={FOOTER_ID}
      className="border-t border-default bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <IconTooltip key={link.name} content={link.tooltip}>
                  <IconButton
                    as="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <Icon size={22} />
                  </IconButton>
                </IconTooltip>
              )
            })}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-center text-sm text-default-500">
              © {new Date().getFullYear()} Eduardo Schelive. {t('copyright')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SearchButton />
            <RSSButton />
            <LanguageSelect />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
