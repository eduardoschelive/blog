'use client'

import { useTranslations } from 'next-intl'
import { IconTooltip } from '../../ui/IconTooltip'

interface RSSButtonProps {
  className?: string
}

function RSSButton({ className = '' }: RSSButtonProps) {
  const t = useTranslations('Navigation')

  return (
    <IconTooltip delay={1000} closeDelay={200} content={t('rss.tooltip')}>
      <a
        href="/rss.xml"
        className={`flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/50 transition-colors ${className}`}
        aria-label={t('rss.button')}
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
      </a>
    </IconTooltip>
  )
}

export { RSSButton }
