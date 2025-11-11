import { Hero } from '@/components/layout/Hero'
import { ArticleList } from '@/components/layout/ArticleList'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <ArticleList />
    </>
  )
}
