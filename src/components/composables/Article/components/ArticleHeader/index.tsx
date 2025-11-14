'use client'

import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderDivider,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { ArticleMetadata } from '../ArticleMetadata'
import { useArticle } from '../../context'
import { HiDocumentText } from 'react-icons/hi2'

export function ArticleHeader() {
  const { article } = useArticle()

  return (
    <PageHeaderRoot>
      <PageHeaderTitle
        icon={
          <HiDocumentText className="text-primary text-4xl md:text-5xl lg:text-6xl" />
        }
      >
        {article.title}
      </PageHeaderTitle>

      <ArticleMetadata />

      {article.description && (
        <PageHeaderSubtitle>{article.description}</PageHeaderSubtitle>
      )}

      <PageHeaderDivider />
    </PageHeaderRoot>
  )
}
