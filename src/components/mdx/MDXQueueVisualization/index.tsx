import type { ReactNode } from 'react'

interface QueueVisualizationProps {
  title: string
  items: (number | string)[]
  incoming?: number | string
  outgoing?: boolean
  children?: ReactNode
}

export function MDXQueueVisualization({
  title,
  items,
  incoming,
  outgoing = false,
  children,
}: QueueVisualizationProps) {
  const outgoingItem = outgoing && items.length > 0 ? items[0] : null
  const displayItems = outgoing ? items.slice(1) : [...items]

  return (
    <div className="my-8 w-full">
      <div className="bg-linear-to-br from-content1 to-content2 border border-divider rounded-xl p-6 w-full">
        <div className="text-primary font-mono text-sm font-semibold mb-5">
          {title}
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {outgoing && outgoingItem !== null && outgoingItem !== undefined && (
            <>
              <div className="border-2 border-primary/30 rounded-lg px-6 py-3 text-center opacity-40 bg-content2">
                <div className="text-primary text-xs font-semibold font-mono mb-1">
                  front
                </div>
                <div className="text-success text-xl font-bold font-mono">
                  {outgoingItem}
                </div>
              </div>
              <div className="text-primary/50 text-2xl">←</div>
            </>
          )}

          {/* Queue body */}
          <div className="border-2 border-dashed border-primary/40 rounded-lg px-4 py-3 flex flex-row gap-2 overflow-x-auto">
            {displayItems.length === 0 ? (
              <div className="text-foreground/30 font-mono text-sm italic px-4 py-2">
                empty
              </div>
            ) : (
              displayItems.map((item, index) => {
                const isFront = index === 0
                const isRear = index === displayItems.length - 1
                const isBoth = isFront && isRear

                return (
                  <div
                    key={index}
                    className={`rounded-lg px-6 py-3 text-center border-2 font-mono ${
                      isFront
                        ? 'bg-content2 border-primary'
                        : isRear
                          ? 'bg-content2 border-warning'
                          : 'bg-content2 border-divider'
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold mb-1 ${
                        isBoth
                          ? 'text-primary'
                          : isFront
                            ? 'text-primary'
                            : isRear
                              ? 'text-warning'
                              : 'opacity-0'
                      }`}
                    >
                      {isBoth
                        ? 'front / rear'
                        : isFront
                          ? 'front'
                          : isRear
                            ? 'rear'
                            : '·'}
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        isFront
                          ? 'text-primary'
                          : isRear
                            ? 'text-warning'
                            : 'text-success'
                      }`}
                    >
                      {item}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {incoming !== undefined && (
            <>
              <div className="text-warning/60 text-2xl">←</div>
              <div className="border-2 border-warning rounded-lg px-6 py-3 text-center bg-content2">
                <div className="text-warning text-xs font-semibold font-mono mb-1">
                  incoming
                </div>
                <div className="text-success text-xl font-bold font-mono">
                  {incoming}
                </div>
              </div>
            </>
          )}
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
