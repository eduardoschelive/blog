import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get('title') || 'Eduardo Schelive'
    const subtitle = searchParams.get('subtitle') || 'Software Engineer'
    const theme = searchParams.get('theme') || 'gradient'

    const colors = {
      background: '#1a1b26',
      foreground: '#c0caf5',
      primary: '#7aa2f7',
      secondary: '#bb9af7',
      accent: '#7dcfff',
      muted: '#565f89',
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              theme === 'gradient'
                ? `linear-gradient(135deg, ${colors.background} 0%, #24283b 50%, #1f2335 100%)`
                : colors.background,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 25% 25%, ${colors.primary}15 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, ${colors.secondary}15 0%, transparent 50%)`,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 48,
              zIndex: 1,
            }}
          >
            {/* Logo SVG */}
            <svg
              width="180"
              height="180"
              viewBox="0 0 512 512"
              style={{ display: 'flex' }}
            >
              <path
                d="M426.573 174.417L499.311 245.338C503.263 249.192 503.385 255.566 499.583 259.575L268.78 502.946C264.978 506.955 258.691 507.082 254.739 503.228L189.157 439.284C185.205 435.43 185.084 429.056 188.886 425.047L426.573 174.417Z"
                fill="#2A85F0"
              />
              <path
                d="M339.853 105.437C344.028 101.02 350.943 100.87 355.298 105.101L427.435 175.203L344.178 263.286L271.324 192.488C267.365 188.641 267.233 182.267 271.029 178.251L339.853 105.437Z"
                fill="#2A85F0"
              />
              <path
                d="M81.9398 338.135L10.8379 267.062C6.93319 263.159 6.85689 256.752 10.6674 252.751L243.394 8.43456C247.205 4.43424 253.459 4.35542 257.364 8.25854L321.396 72.2649C325.301 76.168 325.377 82.575 321.566 86.5754L81.9398 338.135Z"
                fill="#9E92E8"
              />
              <path
                d="M166.97 407.373C162.785 411.78 155.906 411.879 151.603 407.592L81.0945 337.346L163.725 250.311L234.234 320.557C238.536 324.844 238.632 331.891 234.448 336.299L166.97 407.373Z"
                fill="#9E92E8"
              />
            </svg>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <h1
                style={{
                  fontSize: '72px',
                  fontWeight: 700,
                  color: colors.foreground,
                  margin: 0,
                  textAlign: 'center',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 400,
                  color: colors.primary,
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.secondary} 100%)`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
