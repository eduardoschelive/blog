import { LOCALES } from '@/constants/locale'
import type { Locale } from 'next-intl'
import { AboutClient } from '@/components/layout/About/AboutClient'
import { PERSONAL_INFO } from '@/constants/personal'
import { calculateYearsSince } from '@/utils/dates'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { generatePageMetadata, generateAlternates } from '@/utils/metadata'

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('Metadata.about')

  return generatePageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    keywords: [
      'Eduardo Schelive',
      'software engineer',
      'about',
      'biography',
      'career',
      'experience',
      'skills',
      'technologies',
    ],
    path: `/${locale}/${locale === 'en-US' ? 'about' : 'sobre'}`,
    alternates: generateAlternates('/about', '/sobre'),
    openGraph: {
      type: 'profile',
    },
  })
}

export default async function AboutPage({ params }: PageProps) {
  await params

  const yearsOfExperience = calculateYearsSince(PERSONAL_INFO.careerStart)

  return <AboutClient yearsOfExperience={yearsOfExperience} />
}
