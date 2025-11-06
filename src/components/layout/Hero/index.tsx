'use client'

import { Link } from '@/i18n/navigation'
import type { CategoryBase } from '@/types/category'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
} from '@heroui/react'
import { useTranslations } from 'next-intl'
import { FiArrowDown } from 'react-icons/fi'

interface ArticleCard {
  title: string
  description?: string
  slug: string
  coverImage?: string
  category: CategoryBase
  createdAt: Date | null
}

interface HeroProps {
  latestArticle?: ArticleCard
}

function Hero({ latestArticle }: HeroProps) {
  const t = useTranslations('Hero')

  const scrollToContent = () => {
    const heroHeight = window.innerHeight
    const headerHeight = document.getElementById('header')?.offsetHeight || 64
    window.scrollTo({
      top: heroHeight - headerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-lg lg:text-xl text-foreground/70 font-medium">
                  {t('greeting')}
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Eduardo
                </span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Guiraldelli
                </span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Schelive
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                href="/about"
                color="primary"
                size="lg"
                className="font-semibold shadow-lg shadow-primary/25"
              >
                {t('aboutButton')}
              </Button>
              <Button
                as={Link}
                href="/categories"
                variant="bordered"
                size="lg"
                className="font-semibold border-2"
              >
                {t('articlesButton')}
              </Button>
            </div>
          </div>

          {latestArticle && (
            <div className="w-full">
              <div className="mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest">
                  {t('latestArticle')}
                </span>
              </div>

              {/* Article Card */}
              <div className="relative group">
                <Card className="relative w-full shadow-[0_20px_50px_rgba(var(--primary),0.3)] hover:scale-[1.02] transition-all duration-300 drop-shadow-2xl hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]">
                  {latestArticle.coverImage ? (
                    <Image
                      src={latestArticle.coverImage}
                      alt={latestArticle.title}
                      className="w-full h-56 object-cover"
                      classNames={{
                        wrapper: 'w-full',
                      }}
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/20 flex items-center justify-center relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: '32px 32px',
                        }}
                      />
                      <div className="text-center relative z-10">
                        <div className="text-6xl mb-3">📰</div>
                        <div className="text-sm text-foreground/60 uppercase tracking-wider font-bold">
                          {latestArticle.category.title}
                        </div>
                      </div>
                    </div>
                  )}

                  <Divider />

                  <CardHeader className="pb-0 pt-6 px-6 flex-col items-start gap-3">
                    <Chip
                      as={Link}
                      // @ts-expect-error - Dynamic routes are valid
                      href={`/categories/${latestArticle.category.slug}`}
                      color="primary"
                      variant="flat"
                      size="md"
                      className="cursor-pointer hover:scale-105 transition-transform font-sans"
                    >
                      {latestArticle.category.title}
                    </Chip>
                    <h3 className="text-2xl font-bold leading-tight line-clamp-2">
                      {latestArticle.title}
                    </h3>
                  </CardHeader>

                  {/* Description */}
                  <CardBody className="px-6 py-4">
                    {latestArticle.description && (
                      <p className="text-foreground/70 line-clamp-3 leading-relaxed">
                        {latestArticle.description}
                      </p>
                    )}
                  </CardBody>
                  <CardFooter className="px-6 pb-6">
                    <Link
                      // @ts-expect-error - Dynamic routes are valid
                      href={`/categories/${latestArticle.category.slug}/articles/${latestArticle.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all hover:underline hover-group"
                    >
                      <span>{t('readMore')}</span>
                      <span className="transition-transform hover-group:translate-x-1">
                        →
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        onPress={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group hover:scale-110 transition-transform rounded-full"
        aria-label={t('scrollDown')}
        variant="light"
        isIconOnly
      >
        <FiArrowDown className="w-8 h-8 text-primary animate-bounce" />
      </Button>
    </section>
  )
}

export { Hero }
