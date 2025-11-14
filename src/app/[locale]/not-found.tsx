'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { Button } from '@heroui/react'
import { TbHome, TbBook, TbAlertCircle } from 'react-icons/tb'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import { RotateIn } from '@/components/animated/RotateIn'
import { FadeIn } from '@/components/animated/FadeIn'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <main className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 relative overflow-hidden">
      <BackgroundDecorations />

      <div className="w-full max-w-lg mx-auto text-center relative z-10">
        <RotateIn className="flex justify-center mb-4">
          <m.div className="relative">
            <m.div
              className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full blur-2xl opacity-30"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <TbAlertCircle className="w-12 h-12 md:w-16 md:h-16 text-primary relative z-10" />
          </m.div>
        </RotateIn>

        <FadeIn direction="up" delay={0.2} className="mb-3">
          <h1 className="text-7xl font-black text-primary">{t('errorCode')}</h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.4} className="mb-3">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {t('title')}
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <p className="text-xs md:text-sm text-foreground/70 max-w-md mx-auto mb-4 leading-relaxed">
            {t('description')}
          </p>
        </FadeIn>

        <FadeIn
          direction="up"
          delay={0.8}
          className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-6"
        >
          <Button
            as={Link}
            href="/"
            color="primary"
            size="md"
            startContent={<TbHome className="w-4 h-4" />}
            className="font-semibold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto sm:min-w-40"
          >
            {t('goHome')}
          </Button>

          <Button
            as={Link}
            href="/categories"
            variant="bordered"
            size="md"
            startContent={<TbBook className="w-4 h-4" />}
            className="font-semibold border-2 hover:scale-105 transition-transform w-full sm:w-auto sm:min-w-40"
          >
            {t('browseArticles')}
          </Button>
        </FadeIn>

        <div className="flex justify-center gap-4">
          <m.div
            className="w-1.5 h-1.5 bg-primary rounded-full opacity-60"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="w-1.5 h-1.5 bg-secondary rounded-full opacity-60"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              delay: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="w-1.5 h-1.5 bg-primary rounded-full opacity-60"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              delay: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </main>
  )
}
