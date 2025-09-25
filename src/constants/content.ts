import path from 'node:path'

export const CONTENT_DIR = path.join(process.cwd(), '/content')
export const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles')
export const CATEGORIES_DIR = path.join(CONTENT_DIR, 'categories')
