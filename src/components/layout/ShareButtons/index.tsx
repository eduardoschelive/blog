'use client'

import { IconButton } from '@/components/ui/IconButton'
import { Link } from '@heroui/react'
import { useTranslations } from 'next-intl'
import {
  TbBrandX,
  TbBrandLinkedin,
  TbBrandWhatsapp,
  TbBrandTelegram,
  TbBrandReddit,
  TbLink,
} from 'react-icons/tb'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const t = useTranslations('Article.share')
  const [copied, setCopied] = useState(false)

  const shareText = encodeURIComponent(title)
  const shareUrl = encodeURIComponent(url)

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    reddit: `https://reddit.com/submit?url=${shareUrl}&title=${shareText}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.warn('Failed to copy link:', error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground text-center md:text-left">
        {t('title')}
      </p>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <IconButton
          as={Link}
          href={shareLinks.x}
          aria-label={t('x')}
          tooltip={t('x')}
          isExternal
        >
          <TbBrandX size={20} />
        </IconButton>

        <IconButton
          as={Link}
          href={shareLinks.linkedin}
          aria-label={t('linkedin')}
          tooltip={t('linkedin')}
          isExternal
        >
          <TbBrandLinkedin size={20} />
        </IconButton>

        <IconButton
          as={Link}
          href={shareLinks.whatsapp}
          aria-label={t('whatsapp')}
          tooltip={t('whatsapp')}
          isExternal
        >
          <TbBrandWhatsapp size={20} />
        </IconButton>

        <IconButton
          as={Link}
          href={shareLinks.telegram}
          aria-label={t('telegram')}
          tooltip={t('telegram')}
          isExternal
        >
          <TbBrandTelegram size={20} />
        </IconButton>

        <IconButton
          as={Link}
          href={shareLinks.reddit}
          aria-label={t('reddit')}
          tooltip={t('reddit')}
          isExternal
        >
          <TbBrandReddit size={20} />
        </IconButton>

        <IconButton
          onClick={handleCopyLink}
          aria-label={t('copyLink')}
          tooltip={copied ? t('copied') : t('copyLink')}
        >
          <TbLink size={20} />
        </IconButton>
      </div>
    </div>
  )
}
