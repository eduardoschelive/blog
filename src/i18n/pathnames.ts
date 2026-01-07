import { generatedPathnames } from '@generated/pathnames'

const pathnames = {
  '/': { 'pt-BR': '/' },
  '/categories': { 'pt-BR': '/categorias' },
  '/about': { 'pt-BR': '/sobre' },
  ...generatedPathnames,
}

type Pathname = keyof typeof pathnames

export { pathnames, type Pathname }
