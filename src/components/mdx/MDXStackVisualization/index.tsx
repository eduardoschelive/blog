import type { ReactNode } from 'react'

interface StackVisualizationProps {
  title: string
  items: (number | string)[]
  incoming?: number | string
  outgoing?: boolean
  children?: ReactNode
}

export function MDXStackVisualization({
  title,
  items,
  incoming,
  outgoing = false,
  children,
}: StackVisualizationProps) {
  const displayItems = [...items].reverse()
  const itemsToShow = outgoing ? displayItems.slice(1) : displayItems

  return (
    <div className="my-8 w-full">
      <div className="bg-linear-to-br from-content1 to-content2 border border-divider rounded-xl p-6 w-full">
        <div className="text-warning font-mono text-sm font-semibold mb-5">
          {title}
        </div>

        <div className="flex flex-col items-center">
          {/* Outgoing (pop): top element shown leaving upward */}
          {outgoing && displayItems.length > 0 && (
            <>
              <div className="border-2 border-warning/30 rounded-lg px-8 py-3 text-center opacity-40 min-w-40 bg-content2">
                <div className="text-warning text-xs font-semibold font-mono mb-1">
                  top
                </div>
                <div className="text-success text-xl font-bold font-mono">
                  {displayItems[0]}
                </div>
              </div>
              <div className="text-warning/50 text-2xl my-1">↑</div>
            </>
          )}

          {incoming !== undefined && (
            <>
              <div className="border-2 border-primary rounded-lg px-8 py-3 text-center min-w-40 bg-content2">
                <div className="text-primary text-xs font-semibold font-mono mb-1">
                  incoming
                </div>
                <div className="text-success text-xl font-bold font-mono">
                  {incoming}
                </div>
              </div>
              <div className="text-primary/60 text-2xl my-1">↓</div>
            </>
          )}

          <div className="border-2 border-dashed border-warning/40 rounded-lg px-4 py-3 flex flex-col gap-2 min-w-[180px] w-full max-w-[280px]">
            {itemsToShow.map((item, index) => {
              const isTop = index === 0
              return (
                <div
                  key={index}
                  className={`rounded-lg px-8 py-3 text-center border-2 font-mono ${
                    isTop
                      ? 'bg-content2 border-warning'
                      : 'bg-content2 border-divider'
                  }`}
                >
                  {isTop && (
                    <div className="text-warning text-xs font-semibold mb-1">
                      top
                    </div>
                  )}
                  <div
                    className={`text-xl font-bold ${isTop ? 'text-warning' : 'text-success'}`}
                  >
                    {item}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {children && (
          <div className="font-mono text-foreground/70 text-center text-sm border-t border-divider pt-4 mt-5">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
