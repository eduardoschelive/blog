'use client'

import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { Link } from '@/i18n/navigation'
import type { CategoryWithArticles } from '@/types/category.type'
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CategoriesSidebarClientProps {
  categories: CategoryWithArticles[]
  title: string
  viewAllText: string
}

export function CategoriesSidebarClient({
  categories,
  title,
}: CategoriesSidebarClientProps) {
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
            {title}
          </AnimatedLink>
        </div>

        <ul>
          {categories.map((category, index) => (
            <m.li
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
                className="group flex items-start gap-2 py-2 hover:text-primary transition-colors duration-200"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    → {category.title}
                  </span>
                  <span className="text-xs text-foreground/40 ml-2">
                    ({category.articles.length})
                  </span>
                </div>
              </Link>
            </m.li>
          ))}
        </ul>
      </m.aside>
    </LazyMotion>
  )
}
