const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  // Wine backgrounds - these are the heaviest
  {
    input: 'public/images/Vinos/Make Make/Make Make Color.webp',
    output: 'public/images/Vinos/Make Make/Make Make Color.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Make Make/Make Make gris.webp',
    output: 'public/images/Vinos/Make Make/Make Make gris.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Chaman/Chaman_color.webp',
    output: 'public/images/Vinos/Chaman/Chaman_color.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Chaman/Chaman_gris.webp',
    output: 'public/images/Vinos/Chaman/Chaman_gris.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Tupu/Tupu Color.webp',
    output: 'public/images/Vinos/Tupu/Tupu Color.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Tupu/Tupu Gris.webp',
    output: 'public/images/Vinos/Tupu/Tupu Gris.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Santa Cruz/Santa Cruz Terrazas fondo color.webp',
    output: 'public/images/Vinos/Santa Cruz/Santa Cruz Terrazas fondo color.webp',
    width: 800,
    quality: 75
  },
  {
    input: 'public/images/Vinos/Santa Cruz/Santa Cruz Terrazas fondo gris.webp',
    output: 'public/images/Vinos/Santa Cruz/Santa Cruz Terrazas fondo gris.webp',
    width: 800,
    quality: 75
  },
  // Hero image
  {
    input: 'public/images/principal-optimized.webp',
    output: 'public/images/principal-optimized.webp',
    width: 1920,
    quality: 80
  },
  // Background watercolor
  {
    input: 'public/images/webp/backgorund vinos destacados.webp',
    output: 'public/images/webp/backgorund vinos destacados.webp',
    width: 1600,
    quality: 70
  }
];

async function optimizeImage(config) {
  const { input, output, width, quality } = config;

  try {
    const inputPath = path.join(process.cwd(), input);
    const outputPath = path.join(process.cwd(), output);

    // Get original size
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(1);

    // Create temp file path
    const tempPath = outputPath + '.tmp';

    // Process image
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality })
      .toFile(tempPath);

    // Replace original with optimized
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, outputPath);

    // Get new size
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(1);

    const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`✓ ${path.basename(input)}: ${originalSize} KB → ${newSize} KB (${savings}% smaller)`);

    return { success: true, savings: originalStats.size - newStats.size };
  } catch (error) {
    console.error(`✗ ${input}: ${error.message}`);
    return { success: false, savings: 0 };
  }
}

async function main() {
  console.log('🖼️  Optimizing images...\n');

  let totalSavings = 0;

  for (const config of imagesToOptimize) {
    const result = await optimizeImage(config);
    totalSavings += result.savings;
  }

  console.log(`\n✅ Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB`);
}

main();
