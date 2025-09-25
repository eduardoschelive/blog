import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from 'next-intl'

interface NavigationWithPaths {
  navigateToLocale: (targetLocale: Locale) => void
}

export function useTranslatedNavigation(): NavigationWithPaths {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToLocale = (targetLocale: Locale) => {
    // @ts-expect-error - Fragment links are valid but TypeScript can't infer them
    router.push(pathname, { locale: targetLocale })
  }

  return { navigateToLocale }
}
