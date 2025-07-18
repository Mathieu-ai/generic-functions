#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Cross-platform file operations
function copyFile(src, dest) {
  try {
    // Ensure destination directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${src} to ${dest}:`, error.message);
    process.exit(1);
  }
}

function removeDirectory(dir) {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Removed directory ${dir}`);
    } else {
      console.log(`📁 Directory ${dir} not found (nothing to clean)`);
    }
  } catch (error) {
    console.error(`❌ Failed to remove directory ${dir}:`, error.message);
    process.exit(1);
  }
}

// Get command from arguments
const command = process.argv[2];

switch (command) {
  case 'clean':
    removeDirectory('dist');
    break;
    
  case 'copy-files':
    // Ensure dist directory exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }
    
    // Copy files
    copyFile('README.md', 'dist/README.md');
    copyFile('LICENSE', 'dist/LICENSE');
    
    // Run the package.json creation script
    require('./create-dist-package.cjs');
    break;
    
  default:
    console.error('Usage: node build-helper.cjs [clean|copy-files]');
    process.exit(1);
}
