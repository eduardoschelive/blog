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
    deviceSizes: [640, 828, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
