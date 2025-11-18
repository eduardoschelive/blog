export interface SearchSection {
  h: string | null
  t: string | null
  c: string
}

export interface SearchItem {
  id: string
  type: 'category' | 'article'
  title: string
  description: string
  content?: string
  sections?: SearchSection[]
  slug: string
  url: string
  category?: string
  categorySlug?: string
}

export interface SearchResultExtra {
  headingId?: string | null
  headingText?: string | null
}

export interface SearchResult extends SearchItem {
  score?: number
  match?: string
  matchTerms?: string[]
  headingId?: string | null
  headingText?: string | null
}

export interface SearchResults {
  categories: SearchResult[]
  articles: SearchResult[]
}

export interface SearchData {
  categories: SearchItem[]
  articles: SearchItem[]
}

export interface SearchIndex {
  [locale: string]: SearchData
}
