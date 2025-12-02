import { routing } from '@/i18n/routing'
import { Providers } from '@/providers/Providers'
import { GoogleAnalyticsProvider } from '@/providers/GoogleAnalyticsProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { PERSONAL_INFO } from '@/constants/personal'
import { LOCALES } from '@/constants/locale'
import '../globals.css'
import { hasLocale, type Locale } from 'next-intl'

const satoshi = localFont({
  src: '../../../public/fonts/Satoshi-Variable-subset.woff2',
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const firaCode = localFont({
  src: '../../../public/fonts/FiraCode-Variable-subset.woff2',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

const { name } = PERSONAL_INFO

export const metadata: Metadata = {
  title: `${name.short} | Blog`,
  description: `A personal blog by ${name.short}`,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: `${name.short} | Blog`,
  },
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#1a1b26' },
    ],
  }
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale as Locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${firaCode.variable} antialiased font-sans`}
      >
        <GoogleAnalyticsProvider />
        <Providers>
          <BackgroundDecorations />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
