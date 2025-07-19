#!/usr/bin/env node

const { build } = require('esbuild');
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

async function buildLibrary() {
    console.log(`Building ${packageJson.name} v${packageJson.version}...`);
    
    // Clean dist directory
    await rimraf('dist');
    
    const baseConfig = {
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        external: ['fs', 'path'],
        banner: {
            js: `/*!
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 * 
 * Author: ${typeof packageJson.author === 'string' ? packageJson.author : packageJson.author?.name || 'Unknown'}
 * License: ${packageJson.license || 'MIT'}
 * Repository: ${packageJson.repository?.url || 'N/A'}
 */`
        }
    };
    
    try {
        // Build CommonJS
        await build({
            ...baseConfig,
            outfile: 'dist/index.js',
            format: 'cjs',
            platform: 'node',
        });
        
        // Build ESM
        await build({
            ...baseConfig,
            outfile: 'dist/index.esm.js',
            format: 'esm',
            platform: 'neutral',
        });
        
        console.log(`✅ Build completed successfully!`);
        console.log(`📦 Package: ${packageJson.name}`);
        console.log(`🔖 Version: ${packageJson.version}`);
        console.log(`👤 Author: ${typeof packageJson.author === 'string' ? packageJson.author : packageJson.author?.name || 'Unknown'}`);
        console.log(`📄 License: ${packageJson.license || 'MIT'}`);
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
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
        
        // Copy files
        copyFile('README.md', 'dist/README.md');
        copyFile('LICENSE', 'dist/LICENSE');
        
        // Run the package.json creation script
        require('./create-dist-package.cjs');
        break;
        
      case 'build-docs':
        buildDocs();
        break;
        
      case 'all':
        removeDirectory('dist');
        await buildLibrary();
        copyFile('README.md', 'dist/README.md'); 
        copyFile('LICENSE', 'dist/LICENSE');
        require('./create-dist-package.cjs');
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
