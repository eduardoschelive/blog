import { useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'

interface UseThemeAnimationProps {
  duration?: number
  onToggle: () => void
}

export const useThemeAnimation = ({
  duration = 400,
  onToggle,
}: UseThemeAnimationProps) => {
  const ref = useRef<HTMLButtonElement>(null)

  const toggleWithAnimation = useCallback(async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onToggle()
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        onToggle()
      })
    }).ready

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }, [onToggle, duration])

  return {
    ref,
    toggleWithAnimation,
  }
}
