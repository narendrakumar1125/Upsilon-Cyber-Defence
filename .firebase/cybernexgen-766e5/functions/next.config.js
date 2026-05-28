"use strict";

// next.config.js
var nextConfig = {
  // Remove output: 'export' for dynamic API routes
  // Remove distDir: 'out' for server-side rendering
  images: {
    domains: ["firebasestorage.googleapis.com"]
  },
  trailingSlash: true
};
module.exports = nextConfig;
