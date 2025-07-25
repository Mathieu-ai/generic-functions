import { writeFileSync } from 'fs';
import { generateDocsData } from '../src/lib/generate-docs';

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
