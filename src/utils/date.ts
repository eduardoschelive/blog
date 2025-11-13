/**
 * Default date format options
 */
export const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

/**
 * Formats a date to a localized string
 * @param date - Date object or ISO string
 * @param locale - Locale string (e.g., 'en-US', 'pt-BR')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string or null if invalid
 */
export function formatDate(
  date: Date | string | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT
): string | null {
  if (!date) {
    return null
  }

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    if (isNaN(dateObj.getTime())) {
      return null
    }

    return dateObj.toLocaleDateString(locale, options)
  } catch {
    return null
  }
}
