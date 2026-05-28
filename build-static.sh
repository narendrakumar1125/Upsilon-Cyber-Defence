#!/bin/bash

echo "🚀 Starting static build process..."

# Clean previous builds
rm -rf .next out

# Install dependencies
npm install

# Build the static site
NEXT_PUBLIC_SKIP_API_ROUTES=true npm run build

# Create a zip file of the build directory
echo "📦 Creating deployment package..."
cd out
zip -r ../deployment.zip .

echo "✅ Build completed! Your static site is ready in the 'out' directory"
echo "📦 Deployment package created: deployment.zip"
