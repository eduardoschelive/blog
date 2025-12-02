import type { BundledLanguage } from 'shiki/langs'
import type { BundledTheme } from 'shiki/themes'
import type { HighlighterCore, LanguageInput } from 'shiki/core'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import { tokyoNightLight } from '@/shiki/themes/tokyo-night-light'

const getTheme = async (theme: BundledTheme | 'tokyo-night-light') => {
  switch (theme) {
    case 'tokyo-night':
      return import('shiki/themes/tokyo-night.mjs')
    case 'tokyo-night-light':
      return { default: tokyoNightLight }
    default:
      return import('shiki/themes/tokyo-night.mjs')
  }
}

const getLanguage = async (lang: BundledLanguage) => {
  switch (lang) {
    case 'typescript':
    case 'ts':
      return import('shiki/langs/typescript.mjs')
    case 'javascript':
    case 'js':
      return import('shiki/langs/javascript.mjs')
    case 'bash':
    case 'sh':
    case 'shell':
      return import('shiki/langs/bash.mjs')
    default:
      return import('shiki/langs/typescript.mjs')
  }
}

let highlighterInstance: HighlighterCore | null = null
let initializationPromise: Promise<HighlighterCore> | null = null

// Common languages to preload for better performance
const PRELOAD_LANGUAGES: BundledLanguage[] = [
  'typescript',
  'javascript',
  'bash',
]

async function getHighlighter(): Promise<HighlighterCore> {
  if (highlighterInstance) {
    return highlighterInstance
  }

  if (initializationPromise) {
    return initializationPromise
  }

  initializationPromise = createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [],
    langs: [],
  }).then(async (instance) => {
    highlighterInstance = instance

    // Preload common languages and themes in the background
    Promise.all([
      ...PRELOAD_LANGUAGES.map((lang) => ensureLanguageLoaded(instance, lang)),
      ensureThemeLoaded(instance, 'tokyo-night'),
      ensureThemeLoaded(instance, 'tokyo-night-light'),
    ]).catch((error) => {
      console.warn('Failed to preload some languages/themes', error)
    })

    return instance
  })

  return initializationPromise
}

async function ensureLanguageLoaded(
  highlighter: HighlighterCore,
  lang: BundledLanguage
) {
  const loadedLanguages = highlighter.getLoadedLanguages()

  if (!loadedLanguages.includes(lang)) {
    try {
      const languageModule = await getLanguage(lang)
      await highlighter.loadLanguage(languageModule.default as LanguageInput)
    } catch (error) {
      console.warn(`Failed to load language: ${lang}`, error)
    }
  }
}

async function ensureThemeLoaded(
  highlighter: HighlighterCore,
  theme: BundledTheme | 'tokyo-night-light'
) {
  const loadedThemes = highlighter.getLoadedThemes()

  if (!loadedThemes.includes(theme)) {
    try {
      const themeModule = await getTheme(theme)
      await highlighter.loadTheme(themeModule.default)
    } catch (error) {
      console.warn(`Failed to load theme: ${theme}`, error)
    }
  }
}

async function highlightCode(
  code: string,
  lang: BundledLanguage = 'typescript',
  theme: BundledTheme | 'tokyo-night-light' = 'tokyo-night'
): Promise<string> {
  const highlighter = await getHighlighter()

  await Promise.all([
    ensureLanguageLoaded(highlighter, lang),
    ensureThemeLoaded(highlighter, theme),
  ])

  try {
    return highlighter.codeToHtml(code, {
      lang,
      theme,
    })
  } catch (error) {
    console.error(`Failed to highlight code with lang: ${lang}`, error)
    await ensureLanguageLoaded(highlighter, 'typescript')
    return highlighter.codeToHtml(code, {
      lang: 'typescript',
      theme,
    })
  }
}

export { getHighlighter, highlightCode }
