'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { TbSearch, TbX, TbFileText, TbFolder } from 'react-icons/tb'
import { IconButton } from '../IconButton'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Kbd,
  useDisclosure,
  Spinner,
} from '@heroui/react'
import { useSearch, type SearchResult } from '@/hooks/useSearch'
import { Link } from '@/i18n/navigation'

interface SearchButtonProps {
  className?: string
}

function HighlightMatch({ text, terms }: { text: string; terms: string[] }) {
  if (!terms || terms.length === 0) return <>{text}</>

  // Escape special regex characters and sort by length (longest first)
  const escapedTerms = terms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)

  // Create regex that matches whole words or word parts
  const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some(
          (term) => part.toLowerCase() === term.toLowerCase()
        )
        if (isMatch) {
          return (
            <mark
              key={i}
              className="bg-primary/30 text-foreground rounded px-0.5"
            >
              {part}
            </mark>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function SearchButton({ className = '' }: SearchButtonProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const t = useTranslations('Navigation')
  const { search, prefetch, isLoading, isReady } = useSearch()

  const results = useMemo(() => {
    if (!searchTerm.trim()) return { categories: [], articles: [] }
    const searchResults = search(searchTerm)
    return {
      categories: searchResults.categories.slice(0, 3),
      articles: searchResults.articles.slice(0, 6),
    }
  }, [search, searchTerm])

  const allResults = useMemo(() => {
    return [...results.categories, ...results.articles]
  }, [results])

  const handleClose = useCallback(() => {
    onClose()
    setSearchTerm('')
    setSelectedIndex(0)
  }, [onClose])

  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < allResults.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Enter' && allResults.length > 0) {
        e.preventDefault()
        const link = document.querySelector(
          `[data-search-result="${selectedIndex}"]`
        ) as HTMLAnchorElement
        link?.click()
      }
    },
    [allResults, selectedIndex]
  )

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpen()
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [onOpen])

  useEffect(() => {
    // Safari does not have this API yet
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => prefetch())
      return () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(() => prefetch(), 200)
      return () => clearTimeout(id)
    }
  }, [prefetch])

  useEffect(() => {
    if (isOpen) prefetch()
  }, [isOpen, prefetch])

  const renderResult = (
    result: SearchResult,
    index: number,
    isCategory: boolean
  ) => {
    const url = result.headingId
      ? `${result.url}#${result.headingId}`
      : result.url

    return (
      <li key={result.id}>
        <Link
          href={url}
          data-search-result={index}
          onClick={handleClose}
          className={`flex items-start gap-3 px-4 sm:px-5 py-3 transition-colors ${
            index === selectedIndex ? 'bg-primary/10' : 'hover:bg-default/40'
          }`}
        >
          {isCategory ? (
            <TbFolder size={20} className="text-primary shrink-0 mt-0.5" />
          ) : (
            <TbFileText
              size={20}
              className="text-default-400 shrink-0 mt-0.5"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">
              <HighlightMatch
                text={result.title}
                terms={result.matchTerms || []}
              />
            </p>
            {result.match && (
              <p className="text-sm text-default-500 mt-1 line-clamp-2">
                <HighlightMatch
                  text={result.match}
                  terms={result.matchTerms || []}
                />
              </p>
            )}
            {!isCategory && result.category && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <TbFolder size={12} className="text-default-400" />
                <span className="text-xs text-default-400">
                  {result.category}
                  {result.headingText && ` › ${result.headingText}`}
                </span>
              </div>
            )}
          </div>
        </Link>
      </li>
    )
  }

  let globalIndex = 0

  return (
    <>
      <IconButton
        onClick={onOpen}
        className={className}
        aria-label={t('search.button')}
        tooltip={t('search.tooltip')}
      >
        <TbSearch size={20} />
      </IconButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        placement="top"
        size="xl"
        classNames={{
          backdrop: 'bg-background/80 backdrop-blur-sm',
          base: 'mt-[10vh] sm:mt-[15vh]',
          body: 'p-0',
          footer: 'p-0',
        }}
        hideCloseButton
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalBody>
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-divider">
              <TbSearch size={22} className="text-default-400 shrink-0" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-base sm:text-lg placeholder:text-default-400 min-w-0"
                autoFocus
              />
              {isLoading && <Spinner size="sm" />}
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-default/40 rounded-xl transition-colors shrink-0"
                aria-label={t('search.close')}
              >
                <TbX size={18} className="text-default-400" />
              </button>
            </div>

            {/* Search Results */}
            {searchTerm.trim() && (
              <div className="max-h-[50vh] overflow-y-auto">
                {!isReady ? (
                  <div className="flex items-center justify-center py-8">
                    <Spinner size="md" />
                  </div>
                ) : allResults.length > 0 ? (
                  <div className="py-2">
                    {/* Categories */}
                    {results.categories.length > 0 && (
                      <div>
                        <div className="px-4 sm:px-5 py-2">
                          <span className="text-xs font-medium text-default-400 uppercase tracking-wider">
                            {t('search.categories')}
                          </span>
                        </div>
                        <ul>
                          {results.categories.map((result) => {
                            const index = globalIndex++
                            return renderResult(result, index, true)
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Articles */}
                    {results.articles.length > 0 && (
                      <div>
                        <div className="px-4 sm:px-5 py-2">
                          <span className="text-xs font-medium text-default-400 uppercase tracking-wider">
                            {t('search.articles')}
                          </span>
                        </div>
                        <ul>
                          {results.articles.map((result) => {
                            const index = globalIndex++
                            return renderResult(result, index, false)
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-default-500">{t('search.noResults')}</p>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <div className="w-full px-4 sm:px-5 py-3 border-t border-divider bg-content2/50 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs text-default-600">
                <span className="hidden sm:flex items-center gap-1.5">
                  <Kbd
                    className="bg-default-100 dark:bg-default-100 shadow-small"
                    keys={['command']}
                  >
                    K
                  </Kbd>
                  <span>{t('search.toOpen')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd
                    className="bg-default-100 dark:bg-default-100 shadow-small"
                    keys={['escape']}
                  />
                  <span>{t('search.toClose')}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-default-600">
                <Kbd
                  className="bg-default-100 dark:bg-default-100 shadow-small"
                  keys={['enter']}
                />
                <span>{t('search.toSearch')}</span>
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { SearchButton }
