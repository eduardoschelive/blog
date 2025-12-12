/**
 * Shared OG image generation styles and utilities
 */

export const OG_COLORS = {
  background: '#1a1b26',
  foreground: '#c0caf5',
  primary: '#7aa2f7',
  secondary: '#bb9af7',
  accent: '#7dcfff',
  muted: '#565f89',
} as const

export const OG_GRADIENTS = {
  background: (colors: typeof OG_COLORS) =>
    `linear-gradient(135deg, ${colors.background} 0%, #24283b 50%, #1f2335 100%)`,
  radial: (colors: typeof OG_COLORS) =>
    `radial-gradient(circle at 25% 25%, ${colors.primary}15 0%, transparent 50%),
     radial-gradient(circle at 75% 75%, ${colors.secondary}15 0%, transparent 50%)`,
  darkOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
} as const

export const OG_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const
