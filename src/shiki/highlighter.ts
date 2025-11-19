import type { BundledLanguage } from 'shiki/langs'
import type { BundledTheme } from 'shiki/themes'
import type { HighlighterCore, LanguageInput } from 'shiki/core'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const getTheme = async (theme: BundledTheme) => {
  switch (theme) {
    case 'tokyo-night':
      return import('shiki/themes/tokyo-night.mjs')
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
    default:
      return import('shiki/langs/typescript.mjs')
  }
}

let highlighterInstance: HighlighterCore | null = null
let initializationPromise: Promise<HighlighterCore> | null = null

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
  }).then((instance) => {
    highlighterInstance = instance
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
  theme: BundledTheme
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
  theme: BundledTheme = 'tokyo-night'
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
