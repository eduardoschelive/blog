'use client'

import { useRouter } from '@/i18n/navigation'
import type { Pathname } from '@/i18n/pathnames'

const HEADER_ID = 'header'

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
    // The casting is safe because we are only using hash navigation
    // @ts-expect-error - Fragment links are valid but TypeScript can't infer them
    replace(`#${id}` as Pathname, { scroll: false })

    const el = document.getElementById(id)
    const header = document.getElementById(HEADER_ID)
    if (el) {
      const headerHeight = header ? header.offsetHeight : 0
      const elementPosition = el.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return { scrollToNextPage, scrollToHeading }
}

export { useScroll }
