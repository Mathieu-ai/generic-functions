#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the main package.json
const mainPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Create a new package.json for dist with corrected paths
const distPackageJson = {
    ...mainPackageJson,
    // Remove dist/ prefix from all paths since we're publishing from dist folder
    main: "index.js",
    types: "index.d.ts",
    exports: {
        ".": {
            "import": "./index.js",
            "require": "./index.js",
            "types": "./index.d.ts"
        },
        "./core": {
            "import": "./core/index.js",
            "require": "./core/index.js",
            "types": "./core/index.d.ts"
        },
        "./core/string": {
            "import": "./core/string.js",
            "require": "./core/string.js",
            "types": "./core/string.d.ts"
        },
        "./core/array": {
            "import": "./core/array.js",
            "require": "./core/array.js",
            "types": "./core/array.d.ts"
        },
        "./core/object": {
            "import": "./core/object.js",
            "require": "./core/object.js",
            "types": "./core/object.d.ts"
        },
        "./core/number": {
            "import": "./core/number.js",
            "require": "./core/number.js",
            "types": "./core/number.d.ts"
        },
        "./core/date": {
            "import": "./core/date.js",
            "require": "./core/date.js",
            "types": "./core/date.d.ts"
        },
        "./utils": {
            "import": "./utils/index.js",
            "require": "./utils/index.js",
            "types": "./utils/index.d.ts"
        },
        "./constants": {
            "import": "./constants/index.js",
            "require": "./constants/index.js",
            "types": "./constants/index.d.ts"
        }
    },
    // Only include what's in the dist folder
    files: [
        "*",
        "**/*"
    ],
    // Clean up scripts for published package
    scripts: {
        test: mainPackageJson.scripts.test
    },
    // Remove dev dependencies
    devDependencies: undefined,
    // Remove directory from publishConfig since we're already in dist
    publishConfig: {
        access: "public",
        registry: "https://registry.npmjs.org/"
    }
};

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
}

// Write the new package.json to dist
fs.writeFileSync(
    path.join('dist', 'package.json'),
    JSON.stringify(distPackageJson, null, 2)
);

// Create a simple .npmignore for dist to avoid any unwanted files
const distNpmIgnore = `# Only ignore potential temporary files
*.tmp
*.temp
.DS_Store
Thumbs.db
`;

fs.writeFileSync(
    path.join('dist', '.npmignore'),
    distNpmIgnore
);

console.log('✅ Created dist/package.json and dist/.npmignore for npm publishing');
