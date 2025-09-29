'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { IconTooltip } from '../../ui/IconTooltip'

interface SearchButtonProps {
  className?: string
}

function SearchButton({ className = '' }: SearchButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const t = useTranslations('Navigation')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchTerm)
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  return (
    <>
      <IconTooltip delay={1000} closeDelay={200} content={t('search.tooltip')}>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/50 transition-colors ${className}`}
          aria-label={t('search.button')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m21 21-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </IconTooltip>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-background border rounded-lg shadow-lg w-full max-w-lg mx-4">
            <form onSubmit={handleSearch} className="p-4">
              <div className="flex items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="m21 21-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-accent/50 rounded"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  {t('search.instructionsText')}{' '}
                  <kbd className="px-2 py-1 bg-accent rounded text-xs">
                    {t('search.enter')}
                  </kbd>{' '}
                  {t('search.instructionsMiddle')}{' '}
                  <kbd className="px-2 py-1 bg-accent rounded text-xs">
                    {t('search.esc')}
                  </kbd>{' '}
                  {t('search.instructionsEnd')}
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export { SearchButton }
