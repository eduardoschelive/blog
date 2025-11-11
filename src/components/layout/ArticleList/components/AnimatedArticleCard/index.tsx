'use client'

import type { Article } from '@/types/article.type'
import {
  ArticleCategory,
  ArticleDate,
  ArticleDescription,
  ArticleImage,
  ArticleLink,
  ArticleRoot,
  ArticleTitle,
} from '@/components/layout/ArticleCard'
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

interface AnimatedArticleCardProps {
  article: Article
}

function AnimatedArticleCard({ article }: AnimatedArticleCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, margin: '0px 0px -100px 0px' })
  const t = useTranslations('HomePage.latest')

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={ref}
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <ArticleRoot
          article={article}
          className="group bg-content1 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-divider/20 hover:border-divider/40"
        >
          <div className="grid md:grid-cols-[300px_1fr] gap-0">
            <div className="relative overflow-hidden w-full h-48 md:h-full">
              <ArticleImage
                height="h-full w-full"
                imageClassName="group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
                imageProps={{
                  classNames: {
                    wrapper: '!max-w-full h-full w-full',
                    img: 'h-full w-full object-cover',
                  },
                }}
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div className="flex-1">
                <div className="mb-3">
                  <ArticleCategory asChip />
                </div>

                <ArticleTitle
                  as="h3"
                  className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                />

                <ArticleDescription className="text-sm md:text-base mb-4 line-clamp-3" />

                <div className="mb-6">
                  <ArticleDate className="text-xs text-foreground/50" />
                </div>
              </div>
              <ArticleLink className="text-primary font-semibold">
                {t('readMore')}
              </ArticleLink>
            </div>
          </div>
        </ArticleRoot>
      </m.div>
    </LazyMotion>
  )
}

export { AnimatedArticleCard }
