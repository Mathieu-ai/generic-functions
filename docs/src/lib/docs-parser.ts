import fs from 'fs';
import path from 'path';

export interface DocFunction {
  name: string;
  category: string;
  description: string;
  syntax: string;
  params: Array<{
    name: string;
    type: string;
    description: string;
    optional: boolean;
  }>;
  returns: {
    type: string;
    description: string;
  };
  example: string;
  since: string;
  sourceFile: string;
}

export interface DocConstant {
  name: string;
  category: string;
  description: string;
  type: string;
  value: string;
  since: string;
  sourceFile: string;
}

export interface DocType {
  name: string;
  category: string;
  description: string;
  definition: string;
  properties?: Array<{
    name: string;
    type: string;
    description?: string;
    optional: boolean;
  }>;
  since: string;
  sourceFile: string;
}

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
  repository: {
    type: string;
    url: string;
  };
  license: string;
  homepage: string;
  keywords: string[];
}

export interface DocsData {
  functions: DocFunction[];
  constants: DocConstant[];
  types: DocType[];
  packageInfo: PackageInfo;
}

class DocsParser {
  private srcPath: string;
  private packageJsonPath: string;

  constructor(projectRoot: string) {
    this.srcPath = path.join(projectRoot, 'src');
    this.packageJsonPath = path.join(projectRoot, 'package.json');
  }

  /**
   * Parse all documentation from source files
   */
  async parseAll(): Promise<DocsData> {
    const [functions, constants, types, packageInfo] = await Promise.all([
      this.parseFunctions(),
      this.parseConstants(),
      this.parseTypes(),
      this.parsePackageInfo(),
    ]);

    return {
      functions,
      constants,
      types,
      packageInfo,
    };
  }

  /**
   * Parse package.json for project information
   */
  private async parsePackageInfo(): Promise<PackageInfo> {
    try {
      const content = await fs.promises.readFile(this.packageJsonPath, 'utf8');
      const pkg = JSON.parse(content);
      
      return {
        name: pkg.name || '',
        version: pkg.version || '',
        description: pkg.description || '',
        author: pkg.author || { name: '', email: '', url: '' },
        repository: pkg.repository || { type: '', url: '' },
        license: pkg.license || '',
        homepage: pkg.homepage || '',
        keywords: pkg.keywords || [],
      };
    } catch (error) {
      console.error('Error parsing package.json:', error);
      return {
        name: '',
        version: '',
        description: '',
        author: { name: '', email: '', url: '' },
        repository: { type: '', url: '' },
        license: '',
        homepage: '',
        keywords: [],
      };
    }
  }

  /**
   * Parse functions from TypeScript source files
   */
  private async parseFunctions(): Promise<DocFunction[]> {
    const functions: DocFunction[] = [];
    const coreFiles = await this.getFilesInDirectory(path.join(this.srcPath, 'core'));
    const utilFiles = await this.getFilesInDirectory(path.join(this.srcPath, 'utils'));
    
    const allFiles = [...coreFiles, ...utilFiles];

    for (const file of allFiles) {
      if (file.endsWith('.ts')) {
        const content = await fs.promises.readFile(file, 'utf8');
        const fileFunctions = this.extractFunctions(content, file);
        functions.push(...fileFunctions);
      }
    }

    return functions;
  }

  /**
   * Parse constants from TypeScript source files
   */
  private async parseConstants(): Promise<DocConstant[]> {
    const constants: DocConstant[] = [];
    const constantsFile = path.join(this.srcPath, 'constants', 'index.ts');
    
    try {
      const content = await fs.promises.readFile(constantsFile, 'utf8');
      const fileConstants = this.extractConstants(content, constantsFile);
      constants.push(...fileConstants);
    } catch (error) {
      console.error('Error parsing constants:', error);
    }

    return constants;
  }

  /**
   * Parse types/interfaces from TypeScript source files
   */
  private async parseTypes(): Promise<DocType[]> {
    const types: DocType[] = [];
    const coreFiles = await this.getFilesInDirectory(path.join(this.srcPath, 'core'));
    const utilFiles = await this.getFilesInDirectory(path.join(this.srcPath, 'utils'));
    
    const allFiles = [...coreFiles, ...utilFiles];

    for (const file of allFiles) {
      if (file.endsWith('.ts')) {
        const content = await fs.promises.readFile(file, 'utf8');
        const fileTypes = this.extractTypes(content, file);
        types.push(...fileTypes);
      }
    }

    return types;
  }

  /**
   * Extract functions with JSDoc comments from file content
   */
  private extractFunctions(content: string, filePath: string): DocFunction[] {
    const functions: DocFunction[] = [];
    const category = this.getCategoryFromPath(filePath);
    
    // Split content into lines for better processing
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for export function declarations
      if (line.startsWith('export function ')) {
        const functionMatch = line.match(/export\s+function\s+(\w+)/);
        if (functionMatch) {
          const functionName = functionMatch[1];
          
          // Look backwards to find the associated JSDoc comment
          const jsdocLines: string[] = [];
          let j = i - 1;
          
          // Skip any whitespace lines above the function
          while (j >= 0 && lines[j].trim() === '') {
            j--;
          }
          
          // Check if the line above is the end of a JSDoc comment
          if (j >= 0 && lines[j].trim() === '*/') {
            const jsdocEnd = j;
            
            // Find the start of the JSDoc comment
            while (j >= 0 && !lines[j].trim().startsWith('/**')) {
              j--;
            }
            
            if (j >= 0 && lines[j].trim().startsWith('/**')) {
              // Extract the JSDoc comment
              for (let k = j; k <= jsdocEnd; k++) {
                jsdocLines.push(lines[k]);
              }
              
              const jsdocComment = jsdocLines.join('\n');
              const docFunction = this.parseJSDocFunction(jsdocComment, functionName, category, filePath);
              if (docFunction) {
                functions.push(docFunction);
              }
            }
          }
        }
      }
    }

    return functions;
  }

  /**
   * Extract constants from file content
   */
  private extractConstants(content: string, filePath: string): DocConstant[] {
    const constants: DocConstant[] = [];
    const category = 'constants';
    
    // Improved regex to match const exports with JSDoc, handling multi-line objects
    const constRegex = /\/\*\*[\s\S]*?\*\/\s*export\s+const\s+(\w+)\s*=\s*([\s\S]*?)(?=\n\/\*\*|\nexport|\n\n|$)/g;
    
    let match;
    while ((match = constRegex.exec(content)) !== null) {
      const constName = match[1];
      let constValue = match[2].trim();
      
      // Clean up the value - remove trailing semicolons and extra whitespace
      constValue = constValue.replace(/;\s*$/, '').trim();
      
      // Find the JSDoc comment for this constant
      const jsdocPattern = new RegExp(`\\/\\*\\*[\\s\\S]*?\\*\\/\\s*export\\s+const\\s+${constName}`, 'g');
      const jsdocMatch = content.match(jsdocPattern);
      
      if (jsdocMatch) {
        const jsdocContent = jsdocMatch[0];
        const docConstant = this.parseJSDocConstant(jsdocContent, constName, constValue, category, filePath);
        if (docConstant) {
          constants.push(docConstant);
        }
      }
    }

    return constants;
  }

  /**
   * Extract types/interfaces from file content
   */
  private extractTypes(content: string, filePath: string): DocType[] {
    const types: DocType[] = [];
    const category = this.getCategoryFromPath(filePath);
    
    // Regex to match interfaces and type aliases with JSDoc
    const typeRegex = /\/\*\*[\s\S]*?\*\/\s*export\s+(interface|type)\s+(\w+)[\s\S]*?(?=\/\*\*|export|$)/g;
    
    let match;
    while ((match = typeRegex.exec(content)) !== null) {
      const jsdocAndType = match[0];
      const typeKind = match[1]; // 'interface' or 'type'
      const typeName = match[2];
      
      const docType = this.parseJSDocType(jsdocAndType, typeName, typeKind, category, filePath);
      if (docType) {
        types.push(docType);
      }
    }

    return types;
  }

  /**
   * Parse JSDoc comment for a function
   */
  private parseJSDocFunction(content: string, name: string, category: string, filePath: string): DocFunction | null {
    const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (!jsdocMatch) return null;

    const jsdoc = jsdocMatch[1];
    
    // Extract description (first non-tag line)
    const descriptionMatch = jsdoc.match(/\*\s*([^@\n][^\n]*)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    // Extract @param tags
    const paramMatches = jsdoc.match(/\*\s*@param\s+\{([^}]+)\}\s+(\[?(\w+)\]?)\s*-?\s*(.*)/g) || [];
    const params = paramMatches.map(paramStr => {
      const match = paramStr.match(/\*\s*@param\s+\{([^}]+)\}\s+(\[?(\w+)\]?)\s*-?\s*(.*)/);
      if (!match) return null;
      
      const [, type, fullParam, paramName, desc] = match;
      const optional = fullParam.startsWith('[') && fullParam.endsWith(']');
      
      return {
        name: paramName,
        type: type.trim(),
        description: desc.trim(),
        optional,
      };
    }).filter(Boolean);

    // Extract @returns tag
    const returnsMatch = jsdoc.match(/\*\s*@returns\s+\{([^}]+)\}\s+(.*)/);
    const returns = returnsMatch ? {
      type: returnsMatch[1].trim(),
      description: returnsMatch[2].trim(),
    } : { type: 'void', description: '' };

    // Extract @example tag with simplified pattern
    const exampleMatch = jsdoc.match(/\*\s*@example\s*([\s\S]*?)(?=\*\s*@(?!example)|$)/);
    let example = '';
    if (exampleMatch) {
      // Clean up the example text by removing asterisks and preserving code structure
      example = exampleMatch[1]
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '')) // Remove leading asterisks
        .filter(line => line.trim() !== '') // Remove empty lines
        .join('\n')
        .trim();
    }

    // Extract @since tag
    const sinceMatch = jsdoc.match(/\*\s*@since\s+(\S+)/);
    const since = sinceMatch ? sinceMatch[1] : '';

    // Extract function signature
    const funcMatch = content.match(/export\s+function\s+\w+[^{]*(?:\{|;)/);
    const syntax = funcMatch ? funcMatch[0].replace(/export\s+function\s+/, '').replace(/\s*\{|\s*;$/, '') : '';

    return {
      name,
      category,
      description,
      syntax,
      params: params.filter((p): p is NonNullable<typeof p> => p !== null),
      returns,
      example,
      since,
      sourceFile: this.getRelativeSourcePath(filePath),
    };
  }

  /**
   * Parse JSDoc comment for a constant
   */
  private parseJSDocConstant(content: string, name: string, value: string, category: string, filePath: string): DocConstant | null {
    const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (!jsdocMatch) return null;

    const jsdoc = jsdocMatch[1];
    
    // Extract description
    const descriptionMatch = jsdoc.match(/\*\s*([^@\n][^\n]*)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    // Extract @since tag
    const sinceMatch = jsdoc.match(/\*\s*@since\s+(\S+)/);
    const since = sinceMatch ? sinceMatch[1] : '';

    return {
      name,
      category,
      description,
      type: 'const',
      value,
      since,
      sourceFile: this.getRelativeSourcePath(filePath),
    };
  }

  /**
   * Parse JSDoc comment for a type/interface
   */
  private parseJSDocType(content: string, name: string, kind: string, category: string, filePath: string): DocType | null {
    const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (!jsdocMatch) return null;

    const jsdoc = jsdocMatch[1];
    
    // Extract description
    const descriptionMatch = jsdoc.match(/\*\s*([^@\n][^\n]*)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    // Extract @since tag
    const sinceMatch = jsdoc.match(/\*\s*@since\s+(\S+)/);
    const since = sinceMatch ? sinceMatch[1] : '';

    // Extract type/interface definition
    const typeMatch = content.match(new RegExp(`export\\s+${kind}\\s+${name}[\\s\\S]*?(?=\\/\\*\\*|export|$)`));
    const definition = typeMatch ? typeMatch[0].replace(/export\s+/, '') : '';

    // Extract properties for interfaces
    let properties: Array<{
      name: string;
      type: string;
      optional: boolean;
      description: string;
    }> = [];
    if (kind === 'interface') {
      const propMatches = definition.match(/(\w+)(\?)?\s*:\s*([^;]+);/g) || [];
      properties = propMatches.map(propStr => {
        const match = propStr.match(/(\w+)(\?)?\s*:\s*([^;]+);/);
        if (!match) return null;
        
        const [, propName, optional, propType] = match;
        return {
          name: propName,
          type: propType.trim(),
          optional: !!optional,
          description: '',
        };
      }).filter((prop): prop is NonNullable<typeof prop> => prop !== null);
    }

    return {
      name,
      category,
      description,
      definition,
      properties: properties.length > 0 ? properties : undefined,
      since,
      sourceFile: this.getRelativeSourcePath(filePath),
    };
  }

  /**
   * Get category from file path
   */
  private getCategoryFromPath(filePath: string): string {
    const basename = path.basename(filePath, '.ts');
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (normalizedPath.includes('/core/')) {
      return basename;
    }
    if (normalizedPath.includes('/utils/')) {
      return 'utils';
    }
    return 'other';
  }

  /**
   * Get relative source path for display
   */
  private getRelativeSourcePath(filePath: string): string {
    const projectRoot = path.dirname(this.packageJsonPath);
    return path.relative(projectRoot, filePath).replace(/\\/g, '/');
  }

  /**
   * Get all files in a directory recursively
   */
  private async getFilesInDirectory(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const subFiles = await this.getFilesInDirectory(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
    
    return files;
  }
}

export { DocsParser };
