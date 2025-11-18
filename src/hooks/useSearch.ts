'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import MiniSearch from 'minisearch'
import { useLocale } from 'next-intl'
import type {
  SearchItem,
  SearchResult,
  SearchResults,
  SearchData,
  SearchSection,
} from '@/types/search.type'

const SEARCH_CONFIG = {
  fields: ['title', 'description', 'content'] as string[],
  storeFields: [
    'id',
    'type',
    'title',
    'description',
    'content',
    'sections',
    'slug',
    'url',
    'category',
    'categorySlug',
  ] as string[],
  searchOptions: {
    boost: { title: 2, description: 1.3, content: 1 },
    fuzzy: 0.2,
    prefix: true,
  },
}

function findMatchInSections(
  sections: SearchSection[],
  matchInfo: Record<string, string[]>
): { snippet: string; headingId: string | null; headingText: string | null } {
  const contentTerms: string[] = []

  for (const [term, fields] of Object.entries(matchInfo)) {
    if (fields.includes('content')) {
      contentTerms.push(term)
    }
  }

  if (contentTerms.length === 0) {
    return { snippet: '', headingId: null, headingText: null }
  }

  for (const section of sections) {
    const lowerContent = section.c.toLowerCase()

    for (const term of contentTerms) {
      const index = lowerContent.indexOf(term.toLowerCase())
      if (index !== -1) {
        const start = Math.max(0, index - 30)
        const end = Math.min(section.c.length, index + term.length + 70)

        let snippet = section.c.substring(start, end)
        if (start > 0) snippet = '...' + snippet
        if (end < section.c.length) snippet = snippet + '...'

        return { snippet, headingId: section.h, headingText: section.t }
      }
    }
  }

  return { snippet: '', headingId: null, headingText: null }
}

function getMatchSnippet(
  item: SearchItem,
  matchInfo: Record<string, string[]>
): { snippet: string; headingId: string | null; headingText: string | null } {
  const fieldMatches: Record<string, string[]> = {}

  for (const [term, fields] of Object.entries(matchInfo)) {
    for (const field of fields) {
      if (!fieldMatches[field]) {
        fieldMatches[field] = []
      }
      fieldMatches[field].push(term)
    }
  }

  if (item.sections && item.sections.length > 0 && fieldMatches['content']) {
    const result = findMatchInSections(item.sections, matchInfo)
    if (result.snippet) {
      return result
    }
  }

  const fieldsToCheck = ['description', 'title']

  for (const field of fieldsToCheck) {
    const terms = fieldMatches[field]
    if (!terms || terms.length === 0) continue

    const fieldValue = item[field as keyof SearchItem] as string
    if (!fieldValue) continue

    const lowerField = fieldValue.toLowerCase()

    let bestIndex = -1
    let bestTerm = ''

    for (const term of terms) {
      const index = lowerField.indexOf(term.toLowerCase())
      if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
        bestIndex = index
        bestTerm = term
      }
    }

    if (bestIndex !== -1) {
      const start = Math.max(0, bestIndex - 30)
      const end = Math.min(fieldValue.length, bestIndex + bestTerm.length + 70)

      let snippet = fieldValue.substring(start, end)

      if (start > 0) snippet = '...' + snippet
      if (end < fieldValue.length) snippet = snippet + '...'

      return { snippet, headingId: null, headingText: null }
    }
  }

  if (item.description) {
    return {
      snippet:
        item.description.length > 100
          ? item.description.substring(0, 100) + '...'
          : item.description,
      headingId: null,
      headingText: null,
    }
  }

  const content = item.content || ''
  return {
    snippet: content.length > 100 ? content.substring(0, 100) + '...' : content,
    headingId: null,
    headingText: null,
  }
}

function createSearchInstance() {
  return new MiniSearch<SearchItem>(SEARCH_CONFIG)
}

export function useSearch() {
  const locale = useLocale()
  const [searchData, setSearchData] = useState<SearchData>({
    categories: [],
    articles: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  const loadIndex = useCallback(async () => {
    if (hasLoaded || isLoading) return

    try {
      setIsLoading(true)
      const response = await fetch(`/search/${locale}.json`)

      if (!response.ok) {
        throw new Error('Failed to load search index')
      }

      const data: SearchData = await response.json()

      const processedData: SearchData = {
        categories: data.categories,
        articles: data.articles.map((article) => ({
          ...article,
          content: article.sections
            ? article.sections.map((s) => s.c).join(' ')
            : '',
        })),
      }

      setSearchData(processedData)
      setError(null)
      setHasLoaded(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setSearchData({ categories: [], articles: [] })
    } finally {
      setIsLoading(false)
    }
  }, [locale, hasLoaded, isLoading])

  // Reset when locale changes
  useEffect(() => {
    setHasLoaded(false)
    setSearchData({ categories: [], articles: [] })
  }, [locale])

  const { categorySearch, articleSearch } = useMemo(() => {
    const catSearch = createSearchInstance()
    const artSearch = createSearchInstance()

    if (searchData.categories.length > 0) {
      catSearch.addAll(searchData.categories)
    }

    if (searchData.articles.length > 0) {
      artSearch.addAll(searchData.articles)
    }

    return { categorySearch: catSearch, articleSearch: artSearch }
  }, [searchData])

  const search = useCallback(
    (query: string): SearchResults => {
      if (!hasLoaded) {
        loadIndex()
        return { categories: [], articles: [] }
      }

      const trimmedQuery = query.trim()

      if (!trimmedQuery) {
        return { categories: [], articles: [] }
      }

      const categoryResults = categorySearch.search(trimmedQuery)
      const articleResults = articleSearch.search(trimmedQuery)
      const queryTerms = trimmedQuery
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length >= 2)

      const mapResults = (
        results: ReturnType<typeof categorySearch.search>
      ): SearchResult[] =>
        results.map((result) => {
          const item: SearchItem = {
            id: result.id,
            type: result.type,
            title: result.title,
            description: result.description,
            content: result.content || '',
            sections: result.sections,
            slug: result.slug,
            url: result.url,
            category: result.category,
            categorySlug: result.categorySlug,
          }

          const { snippet, headingId, headingText } = getMatchSnippet(
            item,
            result.match
          )

          return {
            ...item,
            score: result.score,
            match: snippet,
            matchTerms: queryTerms,
            headingId,
            headingText,
          }
        })

      return {
        categories: mapResults(categoryResults),
        articles: mapResults(articleResults),
      }
    },
    [categorySearch, articleSearch, hasLoaded, loadIndex]
  )

  return {
    search,
    prefetch: loadIndex,
    isLoading,
    error,
    isReady: hasLoaded && !isLoading && !error,
  }
}

export type { SearchItem, SearchResult, SearchResults }
