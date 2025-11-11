'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface HomePageClientProps {
  children: ReactNode
}

export function HomePageClient({ children }: HomePageClientProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 15,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <LazyMotion features={domAnimation} strict>
          <m.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-linear-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-linear-to-br from-secondary/20 via-secondary/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-linear-to-br from-primary/15 via-secondary/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Additional light beams */}
          <m.div
            className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-linear-to-br from-primary/10 to-transparent rounded-full blur-2xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <m.div
            className="absolute bottom-1/3 left-2/3 w-[350px] h-[350px] bg-linear-to-br from-secondary/10 to-transparent rounded-full blur-2xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12,
              delay: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating particles */}
          {particles.map((particle) => {
            const isLarge = particle.size > 4
            const isPrimary = particle.id % 2 === 0

            return (
              <m.div
                key={particle.id}
                className={`absolute rounded-full ${
                  isLarge
                    ? 'bg-linear-to-br from-primary/40 via-secondary/30 to-primary/20'
                    : isPrimary
                      ? 'bg-primary/40'
                      : 'bg-secondary/40'
                }`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: isLarge
                    ? `0 0 ${particle.size * 2}px ${isPrimary ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--secondary), 0.3)'}`
                    : 'none',
                }}
                animate={{
                  y: [0, -200, 0],
                  x: [0, Math.random() * 80 - 40, 0],
                  opacity: [0, isLarge ? 0.8 : 0.6, 0],
                  scale: [0, isLarge ? 1.5 : 1, 0],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </LazyMotion>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
