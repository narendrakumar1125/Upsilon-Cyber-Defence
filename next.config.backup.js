/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use default directory
  distDir: '.next',
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
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