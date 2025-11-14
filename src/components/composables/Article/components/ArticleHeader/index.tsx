'use client'

import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from '@/components/composables/PageHeader'
import { AnimatedDivider } from '@/components/ui/AnimatedDivider'
import { ArticleMetadata } from '../ArticleMetadata'
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

      <ArticleMetadata />

      {article.description && (
        <PageHeaderSubtitle>{article.description}</PageHeaderSubtitle>
      )}

      <AnimatedDivider />
    </PageHeaderRoot>
  )
}
