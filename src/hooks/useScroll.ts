'use client'

const HEADER_ID = 'header'

function useScroll() {
  const scrollToNextPage = () => {
    const heroHeight = window.innerHeight
    const header = document.getElementById(HEADER_ID)
    const headerHeight = header?.offsetHeight || 64

    window.scrollTo({
      top: heroHeight - headerHeight,
      behavior: 'smooth',
    })
  }

  return { scrollToNextPage }
}

export { useScroll }
