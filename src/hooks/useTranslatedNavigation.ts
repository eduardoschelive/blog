import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import type { Locale } from 'next-intl'

interface NavigationWithPaths {
  navigateToLocale: (targetLocale: Locale) => void
}

export function useTranslatedNavigation(): NavigationWithPaths {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const navigateToLocale = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) {
      return
    }

    router.replace(pathname, { locale: targetLocale })
  }

  return { navigateToLocale }
}
