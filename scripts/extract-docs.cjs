#!/usr/bin/env node

/**
 * Script to extract function documentation from TypeScript source files
 * and generate the functions-data.js file for the documentation website
 */

const fs = require('fs');
const path = require('path');

// Check if TypeScript is available
let ts;
try {
  ts = require('typescript');
} catch (error) {
  console.error('TypeScript is required for documentation extraction. Please install it:');
  console.error('npm install --save-dev typescript');
  process.exit(1);
}

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Configuration
const CONFIG = {
  srcDirs: ['src/core', 'src/utils'],
  constantsFile: 'src/constants/index.ts', // Add constants file
  outputFile: 'docs/functions-data.js',
  packageJsonPath: 'package.json',
  ignoredFiles: ['index.ts', 'index.js'],
  ignoredFunctions: ['getObjectKeysByType', 'getObjectValueByPath'] // Internal helpers
};

// Get package version
function getPackageVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(CONFIG.packageJsonPath, 'utf-8'));
    return packageJson.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

// Parse JSDoc comment
function parseJSDoc(jsDocText) {
  if (!jsDocText) return {};

  const lines = jsDocText.split('\n').map(line => line.trim());
  const result = {
    description: '',
    params: [],
    returns: null,
    example: '',
    since: getPackageVersion()
  };

  let currentSection = 'description';
  let exampleLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines and comment markers
    if (line === '*' || line === '/**' || line === '*/') continue;

    // Remove leading asterisk
    const content = line.replace(/^\*\s?/, '');

    // Check for tags
    if (content.startsWith('@param')) {
      currentSection = 'param';
      const paramMatch = content.match(/@param\s+(?:\{([^}]+)\})?\s*(\[?\w+\]?)\s*-?\s*(.+)/);
      if (paramMatch) {
        const [, type, name, description] = paramMatch;
        result.params.push({
          name: name.replace(/[\[\]]/g, ''),
          type: type || 'any',
          description: description.trim(),
          optional: name.includes('[')
        });
      }
    } else if (content.startsWith('@returns') || content.startsWith('@return')) {
      currentSection = 'returns';
      const returnMatch = content.match(/@returns?\s+(?:\{([^}]+)\})?\s*-?\s*(.+)/);
      if (returnMatch) {
        const [, type, description] = returnMatch;
        result.returns = {
          type: type || 'any',
          description: description.trim()
        };
      }
    } else if (content.startsWith('@example')) {
      currentSection = 'example';
      exampleLines = [];
    } else if (content.startsWith('@since')) {
      const sinceMatch = content.match(/@since\s+(.+)/);
      if (sinceMatch) {
        result.since = sinceMatch[1].trim();
      }
    } else if (content.startsWith('@')) {
      // Skip other tags
      currentSection = 'other';
    } else {
      // Add content to current section
      if (currentSection === 'description' && content) {
        result.description += (result.description ? ' ' : '') + content;
      } else if (currentSection === 'example') {
        exampleLines.push(content);
      } else if (currentSection === 'returns' && result.returns && content) {
        result.returns.description += ' ' + content;
      } else if (currentSection === 'param' && result.params.length > 0 && content) {
        result.params[result.params.length - 1].description += ' ' + content;
      }
    }
  }

  // Process example
  if (exampleLines.length > 0) {
    // Remove code block markers if present
    const cleanedExample = exampleLines
      .filter(line => !line.match(/^```/))
      .join('\n')
      .trim();
    result.example = cleanedExample;
  }

  return result;
}

// Extract function signature
function extractFunctionSignature(node, sourceFile) {
  const params = node.parameters.map(param => {
    const name = param.name.getText(sourceFile);
    const type = param.type ? param.type.getText(sourceFile) : 'any';
    const optional = !!param.questionToken || !!param.initializer;
    return { name, type, optional };
  });

  const returnType = node.type ? node.type.getText(sourceFile) : 'any';

  // Build syntax string
  const paramsStr = params.map(p => {
    const optionalMarker = p.optional ? '?' : '';
    return `${p.name}${optionalMarker}: ${p.type}`;
  }).join(', ');

  const functionName = node.name ? node.name.getText(sourceFile) : 'anonymous';
  const syntax = `${functionName}(${paramsStr}): ${returnType}`;

  return { params, returnType, syntax };
}

// Process a single TypeScript file
function processFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const functions = [];
  const category = path.basename(path.dirname(filePath)) === 'utils'
    ? 'utility'
    : path.basename(filePath, path.extname(filePath));

  function visit(node) {
    // Look for exported function declarations
    if (ts.isFunctionDeclaration(node) && node.name) {
      const hasExportModifier = node.modifiers?.some(
        modifier => modifier.kind === ts.SyntaxKind.ExportKeyword
      );

      if (hasExportModifier) {
        const functionName = node.name.getText(sourceFile);

        // Skip ignored functions
        if (CONFIG.ignoredFunctions.includes(functionName)) {
          return;
        }

        // Get JSDoc comment
        const jsDocNodes = ts.getJSDocCommentsAndTags(node);
        let jsDocText = '';
        if (jsDocNodes.length > 0) {
          const start = jsDocNodes[0].pos;
          const end = jsDocNodes[0].end;
          jsDocText = fileContent.substring(start, end);
        }

        const jsDoc = parseJSDoc(jsDocText);
        const signature = extractFunctionSignature(node, sourceFile);

        // Merge params from signature and JSDoc
        const mergedParams = signature.params.map(param => {
          const jsDocParam = jsDoc.params.find(p => p.name === param.name);
          return {
            name: param.name,
            type: param.type,
            description: jsDocParam?.description || `The ${param.name} parameter`,
            optional: param.optional
          };
        });

        functions.push({
          name: functionName,
          category,
          description: jsDoc.description || `${functionName} function`,
          syntax: signature.syntax,
          params: mergedParams,
          returns: jsDoc.returns || {
            type: signature.returnType,
            description: `Returns ${signature.returnType}`
          },
          example: jsDoc.example || `${functionName}()`,
          since: jsDoc.since
        });
      }
    }

    // Look for exported arrow functions and function expressions
    if (ts.isVariableStatement(node)) {
      const hasExportModifier = node.modifiers?.some(
        modifier => modifier.kind === ts.SyntaxKind.ExportKeyword
      );

      if (hasExportModifier) {
        node.declarationList.declarations.forEach(declaration => {
          if (declaration.initializer &&
            (ts.isArrowFunction(declaration.initializer) ||
              ts.isFunctionExpression(declaration.initializer))) {

            const functionName = declaration.name.getText(sourceFile);

            // Skip ignored functions
            if (CONFIG.ignoredFunctions.includes(functionName)) {
              return;
            }

            // Get JSDoc comment
            const jsDocNodes = ts.getJSDocCommentsAndTags(declaration);
            let jsDocText = '';
            if (jsDocNodes.length > 0) {
              const start = jsDocNodes[0].pos;
              const end = jsDocNodes[0].end;
              jsDocText = fileContent.substring(start, end);
            }

            const jsDoc = parseJSDoc(jsDocText);
            const signature = extractFunctionSignature(declaration.initializer, sourceFile);
            signature.syntax = signature.syntax.replace('anonymous', functionName);

            // Merge params from signature and JSDoc
            const mergedParams = signature.params.map(param => {
              const jsDocParam = jsDoc.params.find(p => p.name === param.name);
              return {
                name: param.name,
                type: param.type,
                description: jsDocParam?.description || `The ${param.name} parameter`,
                optional: param.optional
              };
            });

            functions.push({
              name: functionName,
              category,
              description: jsDoc.description || `${functionName} function`,
              syntax: signature.syntax,
              params: mergedParams,
              returns: jsDoc.returns || {
                type: signature.returnType,
                description: `Returns ${signature.returnType}`
              },
              example: jsDoc.example || `${functionName}()`,
              since: jsDoc.since
            });
          }
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return functions;
}

// Process constants file
function processConstants(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Constants file not found: ${filePath}`);
    return [];
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const constants = [];

  function visit(node) {
    // Look for exported variable declarations (const exports)
    if (ts.isVariableStatement(node)) {
      const hasExportModifier = node.modifiers?.some(
        modifier => modifier.kind === ts.SyntaxKind.ExportKeyword
      );

      if (hasExportModifier) {
        node.declarationList.declarations.forEach(declaration => {
          if (declaration.initializer) {
            const constantName = declaration.name.getText(sourceFile);

            // Get JSDoc comment
            const jsDocNodes = ts.getJSDocCommentsAndTags(declaration);
            let jsDocText = '';
            if (jsDocNodes.length > 0) {
              const start = jsDocNodes[0].pos;
              const end = jsDocNodes[0].end;
              jsDocText = fileContent.substring(start, end);
            }

            const jsDoc = parseJSDoc(jsDocText);

            // Try to get the actual value structure
            let value = 'Object';
            let preview = '';

            try {
              const valueText = declaration.initializer.getText(sourceFile);

              // Simple preview generation
              if (valueText.includes('{') && valueText.includes('}')) {
                const keys = valueText.match(/(\w+):/g);
                if (keys && keys.length > 0) {
                  const keysList = keys.map(k => k.replace(':', '')).slice(0, 3);
                  preview = `{ ${keysList.join(', ')}${keys.length > 3 ? ', ...' : ''} }`;
                }
              } else {
                preview = valueText.substring(0, 50) + (valueText.length > 50 ? '...' : '');
              }
            } catch (error) {
              preview = 'Complex Object';
            }

            constants.push({
              name: constantName,
              type: 'constant',
              description: jsDoc.description || `${constantName} constant`,
              value,
              preview,
              category: 'constants',
              since: jsDoc.since || getPackageVersion()
            });
          }
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return constants;
}

// Process all files in a directory
function processDirectory(dirPath) {
  const functions = [];

  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return functions;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (CONFIG.ignoredFiles.includes(file)) {
      return;
    }

    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.js'))) {
      console.log(`Processing ${filePath}...`);
      try {
        const fileFunctions = processFile(filePath);
        functions.push(...fileFunctions);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
  });

  return functions;
}

// Main function
function main() {
  console.log('Extracting function documentation...\n');

  let allFunctions = [];
  let allConstants = [];

  // Process each source directory
  CONFIG.srcDirs.forEach(dir => {
    const functions = processDirectory(dir);
    allFunctions.push(...functions);
  });

  // Process constants file
  console.log(`Processing constants from ${CONFIG.constantsFile}...`);
  const constants = processConstants(CONFIG.constantsFile);
  allConstants.push(...constants);

  // Sort functions by category and then by name
  allFunctions.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  // Sort constants by name
  allConstants.sort((a, b) => a.name.localeCompare(b.name));

  // Generate output
  const output = `// Auto-generated documentation data
// Generated on ${new Date().toISOString()}
// Package: ${packageJson.name} v${packageJson.version}
// Repository: ${packageJson.repository?.url || 'N/A'}
// License: ${packageJson.license || 'N/A'}
// Author: ${typeof packageJson.author === 'string' ? packageJson.author : packageJson.author?.name || 'N/A'}

const functionsData = ${JSON.stringify(allFunctions, null, 2)};

const constantsData = ${JSON.stringify(allConstants, null, 2)};

// Package information
const packageInfo = ${JSON.stringify({
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    license: packageJson.license,
    repository: packageJson.repository,
    homepage: packageJson.homepage,
    bugs: packageJson.bugs
  }, null, 2)};

// Export for use in documentation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { functionsData, constantsData, packageInfo };
}`;

  // Ensure output directory exists
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write output file
  fs.writeFileSync(CONFIG.outputFile, output, 'utf-8');

  console.log(`\n✅ Generated documentation for ${allFunctions.length} functions and ${allConstants.length} constants`);
  console.log(`📁 Output written to ${CONFIG.outputFile}`);

  // Summary by category
  const categoryCounts = {};
  allFunctions.forEach(func => {
    categoryCounts[func.category] = (categoryCounts[func.category] || 0) + 1;
  });

  console.log('\nFunctions by category:');
  Object.entries(categoryCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });

  if (allConstants.length > 0) {
    console.log(`\nConstants: ${allConstants.length}`);
  }
}

// Run the script
main();