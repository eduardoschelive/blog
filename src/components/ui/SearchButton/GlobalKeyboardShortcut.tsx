'use client'

import { useEffect } from 'react'
import { useSearchModal } from '@/contexts/SearchContext'

export function GlobalKeyboardShortcut() {
  const { isOpen, onOpen, onClose } = useSearchModal()

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          onOpen()
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [onOpen, onClose, isOpen])

  return null
}
