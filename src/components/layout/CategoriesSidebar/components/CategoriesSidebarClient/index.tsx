'use client'

import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { Link } from '@/i18n/navigation'
import type { CategoryWithArticles } from '@/types/category.type'
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

interface CategoriesSidebarClientProps {
  categories: CategoryWithArticles[]
}

export function CategoriesSidebarClient({
  categories,
}: CategoriesSidebarClientProps) {
  const t = useTranslations('HomePage.categories')
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
    margin: '0px 0px -100px 0px',
  })

  return (
    <LazyMotion features={domAnimation} strict>
      <m.aside
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        className="hidden lg:block sticky top-20 lg:top-24 self-start"
        style={{ marginTop: 'calc(3rem + 3rem)' }}
      >
        <div className="flex items-center mb-6">
          <AnimatedLink
            href="/categories"
            className="text-2xl font-semibold hover:text-primary transition-colors duration-200"
          >
            {t('title')}
          </AnimatedLink>
        </div>

        <div className="space-y-3">
          {categories.map((category, index) => (
            <m.div
              key={category.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{
                duration: 0.3,
                delay: isInView ? index * 0.1 : 0,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link
                // @ts-expect-error - Dynamic routes are valid but TypeScript can't infer them
                href={`/categories/${category.slug}`}
                className="group block border-l-2 border-secondary/40 hover:border-primary pl-4 py-2 transition-all duration-300"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1 min-w-0">
                  <h3 className="text-foreground group-hover:text-primary transition-colors duration-200 font-semibold truncate flex-1 min-w-0">
                    {category.title}
                  </h3>
                  <span className="text-xs text-foreground/40 group-hover:text-secondary transition-colors duration-200 tabular-nums shrink-0">
                    {category.articles.length}
                  </span>
                </div>
                <p className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-200 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            </m.div>
          ))}
        </div>
      </m.aside>
    </LazyMotion>
  )
}
