# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual Next.js 15 blog with internationalization (i18n) support. It uses a file-based content management system where articles and categories are stored as MDX files with locale-specific versions.

**Key Technologies:**

- **Framework:** Next.js 15 with App Router and Turbopack
- **Styling:** Tailwind CSS 4 + HeroUI (custom Tokyo Night theme)
- **Internationalization:** next-intl with dynamic pathname generation
- **Content:** MDX via next-mdx-remote with Zod validation
- **Search:** MiniSearch with auto-generated index from MDX content
- **Syntax Highlighting:** Shiki
- **Package Manager:** pnpm
- **Deployment:** Vercel (with HTTP/2 support enabled by default)

## Development Commands

```bash
# Development server with automatic content generation
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Generate both pathnames and search index (runs automatically on dev/build/install)
pnpm generate

# Generate only pathnames from content
pnpm generate:pathnames

# Generate only search index from content
pnpm generate:search

# Clean generated files
pnpm clean:generated
```

## Architecture

### Internationalization System

The blog supports two locales: `en-US` (default) and `pt-BR`. Routing uses localized pathnames:

- English: `/categories/web-servers/articles/caddy`
- Portuguese: `/categorias/servidores-web/artigos/caddy`

**Critical workflow:**

1. Content files define a `slug` in their frontmatter
2. `scripts/generatePathnames.js` scans all MDX files and generates `generated/pathnames.ts`
3. This file is merged with static routes in `src/i18n/pathnames.ts`
4. `src/i18n/routing.ts` uses `defineRouting()` from next-intl with pathnames config
5. `src/middleware.ts` applies the routing config to all requests (except `/api`, `/_next`, `/_vercel`, and static files)
6. `next-intl` uses these pathnames for routing and link generation

**Translation files location:** `src/messages/en-US.json` and `src/messages/pt-BR.json` contain all UI strings and metadata including SEO titles/descriptions under the `Metadata` key.

**Important:** The `pnpm generate` command runs automatically via `postinstall` hook and during dev/build, but you can run it manually if needed.

### Content Management

**Structure:**

```
content/
├── categories/
│   └── [category-slug]/
│       ├── en-US.mdx
│       └── pt-BR.mdx
└── articles/
    └── [category-slug]/
        └── [article-slug]/
            ├── en-US.mdx
            └── pt-BR.mdx
```

**Content Loading Flow:**

1. `src/content/articles/getArticles.ts` reads from filesystem
2. `src/content/shared/readFile.ts` loads MDX content
3. `src/content/shared/compileContent.ts` compiles MDX using next-mdx-remote
4. `src/content/shared/parseFrontmatter.ts` validates frontmatter against Zod schemas
5. Schemas in `src/schemas/` define content structure

**Category Schema (`src/schemas/category.schema.ts`):**

- `title`: Category display name
- `description`: Category description
- `slug`: URL slug (used in pathname generation)

**Article Schema (`src/schemas/article.schema.ts`):**

- `title`: Article title
- `description`: Optional description
- `tags`: Optional array of tags
- `slug`: URL slug (used in pathname generation, sequence prefixes like `1.` are automatically removed)
- `coverImage`: Optional cover image URL

### Search System

**Search Index Generation:**

1. `scripts/generateSearchIndex.js` scans all MDX files
2. Extracts headings and content from each article section
3. Generates `public/search/en-US.json` and `public/search/pt-BR.json`
4. Each article is indexed with sections containing heading IDs, text, and content snippets (limited to 800 chars per section)
5. MiniSearch library provides client-side full-text search

**Search features:**

- Searches across article titles, descriptions, and content
- Supports section-level search (can link directly to headings with `#heading-id`)
- Automatically removes code blocks, imports, and formatting from indexed content
- Heading IDs are auto-generated using slugified heading text with collision detection

### Component Architecture

**Layout Components:**

- Server-side: `src/app/[locale]/layout.tsx` handles locale validation, font loading, and wraps with providers
- Client-side: Components split into server/client (e.g., `Hero` is server component, `HeroClient` handles client interactions)

**Provider Stack (`src/providers/Providers.tsx`):**

- `NextIntlClientProvider`: i18n context
- `ThemeProvider`: next-themes for dark/light mode
- `UIProvider`: HeroUI configuration
- `ClickSparkProvider`: Click animation effects

**UI Components:**

- Located in `src/components/`
- Use HeroUI with custom Tokyo Night theme (`hero.ts`)
- Framer Motion for animations

### SEO & Metadata System

**Metadata Generation (`src/utils/metadata.ts`):**

The `generatePageMetadata()` function creates comprehensive SEO metadata including:

- Dynamic Open Graph images via `/api/og` routes
- Canonical URLs and alternate language links
- Twitter card metadata
- Structured robots directives

**Open Graph Image Generation:**

1. Articles with `coverImage`: Generates procedural overlay via `/api/og/image?image=...&title=...`
2. Articles without cover: Uses `/api/og?title=...&subtitle=Article`
3. Category pages: Uses `/api/og?title=...&subtitle=Category`
4. Home/About pages: Uses default branding images

**SEO Best Practices:**

- Title tags: 50-60 characters (set in `src/messages/*/Metadata.*.title`)
- Meta descriptions: 120-160 characters (set in `src/messages/*/Metadata.*.description`)
- Security headers configured in `vercel.json`

### Path Aliases

TypeScript paths configured in `tsconfig.json`:

- `@/*` → `./src/*`
- `@generated/*` → `./generated/*`

### Error Handling

Custom error classes in `src/error/`:

- `ApplicationError`: Base error class
- `ContentParsingError`: Thrown when MDX parsing/validation fails

## Working with Content

### Adding a New Article

1. Create directory: `content/articles/[category-slug]/[article-slug]/`
2. Create locale files: `en-US.mdx` and `pt-BR.mdx`
3. Add frontmatter with required fields (title, slug)
4. Dev server will auto-regenerate pathnames and search index
5. The article will automatically appear in the category

### Adding a New Category

1. Create directory: `content/categories/[category-slug]/`
2. Create locale files: `en-US.mdx` and `pt-BR.mdx`
3. Add frontmatter with required fields (title, description, slug)
4. Create corresponding articles directory: `content/articles/[category-slug]/`
5. Dev server will auto-regenerate pathnames

### Modifying Content Schemas

When changing `src/schemas/article.schema.ts` or `src/schemas/category.schema.ts`:

1. Update the schema definition
2. Update all existing MDX frontmatter to match
3. Check `src/content/articles/helpers.ts` and `src/content/categories/helpers.ts` for loading logic
4. Update TypeScript types exported from schemas

### Updating SEO Metadata

To update page titles and descriptions for SEO:

1. Edit `src/messages/en-US.json` and `src/messages/pt-BR.json`
2. Update values under `Metadata.home`, `Metadata.about`, or `Metadata.categories`
3. Follow SEO best practices: titles 50-60 chars, descriptions 120-160 chars
4. Changes apply to `<title>`, meta description, and Open Graph tags

## Important Notes

- **Generated files:** Never edit `generated/pathnames.ts` or `public/search/*.json` manually - they're auto-generated
- **Locale consistency:** Every content file must exist in both locales
- **Middleware:** `src/middleware.ts` handles locale detection and routing
- **Server actions:** Content compilation is marked with `'use server'` directive
- **Turbopack:** Build and dev commands use `--turbopack` flag for faster builds
- **Theme customization:** Custom Tokyo Night theme colors in `hero.ts` for both light/dark modes
- **Font loading:** Custom Satoshi font + Fira Code for monospace, configured in layout
- **HTTP/2:** Automatically enabled on Vercel deployment
- **Image CDN:** Images are served from `cdn.eduardoschelive.com` with custom loader in `src/utils/imageLoader.ts`
