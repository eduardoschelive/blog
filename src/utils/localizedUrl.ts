import { pathnames } from '@/i18n/pathnames'
import type { Locale } from 'next-intl'

/**
 * Generic function to generate localized URLs
 * Handles pathname lookup and locale translation
 *
 * Next-intl context is not available here, so we manually resolve localized pathnames
 */
function getLocalizedUrl(
  pathnameKey: string,
  locale: Locale,
  baseUrl = ''
): string {
  const localizedPath = pathnames[pathnameKey as keyof typeof pathnames]

  let resolvedPath = pathnameKey
  if (localizedPath && typeof localizedPath === 'object') {
    const translated = (localizedPath as Record<string, string>)[locale]
    if (translated) {
      resolvedPath = translated
    }
  }

  return `${baseUrl}/${locale}${resolvedPath}`
}

/**
 * Generates a localized URL for a category
 */
export function getLocalizedCategoryUrl(
  categorySlug: string,
  locale: Locale,
  baseUrl = ''
): string {
  return getLocalizedUrl(`/categories/${categorySlug}`, locale, baseUrl)
}

/**
 * Generates a localized URL for an article
 */
export function getLocalizedArticleUrl(
  categorySlug: string,
  articleSlug: string,
  locale: Locale,
  baseUrl = ''
): string {
  return getLocalizedUrl(
    `/categories/${categorySlug}/articles/${articleSlug}`,
    locale,
    baseUrl
  )
}
