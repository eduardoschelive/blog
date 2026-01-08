import { generatedPathnames } from '@generated/pathnames'

const pathnames = {
  '/': '/',
  '/categories': { 'en-US': '/categories', 'pt-BR': '/categorias' },
  '/about': { 'en-US': '/about', 'pt-BR': '/sobre' },
  ...generatedPathnames,
}

type Pathname = keyof typeof pathnames

export { pathnames, type Pathname }
