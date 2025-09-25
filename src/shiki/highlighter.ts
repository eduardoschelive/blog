import { createHighlighterCore } from 'shiki/core.mjs'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const highlighter = await createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  themes: [import('shiki/themes/tokyo-night.mjs')],
  langs: [
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/typescript.mjs'),
  ],
})

export { highlighter }
