/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Use default directory
  //distDir: '.next',
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  // Page extensions
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        dns: false,
        tls: false,
        fs: false,
        request: false,
      };
    }
    
    // Ignore the specific undici file that's causing issues
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^undici$/,
        contextRegExp: /node_modules/,
      })
    );
    
    return config;
  },
}

module.exports = nextConfig;
