import { routing } from '@/i18n/routing'
import { Providers } from '@/providers/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { Fira_Code } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { PERSONAL_INFO } from '@/constants/personal'
import '../globals.css'

const satoshi = localFont({
  src: [
    {
      path: '../../../public/fonts/Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-VariableItalic.woff2',
      weight: '300 900',
      style: 'italic',
    },
  ],
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${firaCode.variable} antialiased font-sans`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
