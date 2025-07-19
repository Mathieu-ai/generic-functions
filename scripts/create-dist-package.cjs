#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

function createDistPackage() {
    // Create a clean package.json for distribution
    const distPackage = {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        main: 'index.js',
        module: 'index.esm.js',
        types: 'index.d.ts',
        exports: {
            ".": {
                "import": "./index.esm.js",
                "require": "./index.js",
                "types": "./index.d.ts"
            },
            "./constants": {
                "import": "./constants/index.esm.js",
                "require": "./constants/index.js",
                "types": "./constants/index.d.ts"
            }
        },
        files: [
            "*",
            "**/*"
        ],
        scripts: {
            test: packageJson.scripts?.test
        },
        keywords: packageJson.keywords,
        author: packageJson.author,
        license: packageJson.license,
        repository: packageJson.repository,
        bugs: packageJson.bugs,
        homepage: packageJson.homepage,
        engines: packageJson.engines,
        publishConfig: {
            access: "public",
            registry: "https://registry.npmjs.org/"
        }
    };
    
    // Ensure dist directory exists
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Write to dist directory
    const distPath = path.join(distDir, 'package.json');
    fs.writeFileSync(distPath, JSON.stringify(distPackage, null, 2));
    
    // Create a simple .npmignore for dist to avoid any unwanted files
    const distNpmIgnore = `# Only ignore potential temporary files
*.tmp
*.temp
.DS_Store
Thumbs.db
`;
    fs.writeFileSync(path.join(distDir, '.npmignore'), distNpmIgnore);
    
    // Copy README if it exists
    const readmePath = path.join(__dirname, '..', 'README.md');
    const distReadmePath = path.join(distDir, 'README.md');
    
    if (fs.existsSync(readmePath)) {
        fs.copyFileSync(readmePath, distReadmePath);
    }
    
    // Copy LICENSE if it exists
    const licensePath = path.join(__dirname, '..', 'LICENSE');
    const distLicensePath = path.join(distDir, 'LICENSE');
    
    if (fs.existsSync(licensePath)) {
        fs.copyFileSync(licensePath, distLicensePath);
    }
    
    console.log(`✅ Distribution package created successfully!`);
    console.log(`📦 ${distPackage.name} v${distPackage.version}`);
    console.log(`👤 Author: ${typeof distPackage.author === 'string' ? distPackage.author : distPackage.author?.name || 'Unknown'}`);
    console.log(`📄 License: ${distPackage.license}`);
    console.log(`🔗 Repository: ${distPackage.repository?.url
        ? distPackage.repository.url
        : 'N/A'}`);
}