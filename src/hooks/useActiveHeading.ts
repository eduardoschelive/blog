'use client'

import { FOOTER_ID, HEADER_ID } from '@/constants/elements'
import { useEffect, useRef, useState } from 'react'

interface VisibleHeading {
  id: string
  distanceFromTop: number
  distanceFromBottom: number
}

function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const lastVisibleHeadingRef = useRef<string | null>(null)
  const headingElementsRef = useRef<Map<string, HTMLElement>>(new Map())
  const headerElementRef = useRef<HTMLElement | null>(null)
  const footerElementRef = useRef<HTMLElement | null>(null)
  const headerHeightRef = useRef<number>(0)
  const footerHeightRef = useRef<number>(0)

  const getHeaderHeight = (): number => {
    if (!headerElementRef.current) {
      headerElementRef.current = document.getElementById(HEADER_ID) ?? null
      if (headerElementRef.current) {
        headerHeightRef.current = headerElementRef.current.offsetHeight
      }
    }
    return headerHeightRef.current
  }

  const getFooterHeight = (): number => {
    if (!footerElementRef.current) {
      footerElementRef.current = document.getElementById(FOOTER_ID) ?? null
      if (footerElementRef.current) {
        footerHeightRef.current = footerElementRef.current.offsetHeight
      }
    }
    return footerHeightRef.current
  }

  const getVisibleHeadings = (
    headingIds: string[],
    headerHeight: number
  ): VisibleHeading[] => {
    const visibleHeadings: VisibleHeading[] = []
    const viewportHeight = window.innerHeight

    headingIds.forEach((id) => {
      let element = headingElementsRef.current.get(id)
      if (!element) {
        element = document.getElementById(id) ?? undefined
        if (element) {
          headingElementsRef.current.set(id, element)
        }
      }
      if (!element) return

      const rect = element.getBoundingClientRect()

      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        visibleHeadings.push({
          id,
          distanceFromTop: Math.abs(rect.top - headerHeight),
          distanceFromBottom: Math.abs(rect.top - viewportHeight),
        })
      }
    })

    return visibleHeadings
  }

  const findActiveHeading = (
    visibleHeadings: VisibleHeading[],
    headerHeight: number,
    headingIds: string[]
  ): string | null => {
    if (visibleHeadings.length === 0) {
      const hasHeadingIds = headingIds.length > 0
      const firstHeadingId = headingIds[0]
      return (
        lastVisibleHeadingRef.current || (hasHeadingIds ? firstHeadingId : null)
      )
    }

    if (visibleHeadings.length === 1) {
      const singleVisibleHeading = visibleHeadings[0]
      lastVisibleHeadingRef.current = singleVisibleHeading.id
      return singleVisibleHeading.id
    }

    if (visibleHeadings.length > 1) {
      const TOLERANCE_PX = 10

      const headingsBelowHeader = visibleHeadings.filter((heading) => {
        const element = headingElementsRef.current.get(heading.id)
        const elementRect = element?.getBoundingClientRect()
        const isElementBelowHeader =
          elementRect && elementRect.top > headerHeight - TOLERANCE_PX
        return isElementBelowHeader
      })

      const hasHeadingsBelowHeader = headingsBelowHeader.length > 0

      if (hasHeadingsBelowHeader) {
        const closestHeadingBelowHeader = headingsBelowHeader.reduce(
          (closest, current) =>
            current.distanceFromTop < closest.distanceFromTop
              ? current
              : closest
        )
        lastVisibleHeadingRef.current = closestHeadingBelowHeader.id
        return closestHeadingBelowHeader.id
      }

      const firstVisibleHeading = visibleHeadings[0]
      lastVisibleHeadingRef.current = firstVisibleHeading.id
      return firstVisibleHeading.id
    }

    return null
  }

  useEffect(() => {
    if (headingIds.length === 0) return

    // Cache heading elements on mount
    headingElementsRef.current.clear()
    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        headingElementsRef.current.set(id, element)
      }
    })

    const updateActiveHeading = () => {
      const isAtBottomOfPage = (): boolean => {
        const footerHeight = getFooterHeight()
        return (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - footerHeight - 10
        )
      }

      if (isAtBottomOfPage() && headingIds.length > 0) {
        setActiveId(headingIds[headingIds.length - 1])
        return
      }

      const headerHeight = getHeaderHeight()
      const visibleHeadings = getVisibleHeadings(headingIds, headerHeight)
      const activeHeading = findActiveHeading(
        visibleHeadings,
        headerHeight,
        headingIds
      )

      setActiveId(activeHeading)
    }

    let rafId: number
    const debouncedUpdate = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveHeading)
    }

    updateActiveHeading()

    window.addEventListener('scroll', debouncedUpdate, { passive: true })
    window.addEventListener('resize', debouncedUpdate, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', debouncedUpdate)
      window.removeEventListener('resize', debouncedUpdate)
    }
  }, [headingIds])

  return activeId
}

export { useActiveHeading }
