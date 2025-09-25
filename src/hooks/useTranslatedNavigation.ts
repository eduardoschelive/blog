import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from 'next-intl'

interface NavigationWithPaths {
  navigateToLocale: (
    targetLocale: Locale,
    paths?: Record<Locale, string>
  ) => void
}

export function useTranslatedNavigation(): NavigationWithPaths {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToLocale = (
    targetLocale: Locale,
    paths?: Record<Locale, string>
  ) => {
    // Se temos paths disponíveis, usa o path correto para o idioma
    if (paths && paths[targetLocale]) {
      router.push(paths[targetLocale], { locale: targetLocale })
    } else {
      // Fallback: navega para a mesma URL no idioma alvo
      router.push(pathname, { locale: targetLocale })
    }
  }

  return { navigateToLocale }
}
