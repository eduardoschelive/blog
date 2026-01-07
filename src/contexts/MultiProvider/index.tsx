import type { ComponentType, ReactNode } from 'react'

type ProviderProps = {
  children: ReactNode
}

type ProviderComponent = ComponentType<ProviderProps>

interface MultiProviderProps {
  providers: ProviderComponent[]
  children: ReactNode
}

function MultiProvider({ providers, children }: MultiProviderProps) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  )
}

export { MultiProvider }
