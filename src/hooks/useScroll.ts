'use client'

import { HEADER_ID } from '@/constants/elements'
import { useRouter } from '@/i18n/navigation'
import type { Pathname } from '@/i18n/pathnames'

function useScroll() {
  const { replace } = useRouter()

  const scrollToNextPage = () => {
    const windowHeight = window.innerHeight
    const header = document.getElementById(HEADER_ID)
    const headerHeight = header?.offsetHeight || 64

    window.scrollTo({
      top: windowHeight - headerHeight,
      behavior: 'smooth',
    })
  }

  const scrollToHeading = (id: string) => {
    replace(`#${id}` as Pathname, { scroll: false })

    const el = document.getElementById(id)
    const header = document.getElementById(HEADER_ID)

    if (el && header) {
      const headerHeight = header.offsetHeight
      const elementRect = el.getBoundingClientRect()
      const elementPosition =
        elementRect.top + window.scrollY - headerHeight - 16

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return { scrollToNextPage, scrollToHeading }
}

export { useScroll }
