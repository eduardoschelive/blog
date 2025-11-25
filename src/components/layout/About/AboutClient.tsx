'use client'

import { useTranslations } from 'next-intl'
import { BlurText } from '@/components/animated/BlurText'
import { FadeIn } from '@/components/animated/FadeIn'
import { ScaleIn } from '@/components/animated/ScaleIn'
import { Stagger } from '@/components/animated/Stagger'
import { StaggerItem } from '@/components/animated/StaggerItem'
import { Card, CardBody, CardHeader, Link, Image } from '@heroui/react'
import { TbTools, TbBox, TbCode } from 'react-icons/tb'
import { PERSONAL_INFO } from '@/constants/personal'

interface AboutClientProps {
  yearsOfExperience: number
  photoUrl?: string
}

function AboutClient({ yearsOfExperience, photoUrl }: AboutClientProps) {
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

            {/* Right: Image */}
            <FadeIn direction="right" delay={0.5}>
              <div className="w-full flex justify-center lg:justify-end">
                {photoUrl ? (
                  <ScaleIn delay={0.3}>
                    <Image
                      src={photoUrl}
                      alt={name.full}
                      className="rounded-2xl shadow-2xl max-w-md w-full h-auto object-cover"
                      classNames={{
                        wrapper: 'max-w-md w-full',
                      }}
                    />
                  </ScaleIn>
                ) : (
                  <div className="max-w-md w-full aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl shadow-2xl flex items-center justify-center">
                    <p className="text-foreground/50 text-lg">
                      Photo coming soon
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Curiosities Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <Stagger delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Curiosity 1: Early Start */}
              <StaggerItem direction="up">
                <Card className="h-full shadow-lg">
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

              {/* Curiosity 2: Minecraft Origins */}
              <StaggerItem direction="up">
                <Card className="h-full shadow-lg">
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

              {/* Curiosity 3: Clipper */}
              <StaggerItem direction="up">
                <Card className="h-full shadow-lg">
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
