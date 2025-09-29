import Link from 'next/link'
import './globals.css'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-6xl font-extrabold mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-lg text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors font-medium shadow-lg"
      >
        Go Home
      </Link>
    </div>
  )
}
