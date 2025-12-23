'use client'

import { useEffect } from 'react'
import { showConsoleEasterEgg } from '@/utils/consoleEasterEgg'

export function ConsoleEasterEgg() {
  useEffect(() => {
    showConsoleEasterEgg()
  }, [])

  return null
}
