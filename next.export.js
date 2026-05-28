/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Firebase hosting
  output: 'export',
  // Use out directory
  distDir: '.next',
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  trailingSlash: true,
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

module.exports = nextConfig;