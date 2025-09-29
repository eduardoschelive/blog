import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text animate-pulse">
              404
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {t('goHome')}
            </Link>

            <Link
              href="/categories"
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {t('browseCategories')}
            </Link>
          </div>

          <div className="mt-12">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                <div className="absolute top-0 left-0 w-24 h-24 border-4 border-blue-500 rounded-full animate-ping"></div>
                <div className="absolute top-2 left-2 w-20 h-20 border-4 border-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>🤖 {t('suggestion')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
