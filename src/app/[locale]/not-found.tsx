'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@heroui/react'
import { TbHome, TbBook, TbAlertCircle } from 'react-icons/tb'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 pt-20 md:pt-32 overflow-hidden">
      <div className="w-full max-w-lg mx-auto text-center relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse-slow" />
            <TbAlertCircle className="w-12 h-12 md:w-16 md:h-16 text-primary relative z-10" />
          </div>
        </div>

        <h1 className="text-7xl font-black text-primary mb-3">
          {t('errorCode')}
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          {t('title')}
        </h2>

        <p className="text-xs md:text-sm text-foreground/70 max-w-md mx-auto mb-4 leading-relaxed">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
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
        </div>
      </div>
    </main>
  )
}
