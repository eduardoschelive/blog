'use client'

import { useRouter } from '@/i18n/navigation'

const HEADER_ID = 'header'

function useScrollToHeading() {
  const { replace } = useRouter()

  const scrollToHeading = (id: string) => {
    replace(`#${id}`, { scroll: false })

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

  return { scrollToHeading }
}

export { useScrollToHeading }
