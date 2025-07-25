#!/usr/bin/env node

// SECTION - Dependencies and Imports
const fs = require('fs');
const path = require('path');

// ANCHOR - Package JSON Loader
// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// ANCHOR - Main Distribution Package Creator
function createDistPackage() {
    // SECTION - Distribution Package Configuration
    // NOTE - Create a clean package.json for distribution with only necessary fields
    const distPackage = {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        main: 'index.js',
        types: 'index.d.ts',
        exports: packageJson.exports,
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

    // SECTION - Directory Setup
    // ANCHOR - Dist Directory Creation
    // Ensure dist directory exists
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    // SECTION - File Generation
    // ANCHOR - Package JSON Writer
    // Write to dist directory
    const distPath = path.join(distDir, 'package.json');
    fs.writeFileSync(distPath, JSON.stringify(distPackage, null, 2));

    // ANCHOR - NPM Ignore File Creator
    // Create a simple .npmignore for dist to avoid any unwanted files
    const distNpmIgnore = `# Only ignore potential temporary files
*.tmp
*.temp
.DS_Store
Thumbs.db
`;
    fs.writeFileSync(path.join(distDir, '.npmignore'), distNpmIgnore);

    // SECTION - Additional File Copying
    // ANCHOR - README File Copier
    // Copy README if it exists
    const readmePath = path.join(__dirname, '..', 'README.md');
    const distReadmePath = path.join(distDir, 'README.md');

    if (fs.existsSync(readmePath)) {
        fs.copyFileSync(readmePath, distReadmePath);
    }

    // ANCHOR - License File Copier
    // Copy LICENSE if it exists
    const licensePath = path.join(__dirname, '..', 'LICENSE');
    const distLicensePath = path.join(distDir, 'LICENSE');

    if (fs.existsSync(licensePath)) {
        fs.copyFileSync(licensePath, distLicensePath);
    }

    // SECTION - Success Reporting
    // ANCHOR - Console Output
    console.log(`✅ Distribution package created successfully!`);
    console.log(`📦 ${distPackage.name} v${distPackage.version}`);
    console.log(`👤 Author: ${typeof distPackage.author === 'string' ? distPackage.author : distPackage.author?.name || 'Unknown'}`);
    console.log(`📄 License: ${distPackage.license}`);
    console.log(`🔗 Repository: ${distPackage.repository?.url
        ? distPackage.repository.url
        : 'N/A'}`);
}

// SECTION - Script Entry Point
// ANCHOR - Module Execution Check
// Execute if called directly
if (require.main === module) {
    createDistPackage();
}

// ANCHOR - Module Export
module.exports = createDistPackage;