export const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

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

export function calculateAge(birthdate: string): number {
  const birth = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function calculateYearsSince(year: number): number {
  return new Date().getFullYear() - year
}
