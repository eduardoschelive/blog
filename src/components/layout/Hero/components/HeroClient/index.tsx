'use client'

import { Link } from '@/i18n/navigation'
import { BlurText } from '@/components/ui/BlurText'
import {
  ArticleRoot,
  ArticleImage,
  ArticleCategory,
  ArticleTitle,
  ArticleDescription,
  ArticleLink,
} from '@/components/layout/ArticleCard'
import type { Article } from '@/types/article.type'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@heroui/react'
import { FiArrowDown } from 'react-icons/fi'
import { useScroll } from '@/hooks/useScroll'
import { useTranslations } from 'next-intl'

interface HeroClientProps {
  article?: Article
}

function HeroClient({ article }: HeroClientProps) {
  const { scrollToNextPage } = useScroll()
  const t = useTranslations('Hero')

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <BlurText
                  text={t('greeting')}
                  className="block text-foreground/80 text-2xl lg:text-3xl font-normal mb-2"
                  direction="top"
                  delay={30}
                  animateBy="letters"
                />
                <BlurText
                  text="Eduardo Guiraldelli Schelive"
                  className="block bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-size:200%_auto"
                  direction="bottom"
                  delay={50}
                  animateBy="words"
                />
              </h1>
              <BlurText
                text={t('subtitle')}
                className="text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-xl"
                direction="bottom"
                delay={25}
                animateBy="words"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                href="/about"
                color="primary"
                size="lg"
                className="font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                {t('aboutButton')}
              </Button>
              <Button
                as={Link}
                href="/categories"
                variant="bordered"
                size="lg"
                className="font-semibold border-2 hover:scale-105 transition-transform"
              >
                {t('articlesButton')}
              </Button>
            </div>
          </div>

          <ArticleRoot article={article}>
            <div className="w-full">
              <BlurText
                text={t('latestArticle')}
                className="mb-4 text-sm font-bold text-primary uppercase tracking-widest"
                direction="bottom"
                delay={40}
                animateBy="letters"
              />

              <LazyMotion features={domAnimation} strict>
                <m.div
                  className="relative"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Card className="relative w-full transition-all duration-300 shadow-lg drop-shadow hover:scale-105">
                    <ArticleImage showPattern />

                    <Divider />

                    <CardHeader className="pb-0 pt-6 px-6 flex-col items-start gap-3">
                      <ArticleCategory asChip asLink />
                      <ArticleTitle className="text-2xl font-bold leading-tight line-clamp-2" />
                    </CardHeader>

                    <CardBody className="px-6 py-4">
                      <ArticleDescription className="text-foreground/70 line-clamp-3 leading-relaxed" />
                    </CardBody>

                    <CardFooter className="px-6 pb-6">
                      <ArticleLink className="text-primary font-bold">
                        {t('readMore')}
                      </ArticleLink>
                    </CardFooter>
                  </Card>
                </m.div>
              </LazyMotion>
            </div>
          </ArticleRoot>
        </div>
      </div>

      <Button
        onPress={scrollToNextPage}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group hover:scale-110 transition-transform rounded-full"
        aria-label={t('scrollDown')}
        variant="light"
        isIconOnly
        radius="none"
        data-hover="false"
      >
        <FiArrowDown className="w-8 h-8 text-primary animate-bounce" />
      </Button>
    </section>
  )
}

export { HeroClient }
