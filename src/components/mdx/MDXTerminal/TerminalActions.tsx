'use client'

import { TbCopy, TbCheck } from 'react-icons/tb'
import { useTranslations } from 'next-intl'
import { IconButton } from '@/components/ui/IconButton'
import { useClipboard } from '@/hooks/useClipboard'

interface TerminalActionsProps {
  command: string
}

function TerminalActions({ command }: TerminalActionsProps) {
  const t = useTranslations('MDX.Terminal')
  const { copied, copy } = useClipboard()

  const handleCopy = () => {
    copy(command)
  }

  return (
    <div className="flex items-center">
      <IconButton
        onPress={handleCopy}
        tooltip={copied ? t('copied') : t('copy')}
        tooltipDelay={0}
        size="sm"
        aria-label={t('copy')}
      >
        {copied ? <TbCheck size={16} /> : <TbCopy size={16} />}
      </IconButton>
    </div>
  )
}

export { TerminalActions }
