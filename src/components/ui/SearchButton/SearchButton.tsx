'use client'

import { TbSearch } from 'react-icons/tb'
import { IconButton } from '../IconButton'
import { useSearchModal } from '@/contexts/SearchContext'
import { useTranslations } from 'next-intl'

interface SearchButtonProps {
  className?: string
}

export function SearchButton({ className = '' }: SearchButtonProps) {
  const { onOpen } = useSearchModal()
  const t = useTranslations('Navigation')

  return (
    <IconButton
      onClick={onOpen}
      className={className}
      aria-label={t('search.button')}
      tooltip={t('search.tooltip')}
    >
      <TbSearch size={20} />
    </IconButton>
  )
}
