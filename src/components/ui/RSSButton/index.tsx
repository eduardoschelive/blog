'use client'

import { useTranslations } from 'next-intl'
import { IconButton } from '../../ui/IconButton'
import { Link } from '@heroui/react'

interface RSSButtonProps {
  className?: string
}

function RSSButton({ className = '' }: RSSButtonProps) {
  const t = useTranslations('Navigation')

  return (
    <IconButton
      as={Link}
      href="/rss.xml"
      className={className}
      aria-label={t('rss.button')}
      tooltip={t('rss.tooltip')}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
      >
        <path
          d="M4 11a9 9 0 0 1 9 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 4a16 16 0 0 1 16 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="5"
          cy="19"
          r="1"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
        />
      </svg>
    </IconButton>
  )
}

export { RSSButton }
