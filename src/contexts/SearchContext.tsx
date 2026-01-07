'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useDisclosure } from '@heroui/react'

interface SearchContextType {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onOpenChange: (open: boolean) => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const disclosure = useDisclosure()

  return (
    <SearchContext.Provider value={disclosure}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchModal() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchModal must be used within SearchProvider')
  }
  return context
}
