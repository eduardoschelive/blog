'use client'

import { FOOTER_ID } from '@/constants/elements'
import { useTranslations } from 'next-intl'
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import { IconTooltip } from '../../ui/IconTooltip'
import { LanguageSelect } from '../LanguageSelect'
import { ThemeSwitch } from '../ThemeSwitch'

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
      className="border-t border-default bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <IconTooltip key={link.name} content={link.tooltip}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-default-100"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                </IconTooltip>
              )
            })}
          </div>

          <div className="text-center text-sm text-default-500">
            <p>
              © {new Date().getFullYear()} Eduardo Schelive. {t('copyright')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
