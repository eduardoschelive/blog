import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'
import type { ComponentProps } from 'react'

const {
  Link: OriginalLink,
  useRouter: originalUseRouter,
  redirect: originalRedirect,
  getPathname: originalGetPathname,
  usePathname,
} = createNavigation(routing)

/**
 * Navigation utilities with relaxed href typing.
 * Accepts both typed pathnames (with autocomplete) and dynamic strings.
 */

type OriginalLinkProps = ComponentProps<typeof OriginalLink>
export const Link = OriginalLink as React.ComponentType<
  Omit<OriginalLinkProps, 'href'> & {
    href: OriginalLinkProps['href'] | (string & {})
  }
>

type OriginalRouter = ReturnType<typeof originalUseRouter>
type RouterMethod<T extends 'push' | 'replace'> = (
  href: Parameters<OriginalRouter[T]>[0] | (string & {}),
  options?: Parameters<OriginalRouter[T]>[1]
) => void

export const useRouter = (): Omit<OriginalRouter, 'push' | 'replace'> & {
  push: RouterMethod<'push'>
  replace: RouterMethod<'replace'>
} => originalUseRouter() as ReturnType<typeof useRouter>

export const redirect = (
  href: Parameters<typeof originalRedirect>[0] | (string & {}),
  type?: Parameters<typeof originalRedirect>[1]
): never =>
  originalRedirect(href as Parameters<typeof originalRedirect>[0], type)

export const getPathname = (
  options: Omit<Parameters<typeof originalGetPathname>[0], 'href'> & {
    href: Parameters<typeof originalGetPathname>[0]['href'] | (string & {})
  }
): string =>
  originalGetPathname(options as Parameters<typeof originalGetPathname>[0])

export { usePathname }
