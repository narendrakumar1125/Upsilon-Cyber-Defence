#!/bin/bash

echo "🚀 Starting Firebase static build process..."

# Clean previous builds
rm -rf .next out

# Create a temporary directory for API routes
mkdir -p app_api_temp

# Move API routes to a temporary location
if [ -d "app/api" ]; then
  echo "📂 Moving API routes to a safe location..."
  mv app/api app_api_temp/
fi

# Build the static site
echo "🔨 Building static site for Firebase..."
npm run build

# Success check
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed!"
fi

# Restore API routes
if [ -d "app_api_temp/api" ]; then
  echo "📂 Restoring API routes..."
  mv app_api_temp/api app/
fi

# Clean up temporary directory
rm -rf app_api_temp

echo "🎉 Done! Your static site is in the 'out' directory."
echo "🔥 Run 'firebase deploy --only hosting' to deploy to Firebase."