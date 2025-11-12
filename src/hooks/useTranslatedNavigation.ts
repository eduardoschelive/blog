import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from 'next-intl'

interface NavigationWithPaths {
  navigateToLocale: (targetLocale: Locale) => void
}

export function useTranslatedNavigation(): NavigationWithPaths {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToLocale = (targetLocale: Locale) => {
    router.push(pathname, { locale: targetLocale })
  }

  return { navigateToLocale }
}
