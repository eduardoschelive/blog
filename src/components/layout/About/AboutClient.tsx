'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, CardHeader, Link } from '@heroui/react'
import { TbTools, TbBox, TbCode } from 'react-icons/tb'
import { PERSONAL_INFO } from '@/constants/personal'
import NextImage from 'next/image'
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl'
import { getBlurDataURL } from '@/utils/getBlurDataURL'
import { TiltCard } from '@/components/ui/TiltCard'

interface AboutClientProps {
  yearsOfExperience: number
}

function AboutClient({ yearsOfExperience }: AboutClientProps) {
  const t = useTranslations('AboutPage')
  const { name, links } = PERSONAL_INFO

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col [@media(min-width:960px)]:grid [@media(min-width:960px)]:grid-cols-2 gap-8 [@media(min-width:960px)]:gap-8 lg:gap-12 items-center">
            {/* Image - First on mobile, Second on desktop */}
            <div className="w-full flex justify-center [@media(min-width:960px)]:justify-end order-1 [@media(min-width:960px)]:order-2">
              <div className="[@media(min-width:960px)]:hidden w-full px-2 max-w-2xl mx-auto">
                <div className="relative w-full group">
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
                      sizes="(max-width: 960px) 100vw, 50vw"
                      className="rounded-2xl shadow-2xl w-full h-auto object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden [@media(min-width:960px)]:block">
                <TiltCard maxTilt={5}>
                  <div className="relative w-full max-w-lg group">
                    <div className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-primary rounded-2xl blur-md md:blur-lg opacity-50 group-hover:opacity-75 md:animate-pulse-slow transition-opacity duration-500" />

                    <div className="relative">
                      <NextImage
                        src={getCloudinaryUrl('profile', {
                          w: 600,
                          h: 650,
                          c: 'fill',
                          g: 'center',
                        })}
                        alt={name.full}
                        width={600}
                        height={650}
                        priority
                        placeholder="blur"
                        blurDataURL={getBlurDataURL(600, 650)}
                        sizes="448px"
                        className="rounded-2xl shadow-2xl w-full h-auto object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                      />
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Text - Second on mobile, First on desktop */}
            <div className="space-y-6 lg:space-y-8 order-2 [@media(min-width:960px)]:order-1">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-foreground/80 text-xl sm:text-2xl lg:text-3xl font-normal mb-2">
                    {t('greeting')}
                  </span>
                  <span className="block text-secondary">{name.full}</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-foreground/70 leading-relaxed">
                  {t('intro', { years: yearsOfExperience })}
                </p>

                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {t('experience')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-full shadow-lg hover:shadow-2xl bg-content2 border border-divider/20 hover:border-divider/40 transition-all duration-300">
              <CardHeader className="pb-2 flex-row items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TbTools className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  {t('curiosities.techstack.title')}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {t('curiosities.techstack.description')}
                </p>
              </CardBody>
            </Card>

            <Card className="h-full shadow-lg hover:shadow-2xl bg-content2 border border-divider/20 hover:border-divider/40 transition-all duration-300">
              <CardHeader className="pb-2 flex-row items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TbBox className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  {t('curiosities.minecraft.title')}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {t('curiosities.minecraft.description')}{' '}
                  <Link
                    href={links.skript}
                    isExternal
                    className="text-primary font-semibold underline"
                  >
                    {t('curiosities.minecraft.link')}
                  </Link>
                  . {t('curiosities.minecraft.continuation')}
                </p>
              </CardBody>
            </Card>

            <Card className="h-full shadow-lg hover:shadow-2xl bg-content2 border border-divider/20 hover:border-divider/40 transition-all duration-300">
              <CardHeader className="pb-2 flex-row items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TbCode className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  {t('curiosities.clipper.title')}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {t('curiosities.clipper.description')}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export { AboutClient }
