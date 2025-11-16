import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

interface FaviconConfig {
  svgPath: string;
  outputDir: string;
  prefix: string;
}

const sizes = [
  { size: 16, filename: 'favicon-16x16.png' },
  { size: 32, filename: 'favicon-32x32.png' },
  { size: 180, filename: 'apple-touch-icon.png' }
];

async function generateFavicons(config: FaviconConfig): Promise<void> {
  // Create output directory
  fs.mkdirSync(config.outputDir, { recursive: true });

  for (const { size, filename } of sizes) {
    const outputPath = path.join(config.outputDir, filename);

    await sharp(config.svgPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✓ Generated ${filename} (${sizeKB}KB)`);
  }
}

// Main execution
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: ts-node generate-favicons.ts <svg-path> <output-dir> [prefix]');
  process.exit(1);
}

const config: FaviconConfig = {
  svgPath: args[0],
  outputDir: args[1],
  prefix: args[2] || ''
};

generateFavicons(config)
  .then(() => console.log('✅ Favicon generation complete'))
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
