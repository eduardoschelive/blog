import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'
import { AboutClient } from '@/components/layout/About/AboutClient'
import { PERSONAL_INFO } from '@/constants/personal'
import { calculateYearsSince } from '@/utils/dates'

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

  const yearsOfExperience = calculateYearsSince(PERSONAL_INFO.careerStart)

  return <AboutClient yearsOfExperience={yearsOfExperience} />
}
