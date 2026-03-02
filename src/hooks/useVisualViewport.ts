'use client'

import { useState, useEffect } from 'react'

export function useVisualViewport() {
  const [height, setHeight] = useState<string>('100dvh')

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const update = () => setHeight(`${vv.height}px`)
    update()

    vv.addEventListener('resize', update)
    return () => vv.removeEventListener('resize', update)
  }, [])

  return height
}
