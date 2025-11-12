'use client'

import { useCategoryCard } from './CategoryCardRoot'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { useTranslations } from 'next-intl'

export function CategoryCardFooter() {
  const { category } = useCategoryCard()
  const t = useTranslations('Categories')
  const categoryUrl = `/categories/${category.slug}`

  return (
    <div className="mt-auto">
      <AnimatedLink
        href={categoryUrl}
        className="text-base text-primary font-medium"
      >
        {t('viewFullTrail')}
      </AnimatedLink>
    </div>
  )
}
