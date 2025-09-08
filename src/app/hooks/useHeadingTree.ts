import type { HeadingNode, HeadingTree } from '@/types/heading.type'
import { useEffect, useState } from 'react'

function useHeadingTree() {
  const [headingTree, setHeadingTree] = useState<HeadingTree>()

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ) as HTMLElement[]

    if (elements.length === 0) return

    const nodes: Record<string, HeadingNode> = {}
    const rootIds: string[] = []
    const stack: { id: string; level: number }[] = []
    const idCount: Record<string, number> = {}

    elements.forEach((element) => {
      const baseText = element.innerText
      const baseId = baseText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      // Ensure unique ID
      let id = baseId
      if (idCount[baseId]) {
        id = `${baseId}-${idCount[baseId] + 1}`
        idCount[baseId] += 1
      } else {
        idCount[baseId] = 1
      }

      element.id = id

      const level = parseInt(element.tagName.substring(1))
      nodes[id] = { id, text: baseText, childIds: [], depth: level }

      // Find parent in stack
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
