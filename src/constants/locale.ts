export const LOCALES = ['pt-BR', 'en-US'] as const
export const DEFAULT_LOCALE = 'en-US'

export type Locale = (typeof LOCALES)[number]
