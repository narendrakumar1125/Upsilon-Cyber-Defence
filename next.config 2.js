/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export due to API routes
  // output: 'export',
  distDir: 'out',
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  trailingSlash: true,
  // Skip API routes redirect
  skipTrailingSlashRedirect: true,
  // Page extensions
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig