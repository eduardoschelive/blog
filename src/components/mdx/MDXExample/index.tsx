import type { ReactNode } from 'react'
import { TbBook2 } from 'react-icons/tb'

interface MDXExampleProps {
  title: string
  children: ReactNode
  variant?: 'default'
}

const variantConfig = {
  default: {
    icon: TbBook2,
    iconColor: 'text-primary',
  },
}

export function MDXExample({
  title,
  children,
  variant = 'default',
}: MDXExampleProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div className="my-6 bg-content1 border-2 border-primary/30 rounded-xl overflow-hidden shadow-lg">
      <div className="px-4 py-3 bg-content2 border-b-2 border-primary/30 flex items-center gap-2">
        <Icon className={`${config.iconColor} text-xl`} strokeWidth={2} />
        <span className="text-base font-semibold text-foreground">{title}</span>
      </div>
      <div className="px-5 py-4 text-foreground/90 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
