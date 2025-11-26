'use client'

import { Link } from '@/i18n/navigation'
import { Tooltip } from '@heroui/react'
import { TbExternalLink } from 'react-icons/tb'
import { useTranslations } from 'next-intl'
import { useScroll } from '@/hooks/useScroll'
import type { ComponentPropsWithoutRef } from 'react'

function MDXLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const t = useTranslations('MDXLink')
  const { scrollToHeading } = useScroll()
  const baseClassName = 'text-primary hover:underline'

  if (href?.startsWith('#')) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const targetId = href.slice(1)
      scrollToHeading(targetId)
    }

    return (
      <Tooltip content={t('clickToScroll')} delay={500} closeDelay={100}>
        <a
          href={href}
          onClick={handleClick}
          className={baseClassName}
          {...props}
        >
          {children}
        </a>
      </Tooltip>
    )
  }

  if (href?.startsWith('http://') || href?.startsWith('https://')) {
    return (
      <Tooltip content={t('clickToOpen')} delay={500} closeDelay={100}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClassName} inline-flex items-center gap-1`}
          {...props}
        >
          {children}
          <TbExternalLink size={14} className="inline-block" />
        </a>
      </Tooltip>
    )
  }

  if (href?.startsWith('/')) {
    return (
      <Tooltip content={t('clickToAccess')} delay={500} closeDelay={100}>
        <Link href={href} className={baseClassName} {...props}>
          {children}
        </Link>
      </Tooltip>
    )
  }

  return (
    <Tooltip content={t('clickToAccess')} delay={500} closeDelay={100}>
      <a href={href} className={baseClassName} {...props}>
        {children}
      </a>
    </Tooltip>
  )
}

export { MDXLink }
