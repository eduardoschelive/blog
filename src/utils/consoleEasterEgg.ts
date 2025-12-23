'use client'

import { PERSONAL_INFO } from '@/constants/personal'

export function showConsoleEasterEgg() {
  if (typeof window === 'undefined') return

  const message = `
%c🤠  Howdy, partner! Welcome to Sheriff's Code Town! 🤠

Se você abriu isso aqui, sabe o que está fazendo e viu
algo estranho, por favor entre em contato comigo pelo
email: %c${PERSONAL_INFO.social.email}%c

If you're seeing this, you know what you're doing and
spotted something weird, please contact me via email:
%c${PERSONAL_INFO.social.email}%c

Built with Next.js 15 + TypeScript + Tailwind CSS 4
Check out the source: ${PERSONAL_INFO.social.github}

%cTip: Check out the Network tab to see how fast this loads! ⚡
`

  console.log(
    message,
    'color: #7aa2f7; font-size: 14px; font-weight: bold;',
    'color: #ff9e64; font-weight: bold;',
    'color: #7aa2f7; font-size: 14px; font-weight: bold;',
    'color: #ff9e64; font-weight: bold;',
    'color: #7aa2f7; font-size: 14px; font-weight: bold;',
    'color: #9ece6a; font-size: 12px; font-style: italic;'
  )

  console.log(
    "%c👋 Hiring? I'm open to opportunities!",
    'color: #bb9af7; font-size: 16px; font-weight: bold; background: #1a1b26; padding: 8px; border-radius: 4px; border: 2px solid #bb9af7;'
  )
}
