'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { Button } from '@heroui/react'
import { FiHome, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi'
import { useEffect } from 'react'
import { BackgroundDecorations } from '@/components/layout/BackgroundDecorations'

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
    <main className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 relative overflow-hidden">
      <BackgroundDecorations />

      <div className="w-full max-w-lg mx-auto text-center relative z-10">
        <m.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
          transition={{
            scale: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
            rotate: {
              duration: 0.8,
              delay: 0.6,
              ease: 'easeInOut',
            },
          }}
          className="flex justify-center mb-4"
        >
          <m.div className="relative">
            <m.div
              className="absolute inset-0 bg-linear-to-r from-danger to-warning rounded-full blur-2xl opacity-30"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <FiAlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-danger relative z-10" />
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-3"
        >
          <h1 className="text-5xl font-black text-danger">{t('errorCode')}</h1>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-3"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {t('title')}
          </h2>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-xs md:text-sm text-foreground/70 max-w-md mx-auto mb-4 leading-relaxed"
        >
          {t('description')}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-6"
        >
          <Button
            onPress={reset}
            color="danger"
            size="md"
            startContent={<FiRefreshCw className="w-4 h-4" />}
            className="font-semibold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto sm:min-w-40"
          >
            {t('tryAgain')}
          </Button>

          <Button
            as={Link}
            href="/"
            variant="bordered"
            size="md"
            startContent={<FiHome className="w-4 h-4" />}
            className="font-semibold border-2 hover:scale-105 transition-transform w-full sm:w-auto sm:min-w-40"
          >
            {t('goHome')}
          </Button>
        </m.div>

        <div className="flex justify-center gap-4">
          <m.div
            className="w-1.5 h-1.5 bg-danger rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="w-1.5 h-1.5 bg-warning rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              delay: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="w-1.5 h-1.5 bg-danger rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              delay: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </main>
  )
}
