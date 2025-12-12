'use client'

import { useTheme } from 'next-themes'
import { TerminalActions } from './TerminalActions'
import { useMemo } from 'react'

interface MDXTerminalClientProps {
  darkCommand: string
  lightCommand: string
  rawCommand: string
  prompt: string
  output?: string
}

export function MDXTerminalClient({
  darkCommand,
  lightCommand,
  rawCommand,
  prompt,
  output,
}: MDXTerminalClientProps) {
  const { theme } = useTheme()
  const command = useMemo(
    () => (theme === 'light' ? lightCommand : darkCommand),
    [theme, lightCommand, darkCommand]
  )

  return (
    <div className="bg-content1 rounded-lg shadow-lg overflow-hidden not-prose my-6 border border-divider">
      <div className="flex items-center justify-between px-4 py-3 bg-content2">
        <span className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-danger block shrink-0"></span>
          <span className="w-3 h-3 rounded-full bg-warning block shrink-0"></span>
          <span className="w-3 h-3 rounded-full bg-success block shrink-0"></span>
        </span>
        <TerminalActions command={rawCommand} />
      </div>
      <div className="p-4 font-mono text-sm terminal-content">
        <div className="flex items-start gap-2">
          <span
            className="text-success select-none shrink-0"
            aria-hidden="true"
          >
            {prompt}
          </span>
          <code
            className="grow min-w-0"
            aria-label="Terminal command"
            dangerouslySetInnerHTML={{ __html: command }}
          />
        </div>
        {output && (
          <div className="mt-2 text-foreground/70 whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  )
}
