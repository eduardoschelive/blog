'use client'

import { TbCopy, TbCheck, TbDownload } from 'react-icons/tb'
import { useTranslations } from 'next-intl'
import { IconButton } from '@/components/ui/IconButton'
import { useClipboard } from '@/hooks/useClipboard'
import { useDownload } from '@/hooks/useDownload'
import { getFileExtension } from '@/utils/languageExtensions'

interface CodeActionsProps {
  code: string
  lang?: string
}

function CodeActions({ code, lang }: CodeActionsProps) {
  const t = useTranslations('Code')
  const { copied, copy } = useClipboard()
  const { download } = useDownload()

  const handleCopy = () => {
    copy(code)
  }

  const handleDownload = () => {
    const extension = getFileExtension(lang)
    download(code, { filename: `snippet.${extension}` })
  }

  return (
    <div className="flex items-center">
      <div role="status" aria-live="polite" className="sr-only">
        {copied && t('copied')}
      </div>
      <IconButton
        onPress={handleCopy}
        tooltip={copied ? t('copied') : t('copy')}
        tooltipDelay={0}
        size="sm"
        aria-label={t('copy')}
      >
        {copied ? <TbCheck size={16} /> : <TbCopy size={16} />}
      </IconButton>
      <IconButton
        onPress={handleDownload}
        tooltip={t('download')}
        tooltipDelay={0}
        size="sm"
        aria-label={t('download')}
      >
        <TbDownload size={16} />
      </IconButton>
    </div>
  )
}

export { CodeActions }
