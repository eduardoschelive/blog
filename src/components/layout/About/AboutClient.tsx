'use client'

import { useTranslations } from 'next-intl'
import { BlurText } from '@/components/animated/BlurText'
import { FadeIn } from '@/components/animated/FadeIn'
import { Stagger } from '@/components/animated/Stagger'
import { StaggerItem } from '@/components/animated/StaggerItem'
import { Card, CardBody, CardHeader, Link } from '@heroui/react'
import { TbTools, TbBox, TbCode } from 'react-icons/tb'
import { PERSONAL_INFO } from '@/constants/personal'
import { ImageCDN } from '@/components/ui/ImageCDN'
import { ScaleIn } from '@/components/animated/ScaleIn'
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <BlurText
                    text={t('greeting')}
                    className="block text-foreground/80 text-xl sm:text-2xl lg:text-3xl font-normal mb-2"
                    direction="top"
                    delay={30}
                    animateBy="letters"
                  />
                  <BlurText
                    text={name.full}
                    className="block text-secondary"
                    direction="bottom"
                    delay={50}
                    animateBy="words"
                  />
                </h1>

                <FadeIn direction="up" delay={0.4}>
                  <p className="text-base sm:text-lg lg:text-xl text-foreground/70 leading-relaxed">
                    {t('intro', { years: yearsOfExperience })}
                  </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.6}>
                  <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                    {t('experience')}
                  </p>
                </FadeIn>
              </div>
            </div>

            <FadeIn direction="right" delay={0.5}>
              <div className="w-full flex justify-center lg:justify-end">
                <ScaleIn delay={0.3}>
                  <TiltCard maxTilt={15}>
                    <div className="relative max-w-md w-full group">
                      {/* Animated gradient background */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-md md:blur-lg opacity-50 group-hover:opacity-75 md:animate-pulse-slow transition-opacity duration-500" />

                      {/* Image container */}
                      <div className="relative">
                        <ImageCDN
                          filename="profile"
                          alt={name.full}
                          transformations={{
                            w: 800,
                            h: 1000,
                            c: 'fill',
                            g: 'auto',
                            f: 'webp',
                            q: 'auto',
                            dpr: 'auto',
                          }}
                          className="rounded-2xl shadow-2xl w-full h-auto object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                          classNames={{
                            wrapper: 'w-full',
                          }}
                        />
                      </div>
                    </div>
                  </TiltCard>
                </ScaleIn>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <Stagger delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem direction="up">
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
              </StaggerItem>

              <StaggerItem direction="up">
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
              </StaggerItem>

              <StaggerItem direction="up">
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
              </StaggerItem>
            </div>
          </Stagger>
        </div>
      </section>
    </div>
  )
}

export { AboutClient }
