import path from 'path';

import { DocsParser, type DocsData } from './docs-parser';

/**
 * Generate documentation data for the website
 * This function is called at build time to extract docs from source files
 */
export async function generateDocsData() {
  // Project root is one level up from docs folder
  const projectRoot = path.resolve(process.cwd(), '..');
  const parser = new DocsParser(projectRoot);
  
  try {
    const docsData = await parser.parseAll();
    return docsData;
  } catch (error) {
    console.error('Error generating documentation data:', error);
    throw error;
  }
}

/**
 * Get cached or generate documentation data
 * Used for static generation and server-side rendering
 */
let cachedDocsData: DocsData | null = null;

export async function getDocsData() {
  if (!cachedDocsData) {
    cachedDocsData = await generateDocsData();
  }
  return cachedDocsData;
}
