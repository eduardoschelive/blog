import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.eduardoschelive.com',
        pathname: '/images/**',
      },
    ],
    qualities: [100], // Use the CDN transformation
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
