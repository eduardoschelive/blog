import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'

export const dynamic = 'force-static'
export const dynamicParams = false

type PageParams = {
  locale: Locale
}

interface PageProps {
  params: Promise<PageParams>
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function AboutPage({ params }: PageProps) {
  await params

  return <main className="container mx-auto px-4 py-8">WIP</main>
}
