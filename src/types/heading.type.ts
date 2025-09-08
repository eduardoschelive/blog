interface HeadingNode {
  id: string
  text: string
  childIds: string[]
  depth: number
}

interface HeadingTree {
  nodes: Record<string, HeadingNode>
  rootIds: string[]
}

export type { HeadingNode, HeadingTree }
