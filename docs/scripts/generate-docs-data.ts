import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

async function generateDocsData() {
  try {
    // Try dynamic import first
    const { DocsParser } = await import('../src/lib/docs-parser');
    
    // Project root is one level up from docs folder
    const projectRoot = path.resolve(process.cwd(), '..');
    const parser = new DocsParser(projectRoot);
    
    const docsData = await parser.parseAll();
    return docsData;
  } catch (importError: unknown) {
    const errorMessage = importError instanceof Error ? importError.message : 'Unknown error';
    console.warn('Dynamic import failed, trying alternative approach:', errorMessage);
    
    // Fallback: try with file URL
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const docsParserPath = path.resolve(__dirname, '..', 'src', 'lib', 'docs-parser.js');
    const docsParserUrl = pathToFileURL(docsParserPath);
    
    const { DocsParser } = await import(docsParserUrl.href);
    
    // Project root is one level up from docs folder
    const projectRoot = path.resolve(process.cwd(), '..');
    const parser = new DocsParser(projectRoot);
    
    const docsData = await parser.parseAll();
    return docsData;
  }
}

async function main() {
  try {
    console.log('Generating documentation data...');
    const docsData = await generateDocsData();
    
    // Write the data to a JSON file that can be imported at build time
    const outputPath = './src/data/docs-data.json';
    writeFileSync(outputPath, JSON.stringify(docsData, null, 2));
    
    console.log(`✅ Documentation data generated successfully!`);
    console.log(`📊 Generated ${docsData.functions.length} functions, ${docsData.constants.length} constants, ${docsData.types.length} types`);
    console.log(`💾 Data written to ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating documentation data:', error);
    process.exit(1);
  }
}

main();
