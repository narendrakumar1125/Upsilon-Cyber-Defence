#!/bin/bash

# CyberNexGen Production Deployment Script
# Make sure you're logged in to Firebase before running this script

echo "🚀 Starting CyberNexGen Production Deployment..."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if logged in
if ! firebase login:list &> /dev/null || [ -z "$(firebase login:list 2>&1 | grep -v 'No authorized')" ]; then
    echo "⚠️  You need to login to Firebase first:"
    echo "   Run: firebase login"
    echo "   Use email: cybernexgensolutions@gmail.com"
    exit 1
fi

# Set the project
echo "📦 Setting Firebase project..."
firebase use cybernexgen-766e5

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🌐 Site URL: https://cybernexgen-766e5.web.app"
    echo "🌐 Custom Domain: https://cybernexgen.com"
else
    echo "❌ Deployment failed!"
    exit 1
fi

# Optionally deploy functions
read -p "Deploy Firebase Functions as well? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "⚙️  Deploying Firebase Functions..."
    firebase deploy --only functions
fi

echo ""
echo "🎉 Deployment complete!"

