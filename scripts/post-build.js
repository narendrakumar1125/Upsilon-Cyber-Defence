#!/usr/bin/env node

/**
 * Post-build script to fix Firebase Hosting routing issues
 * Creates directory structure for pages that need trailing slashes
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Only perform post-build folder fixes when a static export was produced.
if (!fs.existsSync(outDir)) {
  console.log('Skipping post-build static export fixes because the out directory was not generated.');
  process.exit(0);
}

// Pages that need to be in directory format for trailingSlash: true
const pagesToFix = [
  'client-admin/settings',
  'profile',
];

console.log('Running post-build fixes...');

pagesToFix.forEach(page => {
  const htmlFile = path.join(outDir, `${page}.html`);
  const dirPath = path.join(outDir, page);
  const indexFile = path.join(dirPath, 'index.html');

  if (fs.existsSync(htmlFile)) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✓ Created directory: ${page}/`);
    }

    // Copy HTML file to index.html in the directory
    fs.copyFileSync(htmlFile, indexFile);
    console.log(`✓ Created ${page}/index.html`);
  } else {
    console.warn(`⚠ Warning: ${htmlFile} not found`);
  }
});

console.log('Post-build fixes complete!');

