import type { HeadingNode, HeadingTree } from '@/types/heading.type'
import { slugfy } from '@/utils/slugfy'
import { useEffect, useState } from 'react'

function useHeadingTree() {
  const [headingTree, setHeadingTree] = useState<HeadingTree>()

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('h2, h3, h4')
    ) as HTMLElement[]

    if (elements.length === 0) return

    const nodes: Record<string, HeadingNode> = {}
    const rootIds: string[] = []
    const stack: { id: string; level: number }[] = []
    const idCount: Record<string, number> = {}

    elements.forEach((element) => {
      const baseText = element.innerText
      const slug = slugfy(baseText)

      let id = slug
      if (idCount[slug]) {
        id = `${slug}-${idCount[slug] + 1}`
        idCount[slug] += 1
      } else {
        idCount[slug] = 1
      }

      element.id = id

      const level = parseInt(element.tagName.substring(1))
      nodes[id] = { id, text: baseText, childIds: [], depth: level }

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      if (stack.length === 0) {
        rootIds.push(id)
      } else {
        const parentId = stack[stack.length - 1].id
        nodes[parentId].childIds.push(id)
      }

      stack.push({ id, level })
    })

    setHeadingTree({ nodes, rootIds })
  }, [])

  return { headingTree }
}

export { useHeadingTree as useHeadings }
