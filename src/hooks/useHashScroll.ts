'use client'

import { useEffect } from 'react'
import { HEADER_ID } from '@/constants/elements'

export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash

    if (!hash) return

    const id = hash.replace('#', '')

    const element = document.getElementById(id)
    const header = document.getElementById(HEADER_ID)

    if (element && header) {
      const headerHeight = header.offsetHeight
      const elementRect = element.getBoundingClientRect()
      const elementPosition =
        elementRect.top + window.scrollY - headerHeight - 16

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }, [])
}
