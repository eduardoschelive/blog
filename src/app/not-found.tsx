'use client'

import Link from 'next/link'

/**
 * Root Not Found Page (Fallback)
 *
 * This page is rendered when the next-intl middleware doesn't catch the route
 * and the requested resource is not found. This typically happens for:
 * - Static files that don't exist (e.g., /favicon.ico, /robots.txt)
 * - Routes without a valid locale prefix
 * - Direct access to non-existent paths
 *
 * Most users will see the localized 404 page at /[locale]/not-found.tsx instead.
 * This page is mainly for bots and edge cases.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 - Page Not Found</title>
      </head>
      <body className="m-0 p-0 bg-[#0a0a0a] text-white flex items-center justify-center min-h-screen font-sans">
        <div className="text-center p-8">
          <h1 className="text-8xl md:text-9xl font-black m-0 bg-linear-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold my-4 text-gray-200">
            Page not found
          </h2>
          <p className="text-base text-gray-400 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 text-base font-semibold text-white bg-linear-to-r from-[#667eea] to-[#764ba2] rounded-lg no-underline transition-transform hover:scale-105"
          >
            Go to Homepage
          </Link>
        </div>
      </body>
    </html>
  )
}
