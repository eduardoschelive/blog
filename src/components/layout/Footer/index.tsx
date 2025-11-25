'use client'

import { FOOTER_ID } from '@/constants/elements'
import { useTranslations } from 'next-intl'
import { TbBrandGithub, TbBrandLinkedin, TbRss, TbMail } from 'react-icons/tb'
import { IconButton } from '@/components/ui/IconButton'
import { Link } from '@/i18n/navigation'
import { Link as HeroUILink } from '@heroui/react'
import { PERSONAL_INFO } from '@/constants/personal'

function Footer() {
  const t = useTranslations('Footer')
  const tNav = useTranslations('Navbar')
  const { name, social } = PERSONAL_INFO

  const socialLinks = [
    {
      name: 'Email',
      href: `mailto:${social.email}`,
      icon: TbMail,
      tooltip: t('social.email'),
    },
    {
      name: 'GitHub',
      href: social.github,
      icon: TbBrandGithub,
      tooltip: t('social.github'),
    },
    {
      name: 'LinkedIn',
      href: social.linkedin,
      icon: TbBrandLinkedin,
      tooltip: t('social.linkedin'),
    },
    {
      name: 'RSS',
      href: '/rss.xml',
      icon: TbRss,
      tooltip: 'RSS Feed',
    },
  ]

  const navigationLinks = [
    { label: tNav('home'), href: '/' },
    { label: tNav('categories'), href: '/categories' },
    { label: tNav('about'), href: '/about' },
  ]

  return (
    <footer
      id={FOOTER_ID}
      className="border-t border-default bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Brand & Description */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <h3 className="font-bold text-lg">{name.full}</h3>
            </Link>
            <p className="text-sm text-default-500 leading-relaxed">
              Software Engineer sharing insights about web development, cloud
              infrastructure, and modern technologies.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-default-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <IconButton
                    key={link.name}
                    as={HeroUILink}
                    href={link.href}
                    aria-label={link.name}
                    tooltip={link.tooltip}
                  >
                    <Icon size={20} />
                  </IconButton>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Stacked */}
        <div className="md:hidden space-y-6 mb-6">
          <div className="text-center">
            <Link href="/" className="inline-block mb-3">
              <h3 className="font-bold text-lg">{name.full}</h3>
            </Link>
            <p className="text-sm text-default-500">
              Software Engineer sharing insights about web development and
              modern technologies.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-default-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-divider pt-6">
          <p className="text-sm text-default-500 text-center">
            © {new Date().getFullYear()} {name.full}. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
