'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@heroui/react'
import { TbHome, TbRefresh, TbAlertTriangle } from 'react-icons/tb'
import { useEffect } from 'react'
import { BackgroundDecorations } from '@/components/ui/BackgroundDecorations'
import { FadeIn } from '@/components/animated/FadeIn'
import { ScaleIn } from '@/components/animated/ScaleIn'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorContent({ error, reset }: ErrorProps) {
  const t = useTranslations('Error')

  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 pt-20 md:pt-32 relative overflow-hidden">
      <BackgroundDecorations />

      <div className="w-full max-w-lg mx-auto text-center relative z-10">
        <ScaleIn delay={0} className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-danger to-warning rounded-full blur-2xl opacity-30 animate-pulse-slow" />
            <TbAlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-danger relative z-10" />
          </div>
        </ScaleIn>

        <FadeIn direction="up" delay={0.2}>
          <h1 className="text-5xl font-black text-danger mb-3">
            {t('errorCode')}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {t('title')}
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <p className="text-xs md:text-sm text-foreground/70 max-w-md mx-auto mb-4 leading-relaxed">
            {t('description')}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Button
              onPress={reset}
              color="danger"
              size="md"
              startContent={<TbRefresh className="w-4 h-4" />}
              className="font-semibold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto sm:min-w-40"
            >
              {t('tryAgain')}
            </Button>

            <Button
              as={Link}
              href="/"
              variant="bordered"
              size="md"
              startContent={<TbHome className="w-4 h-4" />}
              className="font-semibold border-2 hover:scale-105 transition-transform w-full sm:w-auto sm:min-w-40"
            >
              {t('goHome')}
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
