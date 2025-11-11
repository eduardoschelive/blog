# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual Next.js 15 blog with internationalization (i18n) support. It uses a file-based content management system where articles and categories are stored as MDX files with locale-specific versions.

**Key Technologies:**
- **Framework:** Next.js 15 with App Router and Turbopack
- **Styling:** Tailwind CSS 4 + HeroUI (custom Tokyo Night theme)
- **Internationalization:** next-intl with dynamic pathname generation
- **Content:** MDX via next-mdx-remote with Zod validation
- **Syntax Highlighting:** Shiki
- **Package Manager:** pnpm

## Development Commands

```bash
# Development server with automatic pathname generation
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Generate pathnames from content (runs automatically on dev/build)
pnpm generate:pathnames

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
4. `next-intl` uses these pathnames for routing and link generation

**Important:** Always run `pnpm generate:pathnames` after adding/modifying content files with slug changes.

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
- `slug`: URL slug (used in pathname generation)
- `coverImage`: Optional cover image URL

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

### Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@generated/*` → `./generated/*`

### Error Handling

Custom error classes in `src/error/`:
- `ApplicationError`: Base error class
- `ContentParsingError`: Thrown when MDX parsing/validation fails

### Hooks

Custom hooks in `src/hooks/`:
- Likely include scroll handling, theme management, etc.

## Working with Content

### Adding a New Article

1. Create directory: `content/articles/[category-slug]/[article-slug]/`
2. Create locale files: `en-US.mdx` and `pt-BR.mdx`
3. Add frontmatter with required fields (title, slug)
4. Run `pnpm generate:pathnames` to update routing
5. The article will automatically appear in the category

### Adding a New Category

1. Create directory: `content/categories/[category-slug]/`
2. Create locale files: `en-US.mdx` and `pt-BR.mdx`
3. Add frontmatter with required fields (title, description, slug)
4. Create corresponding articles directory: `content/articles/[category-slug]/`
5. Run `pnpm generate:pathnames` to update routing

### Modifying Content Schemas

When changing `src/schemas/article.schema.ts` or `src/schemas/category.schema.ts`:
1. Update the schema definition
2. Update all existing MDX frontmatter to match
3. Check `src/content/articles/helpers.ts` and `src/content/categories/helpers.ts` for loading logic
4. Update TypeScript types exported from schemas

## Important Notes

- **Generated files:** Never edit `generated/pathnames.ts` manually - it's auto-generated
- **Locale consistency:** Every content file must exist in both locales
- **Middleware:** `src/middleware.ts` handles locale detection and routing
- **Server actions:** Content compilation is marked with `'use server'` directive
- **Turbopack:** Build and dev commands use `--turbopack` flag for faster builds
- **Theme customization:** Custom Tokyo Night theme colors in `hero.ts` for both light/dark modes
- **Font loading:** Custom Satoshi font + Fira Code for monospace, configured in layout

## Testing

The project includes Vitest for testing (configured in `package.json`), though specific test commands aren't defined in scripts yet.
