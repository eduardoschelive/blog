import { DEFAULT_LOCALE, LOCALES } from '@/constants/locale'
import { defineRouting } from 'next-intl/routing'
import { pathnames } from './pathnames'

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  pathnames,
  localePrefix: 'as-needed',
})
