#!/usr/bin/env node

/**
 * Script to extract function documentation from TypeScript source files
 * and generate the functions-data.js file for the documentation website
 */

// SECTION - Dependencies and Imports
const fs = require('fs');
const path = require('path');

// ANCHOR - TypeScript Loader
// Lazy load TypeScript with better error handling
const loadTypeScript = () => {
  try {
    return require('typescript');
  } catch (error) {
    console.error('TypeScript is required for documentation extraction. Please install it:');
    console.error('npm install --save-dev typescript');
    process.exit(1);
  }
};

// SECTION - Configuration
// ANCHOR - Main Configuration Object
const CONFIG = {
  srcDirs: ['src/core', 'src/utils'],
  constantsDirs: ['src/constants'], // Now supports multiple directories
  outputFile: 'docs/functions-data.js',
  packageJsonPath: path.join(__dirname, '..', 'package.json'),
  ignoredFunctionFiles: new Set(['index.ts', 'index.js']), // Only for function files
  ignoredFunctions: new Set([]),
  defaultVersion: '1.0.0',
  jsdocPatterns: {
    param: /@param\s+(?:\{([^}]+)\})?\s*(\[?\w+\]?)\s*-?\s*(.+)/,
    returns: /@returns?\s+(?:\{([^}]+)\})?\s*-?\s*(.+)/,
    since: /@since\s+(.+)/
  }
};

// SECTION - Global Caches
// Cache for package.json data
let packageJsonCache = null;

// Cache for existing functions data (for versioning)
let existingFunctionsCache = null;

// SECTION - Data Loading Functions
// ANCHOR - Existing Functions Loader
/**
 * Load existing functions data for versioning
 * @returns {Object} Map of existing functions with their versions
 */
const loadExistingFunctions = () => {
  if (existingFunctionsCache !== null) return existingFunctionsCache;
  
  existingFunctionsCache = {};
  
  try {
    if (fs.existsSync(CONFIG.outputFile)) {
      const content = fs.readFileSync(CONFIG.outputFile, 'utf8');
      // Extract functionsData array from the file
      const match = content.match(/const functionsData = (\[[\s\S]*?\]);/);
      if (match) {
        // FIXME - Using eval() is potentially unsafe - consider using JSON.parse with safer parsing
        const functionsData = eval(match[1]);
        // Create a map for quick lookup
        functionsData.forEach(func => {
          existingFunctionsCache[`${func.category}:${func.name}`] = func.since;
        });
      }
    }
  } catch (error) {
    console.warn(`Could not load existing functions data: ${error.message}`);
  }
  
  return existingFunctionsCache;
};

// ANCHOR - Package JSON Loader
/**
 * Load and cache package.json data
 * @returns {Object} Package JSON data
 */
const loadPackageJson = () => {
  if (packageJsonCache) return packageJsonCache;
  
  try {
    packageJsonCache = JSON.parse(fs.readFileSync(CONFIG.packageJsonPath, 'utf8'));
    return packageJsonCache;
  } catch (error) {
    console.error(`Failed to load package.json: ${error.message}`);
    // NOTE - Returning default values to prevent crashes when package.json is missing
    return {
      name: 'unknown',
      version: CONFIG.defaultVersion,
      description: '',
      author: '',
      license: '',
      repository: {},
      homepage: '',
      bugs: {}
    };
  }
};

// SECTION - JSDoc Parsing
// ANCHOR - JSDoc Tag Parser
/**
 * Parse a single JSDoc tag line
 * @param {string} content - Tag content
 * @param {Object} result - Result object to update
 * @param {string[]} exampleLines - Example lines array
 * @returns {string} Current section name
 */
const parseJSDocTag = (content, result, exampleLines) => {
  // TODO - Add support for more JSDoc tags like @deprecated, @throws, @see
  if (content.startsWith('@param')) {
    const match = content.match(CONFIG.jsdocPatterns.param);
    if (match) {
      const [, type, name, description] = match;
      result.params.push({
        name: name.replace(/[\[\]]/g, ''),
        type: type || 'any',
        description: description.trim(),
        optional: name.includes('[')
      });
    }
    return 'param';
  }
  
  if (content.startsWith('@returns') || content.startsWith('@return')) {
    const match = content.match(CONFIG.jsdocPatterns.returns);
    if (match) {
      const [, type, description] = match;
      result.returns = {
        type: type || 'any',
        description: description.trim()
      };
    }
    return 'returns';
  }
  
  if (content.startsWith('@example')) {
    exampleLines.length = 0; // Clear array
    return 'example';
  }
  
  if (content.startsWith('@since')) {
    const match = content.match(CONFIG.jsdocPatterns.since);
    if (match) {
      result.since = match[1].trim();
    }
    return 'since';
  }
  
  if (content.startsWith('@')) {
    return 'other';
  }
  
  return null;
};

// ANCHOR - Main JSDoc Parser
/**
 * Parse JSDoc comment text
 * @param {string} jsDocText - Raw JSDoc text
 * @returns {Object} Parsed JSDoc data
 */
const parseJSDoc = (jsDocText) => {
  if (!jsDocText) return {};

  const packageData = loadPackageJson();
  const result = {
    description: '',
    params: [],
    returns: null,
    example: '',
    since: packageData.version || CONFIG.defaultVersion
  };

  const lines = jsDocText.split('\n').map(line => line.trim());
  let currentSection = 'description';
  const exampleLines = [];

  for (const line of lines) {
    if (line === '*' || line === '/**' || line === '*/') continue;

    const content = line.replace(/^\*\s?/, '');
    const tagSection = parseJSDocTag(content, result, exampleLines);
    
    if (tagSection) {
      currentSection = tagSection;
      continue;
    }

    // Add content to current section
    switch (currentSection) {
      case 'description':
        if (content) {
          result.description = result.description 
            ? `${result.description} ${content}` 
            : content;
        }
        break;
      case 'example':
        exampleLines.push(content);
        break;
      case 'returns':
        if (result.returns && content) {
          result.returns.description = `${result.returns.description} ${content}`;
        }
        break;
      case 'param':
        if (result.params.length > 0 && content) {
          const lastParam = result.params[result.params.length - 1];
          lastParam.description = `${lastParam.description} ${content}`;
        }
        break;
    }
  }

  // Process example
  if (exampleLines.length > 0) {
    result.example = exampleLines
      .filter(line => !line.match(/^```/))
      .join('\n')
      .trim();
  }

  return result;
};

// SECTION - TypeScript AST Processing
// ANCHOR - Function Signature Extractor
/**
 * Extract function signature from AST node
 * @param {Object} node - TypeScript AST node
 * @param {Object} sourceFile - TypeScript source file
 * @returns {Object} Function signature data
 */
const extractFunctionSignature = (node, sourceFile) => {
  const params = node.parameters.map(param => ({
    name: param.name.getText(sourceFile),
    type: param.type ? param.type.getText(sourceFile) : 'any',
    optional: !!param.questionToken || !!param.initializer
  }));

  const returnType = node.type ? node.type.getText(sourceFile) : 'any';
  const functionName = node.name ? node.name.getText(sourceFile) : 'anonymous';
  
  const paramsStr = params
    .map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`)
    .join(', ');
  
  const syntax = `${functionName}(${paramsStr}): ${returnType}`;

  return { params, returnType, syntax };
};

// ANCHOR - JSDoc Text Extractor
/**
 * Extract JSDoc text from a node
 * @param {Object} node - TypeScript AST node
 * @param {string} fileContent - File content
 * @param {Object} ts - TypeScript module
 * @returns {string} JSDoc text
 */
const extractJSDocText = (node, fileContent, ts) => {
  const jsDocNodes = ts.getJSDocCommentsAndTags(node);
  if (jsDocNodes.length === 0) return '';
  
  const { pos, end } = jsDocNodes[0];
  return fileContent.substring(pos, end);
};

// SECTION - Function Processing
// ANCHOR - Function Node Processor
/**
 * Process a function node and extract documentation
 * @param {string} functionName - Function name
 * @param {Object} node - Function node
 * @param {Object} sourceFile - Source file
 * @param {string} fileContent - File content
 * @param {string} category - Function category
 * @param {Object} ts - TypeScript module
 * @returns {Object|null} Function documentation object
 */
const processFunctionNode = (functionName, node, sourceFile, fileContent, category, ts) => {
  if (CONFIG.ignoredFunctions.has(functionName)) return null;

  const jsDocText = extractJSDocText(node, fileContent, ts);
  const jsDoc = parseJSDoc(jsDocText);
  const signature = extractFunctionSignature(node, sourceFile);

  // Override anonymous function name
  if (signature.syntax.includes('anonymous')) {
    signature.syntax = signature.syntax.replace('anonymous', functionName);
  }

  const mergedParams = signature.params.map(param => {
    const jsDocParam = jsDoc.params.find(p => p.name === param.name);
    return {
      name: param.name,
      type: param.type,
      description: jsDocParam?.description || `The ${param.name} parameter`,
      optional: param.optional
    };
  });

  // Check for existing version
  const existingFunctions = loadExistingFunctions();
  const functionKey = `${category}:${functionName}`;
  const existingVersion = existingFunctions[functionKey];
  
  return {
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
    since: existingVersion || jsDoc.since // Preserve existing version if available
  };
};

// ANCHOR - TypeScript File Processor
/**
 * Process a TypeScript file and extract functions
 * @param {string} filePath - File path
 * @returns {Array} Array of function documentation objects
 */
const processFile = (filePath) => {
  const ts = loadTypeScript();
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

  // ANCHOR - AST Visitor Function
  const visit = (node) => {
    const hasExportModifier = node.modifiers?.some(
      modifier => modifier.kind === ts.SyntaxKind.ExportKeyword
    );

    if (!hasExportModifier) {
      ts.forEachChild(node, visit);
      return;
    }

    // Handle function declarations
    if (ts.isFunctionDeclaration(node) && node.name) {
      const functionDoc = processFunctionNode(
        node.name.getText(sourceFile),
        node,
        sourceFile,
        fileContent,
        category,
        ts
      );
      if (functionDoc) functions.push(functionDoc);
    }

    // Handle variable statements (arrow functions, function expressions)
    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach(declaration => {
        const { initializer } = declaration;
        if (initializer && 
            (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer))) {
          const functionDoc = processFunctionNode(
            declaration.name.getText(sourceFile),
            initializer,
            sourceFile,
            fileContent,
            category,
            ts
          );
          if (functionDoc) functions.push(functionDoc);
        }
      });
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return functions;
};

// SECTION - Constants Processing
// ANCHOR - Enhanced Constants File Processor
/**
 * Process a constants file with deep nested object support
 * @param {string} filePath - Constants file path
 * @param {string} category - Category name
 * @returns {Array} Array of constant documentation objects with hierarchy
 */
const processConstantsFile = (filePath, category) => {
  const ts = loadTypeScript();
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const constants = [];
  const packageData = loadPackageJson();

  // ANCHOR - Deep Object Parser
  /**
   * Parse deep nested objects and arrays
   * @param {Object} obj - Object to parse
   * @param {string} path - Current path in dot notation
   * @param {number} level - Nesting level
   * @returns {Array} Array of parsed properties
   */
  const parseDeepObject = (obj, path = '', level = 0) => {
    const result = [];
    
    if (typeof obj !== 'object' || obj === null) {
      return [{
        path,
        value: obj,
        type: typeof obj,
        level
      }];
    }

    if (Array.isArray(obj)) {
      return [{
        path,
        value: obj,
        type: 'array',
        level,
        length: obj.length,
        preview: `[${obj.slice(0, 3).map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}${obj.length > 3 ? ', ...' : ''}]`
      }];
    }

    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Add the object itself
        result.push({
          path: currentPath,
          key,
          value: value,
          type: 'object',
          level,
          hasChildren: true,
          children: Object.keys(value).length
        });
        
        // Recursively parse children
        result.push(...parseDeepObject(value, currentPath, level + 1));
      } else {
        result.push({
          path: currentPath,
          key,
          value: value,
          type: Array.isArray(value) ? 'array' : typeof value,
          level,
          hasChildren: false,
          preview: Array.isArray(value) ? 
            `[${value.slice(0, 3).map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}${value.length > 3 ? ', ...' : ''}]` :
            typeof value === 'string' ? `"${value}"` : String(value)
        });
      }
    });

    return result;
  };

  // ANCHOR - Constants Visitor Function
  const visit = (node) => {
    if (ts.isVariableStatement(node)) {
      const hasExportModifier = node.modifiers?.some(
        modifier => modifier.kind === ts.SyntaxKind.ExportKeyword
      );

      if (hasExportModifier) {
        node.declarationList.declarations.forEach(declaration => {
          if (!declaration.initializer) return;

          const constantName = declaration.name.getText(sourceFile);
          const jsDocText = extractJSDocText(declaration, fileContent, ts);
          const jsDoc = parseJSDoc(jsDocText);

          try {
            // Try to evaluate the constant to get its structure
            const valueText = declaration.initializer.getText(sourceFile);
            let parsedValue = null;
            let hierarchy = [];

            // Handle common constant patterns
            if (valueText.includes('{') && valueText.includes('}')) {
              try {
                // Create a safer evaluation context
                const cleanedValue = valueText
                  .replace(/as const/g, '')
                  .replace(/\/\*[\s\S]*?\*\//g, '')
                  .replace(/\/\/.*$/gm, '');
                
                // Use Function constructor for safer evaluation
                parsedValue = new Function(`return ${cleanedValue}`)();
                hierarchy = parseDeepObject(parsedValue);
              } catch (error) {
                console.warn(`Could not parse constant ${constantName}: ${error.message}`);
              }
            }

            // Generate preview
            let preview = '';
            if (hierarchy.length > 0) {
              const topLevelKeys = hierarchy.filter(h => h.level === 0).slice(0, 5);
              preview = `{ ${topLevelKeys.map(h => h.key).join(', ')}${hierarchy.filter(h => h.level === 0).length > 5 ? ', ...' : ''} }`;
            } else {
              const valueText = declaration.initializer.getText(sourceFile);
              preview = valueText.length > 50 ? `${valueText.substring(0, 50)}...` : valueText;
            }

            // Check for existing version in constants
            const existingFunctions = loadExistingFunctions();
            const constantKey = `${category}:${constantName}`;
            const existingVersion = existingFunctions[constantKey];

            constants.push({
              name: constantName,
              type: 'constant',
              description: jsDoc.description || `${constantName} constant`,
              value: 'Object',
              preview,
              category,
              hierarchy: hierarchy.length > 0 ? hierarchy : null,
              hasHierarchy: hierarchy.length > 0,
              since: existingVersion || jsDoc.since || packageData.version || CONFIG.defaultVersion
            });
          } catch (error) {
            console.warn(`Error processing constant ${constantName}: ${error.message}`);
          }
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return constants;
};

// SECTION - Directory Processing
// ANCHOR - Function Directory Processor
/**
 * Process all files in a directory
 * @param {string} dirPath - Directory path
 * @returns {Array} Array of function documentation objects
 */
const processDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return [];
  }

  const functions = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    // Skip ignored function files (like index.ts for functions)
    if (CONFIG.ignoredFunctionFiles.has(file)) continue;

    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.js'))) {
      console.log(`Processing ${filePath}...`);
      try {
        functions.push(...processFile(filePath));
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
  }

  return functions;
};

// ANCHOR - Constants Directory Processor
/**
 * Process all constants files in a directory
 * @param {string} dirPath - Directory path
 * @returns {Array} Array of constant documentation objects
 */
const processConstantsDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Constants directory not found: ${dirPath}`);
    return [];
  }

  const constants = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    // Don't skip any files for constants - we want to process index.ts/index.js
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.js'))) {
      console.log(`Processing constants from ${filePath}...`);
      try {
        // Use filename (without extension) as category
        // For index files, use the parent directory name
        let category;
        if (file === 'index.ts' || file === 'index.js') {
          category = path.basename(dirPath);
        } else {
          category = path.basename(file, path.extname(file));
        }
        
        constants.push(...processConstantsFile(filePath, category));
      } catch (error) {
        console.error(`Error processing constants from ${filePath}:`, error.message);
      }
    }
  }

  return constants;
};

// SECTION - Output Generation
// ANCHOR - Output File Generator
/**
 * Generate output file content
 * @param {Array} functions - Functions array
 * @param {Array} constants - Constants array
 * @param {Object} packageJson - Package JSON data
 * @returns {string} Output file content
 */
const generateOutput = (functions, constants, packageJson) => {
  const timestamp = new Date().toISOString();
  const repoUrl = packageJson.repository?.url || 'N/A';
  const authorName = typeof packageJson.author === 'string' 
    ? packageJson.author 
    : packageJson.author?.name || 'N/A';

  const packageInfo = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    license: packageJson.license,
    repository: packageJson.repository,
    homepage: packageJson.homepage,
    bugs: packageJson.bugs
  };

  return `// Auto-generated documentation data
// Generated on ${timestamp}
// Package: ${packageJson.name} v${packageJson.version}
// Repository: ${repoUrl}
// License: ${packageJson.license || 'N/A'}
// Author: ${authorName}

const functionsData = ${JSON.stringify(functions, null, 2)};

const constantsData = ${JSON.stringify(constants, null, 2)};

// Package information
const packageInfo = ${JSON.stringify(packageInfo, null, 2)};

// Export for use in documentation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { functionsData, constantsData, packageInfo };
}`;
};

// SECTION - Main Execution
// ANCHOR - Main Function
/**
 * Main function to orchestrate documentation extraction
 */
const main = () => {
  console.log('Extracting function documentation...\n');

  const packageJson = loadPackageJson();
  
  // Process all source directories
  const allFunctions = CONFIG.srcDirs.flatMap(dir => processDirectory(dir));

  // Process all constants directories
  const allConstants = CONFIG.constantsDirs.flatMap(dir => processConstantsDirectory(dir));

  // Sort data
  allFunctions.sort((a, b) => {
    const categoryCompare = a.category.localeCompare(b.category);
    return categoryCompare !== 0 ? categoryCompare : a.name.localeCompare(b.name);
  });

  allConstants.sort((a, b) => {
    const categoryCompare = a.category.localeCompare(b.category);
    return categoryCompare !== 0 ? categoryCompare : a.name.localeCompare(b.name);
  });

  // Generate and write output
  const output = generateOutput(allFunctions, allConstants, packageJson);
  
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(CONFIG.outputFile, output, 'utf-8');

  // Display summary
  console.log(`\n✅ Generated documentation for ${allFunctions.length} functions and ${allConstants.length} constants`);
  console.log(`📁 Output written to ${CONFIG.outputFile}`);

  // Category summary for functions
  const functionCategoryCounts = allFunctions.reduce((acc, func) => {
    acc[func.category] = (acc[func.category] || 0) + 1;
    return acc;
  }, {});

  console.log('\nFunctions by category:');
  Object.entries(functionCategoryCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });

  // Category summary for constants
  const constantCategoryCounts = allConstants.reduce((acc, constant) => {
    acc[constant.category] = (acc[constant.category] || 0) + 1;
    return acc;
  }, {});

  if (Object.keys(constantCategoryCounts).length > 0) {
    console.log('\nConstants by category:');
    Object.entries(constantCategoryCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`);
      });
  }
};

// ANCHOR - Script Entry Point
// Run the script
main();