import { highlightCode } from '@/shiki/highlighter'
import { MDXTerminalClient } from './MDXTerminalClient'
import type { ReactNode } from 'react'
import './styles.css'

interface MDXTerminalProps {
  children: ReactNode
  prompt?: string
  output?: string
}

// Handle multi-line MDX content (when Terminal breaks across lines)
function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  // Handle nested React elements from MDX line breaks
  if (node && typeof node === 'object' && 'props' in node) {
    const element = node as { props?: { children?: ReactNode } }
    return element.props?.children ? getTextContent(element.props.children) : ''
  }
  return ''
}

async function MDXTerminal({
  children,
  prompt = '$',
  output,
}: MDXTerminalProps) {
  const command = getTextContent(children).trim()

  const [darkCommand, lightCommand] = await Promise.all([
    highlightCode(command, 'bash', 'tokyo-night'),
    highlightCode(command, 'bash', 'tokyo-night-light'),
  ])

  return (
    <MDXTerminalClient
      darkCommand={darkCommand}
      lightCommand={lightCommand}
      rawCommand={command}
      prompt={prompt}
      output={output}
    />
  )
}

export { MDXTerminal }
