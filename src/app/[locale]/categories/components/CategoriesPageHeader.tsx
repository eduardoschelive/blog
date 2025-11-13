import { PageHeader } from '@/components/ui/PageHeader'
import { BiSolidCategory } from 'react-icons/bi'

interface CategoriesPageHeaderProps {
  title: string
  subtitle: string
}

export function CategoriesPageHeader({
  title,
  subtitle,
}: CategoriesPageHeaderProps) {
  return (
    <PageHeader
      icon={
        <BiSolidCategory className="text-primary text-4xl md:text-5xl lg:text-6xl" />
      }
      title={title}
      subtitle={subtitle}
    />
  )
}
