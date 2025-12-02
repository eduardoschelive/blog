import type { ComponentPropsWithoutRef } from 'react'

type MDXTableProps = ComponentPropsWithoutRef<'table'>
type MDXTheadProps = ComponentPropsWithoutRef<'thead'>
type MDXTbodyProps = ComponentPropsWithoutRef<'tbody'>
type MDXTrProps = ComponentPropsWithoutRef<'tr'>
type MDXThProps = ComponentPropsWithoutRef<'th'>
type MDXTdProps = ComponentPropsWithoutRef<'td'>

function MDXTable({ children, ...props }: MDXTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-divider bg-content1">
      <table className="w-full border-collapse text-left" {...props}>
        {children}
      </table>
    </div>
  )
}

function MDXThead({ children, ...props }: MDXTheadProps) {
  return (
    <thead className="bg-content2 border-b-2 border-divider" {...props}>
      {children}
    </thead>
  )
}

function MDXTbody({ children, ...props }: MDXTbodyProps) {
  return <tbody {...props}>{children}</tbody>
}

function MDXTr({ children, ...props }: MDXTrProps) {
  return (
    <tr className="border-b border-divider last:border-0" {...props}>
      {children}
    </tr>
  )
}

function MDXTh({ children, ...props }: MDXThProps) {
  return (
    <th
      className="px-4 py-3 text-left text-sm font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  )
}

function MDXTd({ children, ...props }: MDXTdProps) {
  return (
    <td className="px-4 py-3 text-sm text-foreground/90" {...props}>
      {children}
    </td>
  )
}

export { MDXTable, MDXThead, MDXTbody, MDXTr, MDXTh, MDXTd }
