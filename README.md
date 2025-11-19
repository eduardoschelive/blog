# Eduardo Schelive's Blog

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/eduardoschelive)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/eduardoschelive)

A modern, multilingual personal blog built with Next.js 15, featuring a custom Tokyo Night theme, MDX content management, and full internationalization support.

## Features

- **Multilingual Support** - Full i18n with English (en-US) and Portuguese (pt-BR)
- **MDX Content** - Write articles in MDX with syntax highlighting via Shiki
- **Tokyo Night Theme** - Custom dark/light theme with smooth transitions
- **Full-Text Search** - Fast client-side search powered by MiniSearch
- **Static Generation** - Fully static output for optimal performance
- **Git-Based Dates** - Automatic publish/update dates from git history
- **Responsive Design** - Mobile-first approach with Tailwind CSS 4
- **Animated UI** - Smooth animations with Framer Motion

## Tech Stack

| Category            | Technology                          |
| ------------------- | ----------------------------------- |
| Framework           | Next.js 15 (App Router + Turbopack) |
| Styling             | Tailwind CSS 4 + HeroUI             |
| Content             | MDX via next-mdx-remote             |
| i18n                | next-intl                           |
| Syntax Highlighting | Shiki                               |
| Validation          | Zod                                 |
| Package Manager     | pnpm                                |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/eduardoschelive/blog.git
cd blog

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The blog will be available at `http://localhost:3000`.

### Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Project Structure

```
├── content/
│   ├── articles/       # MDX articles organized by category
│   └── categories/     # Category definitions
├── generated/          # Auto-generated files (pathnames, search index)
├── public/
│   └── fonts/          # Custom fonts (Satoshi, Fira Code)
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── content/        # Content loading utilities
│   ├── hooks/          # Custom React hooks
│   ├── i18n/           # Internationalization config
│   ├── messages/       # Translation files
│   ├── schemas/        # Zod validation schemas
│   └── utils/          # Utility functions
└── scripts/            # Build scripts
```

## Content Management

### Adding an Article

1. Create the article directory:

   ```
   content/articles/[category-slug]/[article-slug]/
   ```

2. Add locale files (`en-US.mdx` and `pt-BR.mdx`):

   ```mdx
   ---
   title: 'Your Article Title'
   description: 'Brief description'
   slug: 'article-slug'
   ---

   Your content here...
   ```

3. Run `pnpm dev` - pathnames are generated automatically

### Adding a Category

1. Create the category directory:

   ```
   content/categories/[category-slug]/
   ```

2. Add locale files with frontmatter:
   ```mdx
   ---
   title: 'Category Name'
   description: 'Category description'
   slug: 'category-slug'
   ---
   ```

## Internationalization

Routes are automatically localized:

| English                            | Portuguese                        |
| ---------------------------------- | --------------------------------- |
| `/categories`                      | `/categorias`                     |
| `/categories/[slug]`               | `/categorias/[slug]`              |
| `/categories/[cat]/articles/[art]` | `/categorias/[cat]/artigos/[art]` |

## License

This project is licensed under a modified MIT License that allows free use for educational and learning purposes, but restricts public deployment to the author only. See [LICENSE](LICENSE) for details.
