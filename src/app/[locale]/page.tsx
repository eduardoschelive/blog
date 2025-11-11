import { Hero } from '@/components/layout/Hero'
import { ArticleList } from '@/components/layout/ArticleList'
import { CategoriesSidebar } from '@/components/layout/CategoriesSidebar'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <div className="w-full px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_1fr] gap-8 lg:gap-12">
            <div className="w-full">
              <ArticleList />
            </div>
            <CategoriesSidebar />
          </div>
        </div>
      </div>
    </>
  )
}
