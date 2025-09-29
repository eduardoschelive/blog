import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('About')

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                ES
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('whoAmI.title')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('whoAmI.description1')}
              </p>
              <p className="text-muted-foreground mb-4">
                {t('whoAmI.description2')}
              </p>
              <p className="text-muted-foreground">
                {t('whoAmI.description3')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                {t('expertise.title')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-muted-foreground">
                    {t('expertise.frontend')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-muted-foreground">
                    {t('expertise.backend')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-muted-foreground">
                    {t('expertise.devops')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-muted-foreground">
                    {t('expertise.mobile')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('experience.title')}</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    {t('experience.job1.title')}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {t('experience.job1.period')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t('experience.job1.company')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('experience.job1.description')}
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    {t('experience.job2.title')}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {t('experience.job2.period')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t('experience.job2.company')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('experience.job2.description')}
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    {t('experience.job3.title')}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {t('experience.job3.period')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t('experience.job3.company')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('experience.job3.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('techStack.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'Node.js',
                'Python',
                'Go',
                'Docker',
                'Kubernetes',
                'AWS',
                'PostgreSQL',
                'MongoDB',
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-card border rounded-lg p-3 text-center hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('contact.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:eduardo@schelive.com"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                {t('contact.email')}
              </a>
              <a
                href="https://linkedin.com/in/eduardoschelive"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

interface AboutPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = params

  return {
    title:
      locale === 'pt-BR'
        ? 'Sobre - Eduardo Schelive'
        : 'About - Eduardo Schelive',
    description:
      locale === 'pt-BR'
        ? 'Conheça Eduardo Schelive, desenvolvedor full-stack especializado em tecnologias modernas.'
        : 'Learn about Eduardo Schelive, a full-stack developer specialized in modern technologies.',
  }
}
