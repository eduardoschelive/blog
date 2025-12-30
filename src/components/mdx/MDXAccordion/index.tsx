'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'

interface MDXAccordionProps {
  title: string
  children: ReactNode
}

export function MDXAccordion({ title, children }: MDXAccordionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="border border-divider rounded-lg p-4 my-4">
        <div className="text-base font-medium mb-2">{title}</div>
      </div>
    )
  }

  return (
    <Accordion variant="splitted" className="my-4 min-w-full">
      <AccordionItem
        key="1"
        aria-label={title}
        as="div"
        title={<span className="text-base font-medium">{title}</span>}
        classNames={{
          title: 'text-base font-medium',
        }}
      >
        {children}
      </AccordionItem>
    </Accordion>
  )
}
