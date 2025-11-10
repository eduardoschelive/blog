/**
 * Root Layout (Minimal)
 *
 * This layout is required by Next.js when a root `not-found.tsx` file exists.
 * It simply passes children through without any additional wrapping.
 *
 * The actual layout with Header, Footer, and Providers is in app/[locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
