import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/layout/Hero'

export default async function HomePage() {
  return (
    <>
      <Header />
      <main className="font-sans bg-background">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
