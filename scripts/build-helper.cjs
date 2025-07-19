#!/usr/bin/env node

const { rimraf } = require('rimraf');
const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

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

function buildDocs() {
  console.log('📚 Building documentation...');

  // Run the docs extraction
  require('./extract-docs.cjs');

  console.log('✅ Documentation built successfully');
}

// Get command from arguments
const command = process.argv[2];

async function main() {
  switch (command) {
    case 'clean':
      removeDirectory('dist');
      break;

    case 'copy-files':
      // Ensure dist directory exists
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
      }

      // Copy files if they exist
      if (fs.existsSync('README.md')) {
        copyFile('README.md', 'dist/README.md');
      }
      if (fs.existsSync('LICENSE')) {
        copyFile('LICENSE', 'dist/LICENSE');
      }

      // Run the package.json creation script
      const createDistPackage = require('./create-dist-package.cjs');
      createDistPackage();
      break;

    case 'build-docs':
      buildDocs();
      break;

    case 'all':
      removeDirectory('dist');
      // TypeScript compilation happens through npm run build
      if (fs.existsSync('README.md')) {
        copyFile('README.md', 'dist/README.md');
      }
      if (fs.existsSync('LICENSE')) {
        copyFile('LICENSE', 'dist/LICENSE');
      }
      const createDistPackageAll = require('./create-dist-package.cjs');
      createDistPackageAll();
      buildDocs();
      break;

    default:
      console.error('Usage: node build-helper.cjs [clean|copy-files|build-docs|all]');
      process.exit(1);
  }
}

// Run main function
main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});