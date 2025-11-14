export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    standard: 0.6,
    slow: 1,
  },

  easing: {
    standard: [0.25, 0.46, 0.45, 0.94] as const,
    smooth: [0.25, 0.4, 0.25, 1] as const,
    bounce: 'easeInOut' as const,
  },

  distance: {
    small: 10,
    medium: 20,
    large: 40,
  },
} as const
