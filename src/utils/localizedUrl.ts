import { pathnames } from '@/i18n/pathnames'
import type { Locale } from 'next-intl'

/**
 * Generates a localized URL for an article
 * Uses the generated pathnames to get the correct translated URL
 *
 * Next-intl context is not available here, so we manually resolve localized pathnames
 */
export function getLocalizedArticleUrl(
  categorySlug: string,
  articleSlug: string,
  locale: Locale,
  baseUrl = ''
): string {
  const pathnameKey = `/categories/${categorySlug}/articles/${articleSlug}`
  const localizedPath = pathnames[pathnameKey as keyof typeof pathnames]

  let articlePath = pathnameKey
  if (localizedPath && typeof localizedPath === 'object') {
    const translated = (localizedPath as Record<string, string>)[locale]
    if (translated) {
      articlePath = translated
    }
  }

  return `${baseUrl}/${locale}${articlePath}`
}
