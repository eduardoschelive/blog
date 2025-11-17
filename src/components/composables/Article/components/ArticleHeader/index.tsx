'use client'

import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { ArticleMetadata } from '../ArticleMetadata'
import { ArticleReadingTime } from '../ArticleReadingTime'
import { useArticle } from '../../context'
import { TbFileText } from 'react-icons/tb'

export function ArticleHeader() {
  const { article } = useArticle()

  return (
    <PageHeaderRoot>
      <PageHeaderTitle
        icon={
          <TbFileText className="text-primary text-4xl md:text-5xl lg:text-6xl" />
        }
      >
        {article.title}
      </PageHeaderTitle>

      <div className="mb-6">
        <ArticleReadingTime />
      </div>

      <ArticleMetadata />

      {article.description && (
        <PageHeaderSubtitle>{article.description}</PageHeaderSubtitle>
      )}
    </PageHeaderRoot>
  )
}
