import { routing } from '@/i18n/routing'
import { Providers } from '@/providers/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Fira_Code } from 'next/font/google'
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
})

const firaCode = Fira_Code({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name.short} | Blog`,
  description: `A personal blog by ${PERSONAL_INFO.name.short}`,
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
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
