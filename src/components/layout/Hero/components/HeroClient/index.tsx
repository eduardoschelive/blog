'use client'

import { Link } from '@/i18n/navigation'
import {
  ArticleRoot,
  ArticleImage,
  ArticleCategory,
  ArticleTitle,
  ArticleDescription,
  ArticleLink,
} from '@/components/composables/Article'
import { HoverCard } from '@/components/ui/HoverCard'
import type { Article } from '@/types/article.type'
import { PERSONAL_INFO } from '@/constants/personal'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@heroui/react'
import { TbArrowDown } from 'react-icons/tb'
import { useScroll } from '@/hooks/useScroll'
import { useTranslations } from 'next-intl'
import NextImage from 'next/image'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'
import { getBlurDataURL } from '@/utils/getBlurDataURL'

interface HeroClientProps {
  article: Article
}

function HeroClient({ article }: HeroClientProps) {
  const { scrollToNextPage } = useScroll()
  const t = useTranslations('Hero')
  const { name } = PERSONAL_INFO

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="lg:hidden w-full flex justify-center -mx-4 sm:mx-0">
            <div className="relative w-full sm:w-56 group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-primary rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

              <div className="relative">
                <NextImage
                  src={getCloudinaryUrl('profile', {
                    w: 600,
                    h: 450,
                    c: 'fill',
                    g: 'face',
                  })}
                  alt={name.full}
                  width={600}
                  height={450}
                  priority
                  placeholder="blur"
                  blurDataURL={getBlurDataURL(600, 450)}
                  sizes="(max-width: 640px) 100vw, 224px"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground/80 text-xl sm:text-2xl lg:text-3xl font-normal mb-2">
                  {t('greeting')}
                </span>
                <span className="block text-secondary">{name.full}</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-foreground/70 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                as={Link}
                href="/about"
                color="primary"
                size="lg"
                className="font-semibold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
              >
                {t('aboutButton')}
              </Button>
              <Button
                as={Link}
                href="/categories"
                variant="bordered"
                size="lg"
                className="font-semibold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
              >
                {t('articlesButton')}
              </Button>
            </div>
          </div>

          <ArticleRoot article={article}>
            <div className="w-full mt-8 lg:mt-0">
              <p className="mb-4 text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">
                {t('featuredArticle')}
              </p>

              <div className="relative">
                <HoverCard>
                  <Card className="relative w-full shadow-lg drop-shadow">
                    <ArticleImage />

                    <Divider />

                    <CardHeader className="pb-0 pt-4 sm:pt-6 px-4 sm:px-6 flex-col items-start gap-2 sm:gap-3">
                      <ArticleCategory asChip asLink />
                      <ArticleTitle className="text-xl sm:text-2xl font-bold leading-tight line-clamp-2" />
                    </CardHeader>

                    <CardBody className="px-4 sm:px-6 py-3 sm:py-4">
                      <ArticleDescription className="text-sm sm:text-base text-foreground/70 line-clamp-3 leading-relaxed" />
                    </CardBody>

                    <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <ArticleLink className="text-sm sm:text-base text-primary font-bold">
                        {t('readMore')}
                      </ArticleLink>
                    </CardFooter>
                  </Card>
                </HoverCard>
              </div>
            </div>
          </ArticleRoot>
        </div>
      </div>

      <Button
        onPress={scrollToNextPage}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group hover:scale-110 transition-transform rounded-full"
        aria-label={t('scrollDown')}
        variant="light"
        isIconOnly
        radius="none"
        data-hover="false"
      >
        <TbArrowDown className="w-8 h-8 text-primary animate-bounce" />
      </Button>
    </section>
  )
}

export { HeroClient }
