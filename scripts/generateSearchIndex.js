import fs from 'node:fs'
import path from 'node:path'

const LANGUAGES = ['en-US', 'pt-BR']

const ROUTE_MAPPING = {
  'en-US': {
    categories: 'categories',
    articles: 'articles',
  },
  'pt-BR': {
    categories: 'categorias',
    articles: 'artigos',
  },
}

const PATHS = {
  categories: ['content', 'categories'],
  articles: ['content', 'articles'],
  outputDir: ['public', 'search'],
}

const CONTENT_LIMIT = 5000

function joinPath(parts) {
  return path.join(process.cwd(), ...parts)
}

function slugfy(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-')
}

function getCategoryDirectories() {
  const categoriesDir = joinPath(PATHS.categories)
  return fs
    .readdirSync(categoriesDir, { withFileTypes: true })
    .filter(
      (dirent) => dirent.isDirectory() && !LANGUAGES.includes(dirent.name)
    )
    .map((dirent) => dirent.name)
}

function getArticleDirectories(categorySlug) {
  const articlesDir = joinPath([...PATHS.articles, categorySlug])
  if (!fs.existsSync(articlesDir)) return []

  return fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

function removeSequencePrefix(slug) {
  return slug.replace(/^\d+\./, '')
}

function getFrontmatter(filePath) {
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, 'utf-8')
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)

  if (!frontmatterMatch) return null

  const frontmatter = {}
  const lines = frontmatterMatch[1].split('\n')

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      frontmatter[key.trim()] = value.replace(/^['"]|['"]$/g, '')
    }
  }

  return frontmatter
}

function extractSectionsWithHeadings(filePath) {
  if (!fs.existsSync(filePath)) return []

  const content = fs.readFileSync(filePath, 'utf-8')
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')

  const sections = []
  const headingRegex = /^(#{1,4})\s+(.+)$/gm
  const matches = [...withoutFrontmatter.matchAll(headingRegex)]

  const idCount = {}

  if (matches.length === 0) {
    const cleanContent = cleanText(withoutFrontmatter)
    if (cleanContent) {
      sections.push({
        headingId: null,
        headingText: null,
        content: cleanContent.substring(0, CONTENT_LIMIT),
      })
    }
    return sections
  }

  // Content before first heading
  const beforeFirst = withoutFrontmatter.substring(0, matches[0].index)
  const cleanBefore = cleanText(beforeFirst)
  if (cleanBefore) {
    sections.push({
      headingId: null,
      headingText: null,
      content: cleanBefore.substring(0, CONTENT_LIMIT),
    })
  }

  // Each heading and its content
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const headingText = match[2].trim()
    const baseSlug = slugfy(headingText)

    let headingId = baseSlug
    if (idCount[baseSlug]) {
      headingId = `${baseSlug}-${idCount[baseSlug] + 1}`
      idCount[baseSlug] += 1
    } else {
      idCount[baseSlug] = 1
    }

    const start = match.index + match[0].length
    const end =
      i < matches.length - 1 ? matches[i + 1].index : withoutFrontmatter.length
    const sectionContent = withoutFrontmatter.substring(start, end)
    const cleanContent = cleanText(sectionContent)

    if (cleanContent) {
      sections.push({
        headingId,
        headingText,
        content: cleanContent.substring(0, CONTENT_LIMIT),
      })
    }
  }

  return sections
}

function cleanText(text) {
  const withoutImports = text.replace(/^import\s+.*$/gm, '')
  const withoutExports = withoutImports.replace(/^export\s+.*$/gm, '')
  const withoutTags = withoutExports.replace(/<[^>]+>/g, ' ')
  const withoutCodeBlocks = withoutTags.replace(/```[\s\S]*?```/g, '')
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, '')
  const withoutLinks = withoutInlineCode.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  const withoutFormatting = withoutLinks
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/>\s+/g, '')

  return withoutFormatting
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim()
}

function generateSearchIndex() {
  const searchIndex = {}

  for (const locale of LANGUAGES) {
    searchIndex[locale] = {
      categories: [],
      articles: [],
    }
  }

  const categories = getCategoryDirectories()
  let articleId = 0
  let categoryId = 0

  for (const categorySlug of categories) {
    const categoryInfo = {}

    for (const locale of LANGUAGES) {
      const categoryFilePath = joinPath([
        ...PATHS.categories,
        categorySlug,
        locale + '.mdx',
      ])
      const frontmatter = getFrontmatter(categoryFilePath)

      if (frontmatter) {
        const slug = frontmatter.slug || categorySlug
        const routePrefix = ROUTE_MAPPING[locale].categories
        const url = `/${routePrefix}/${slug}`

        categoryInfo[locale] = {
          title: frontmatter.title || categorySlug,
          slug: slug,
          description: frontmatter.description || '',
        }

        searchIndex[locale].categories.push({
          id: `cat-${categoryId}`,
          type: 'category',
          title: frontmatter.title || categorySlug,
          description: frontmatter.description || '',
          slug: slug,
          url,
        })
      }
    }

    categoryId++

    const articles = getArticleDirectories(categorySlug)

    for (const articleFolder of articles) {
      for (const locale of LANGUAGES) {
        const articleFilePath = joinPath([
          ...PATHS.articles,
          categorySlug,
          articleFolder,
          locale + '.mdx',
        ])

        const frontmatter = getFrontmatter(articleFilePath)
        if (!frontmatter) continue

        const sections = extractSectionsWithHeadings(articleFilePath)
        const cleanSlug = removeSequencePrefix(
          frontmatter.slug || articleFolder
        )

        const catInfo = categoryInfo[locale]
        if (!catInfo) continue

        const routePrefix = ROUTE_MAPPING[locale].categories
        const articleRoutePrefix = ROUTE_MAPPING[locale].articles
        const baseUrl = `/${routePrefix}/${catInfo.slug}/${articleRoutePrefix}/${cleanSlug}`

        searchIndex[locale].articles.push({
          id: `art-${articleId}`,
          type: 'article',
          title: frontmatter.title || '',
          description: frontmatter.description || '',
          sections: sections.map((s) => ({
            h: s.headingId,
            t: s.headingText,
            c: s.content.substring(0, 800),
          })),
          category: catInfo.title,
          categorySlug: catInfo.slug,
          slug: cleanSlug,
          url: baseUrl,
        })
      }

      articleId++
    }
  }

  return searchIndex
}

function main() {
  console.log('🔍 Generating search index...')

  const searchIndex = generateSearchIndex()

  const outputDir = joinPath(PATHS.outputDir)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  let totalSize = 0

  for (const locale of LANGUAGES) {
    const outputPath = path.join(outputDir, `${locale}.json`)
    const data = searchIndex[locale]

    fs.writeFileSync(outputPath, JSON.stringify(data))

    const stats = fs.statSync(outputPath)
    const sizeKB = (stats.size / 1024).toFixed(2)
    totalSize += stats.size

    const catCount = data.categories.length
    const artCount = data.articles.length
    console.log(
      `   - ${locale}: ${catCount} categories, ${artCount} articles (${sizeKB}KB)`
    )
  }

  console.log(
    `✅ Search index generated: ${(totalSize / 1024).toFixed(2)}KB total`
  )
}

main()
