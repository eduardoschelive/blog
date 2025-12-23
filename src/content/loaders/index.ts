import { ArticleContentLoader } from './ArticleContentLoader'
import { CategoryContentLoader } from './CategoryContentLoader'

/**
 * Singleton instances of content loaders
 * Cached to avoid creating multiple instances
 */
export const articleLoader = new ArticleContentLoader()
export const categoryLoader = new CategoryContentLoader()

export { ArticleContentLoader, CategoryContentLoader }
