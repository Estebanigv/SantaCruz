const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// Critical images that need optimization
const criticalImages = [
  { input: 'public/images/principal.png', output: 'public/images/principal-optimized.webp', maxWidth: 1920, quality: 85 },
  { input: 'public/images/Telferico.png', output: 'public/images/Telferico-optimized.webp', maxWidth: 1920, quality: 85 },
  { input: 'public/images/Uva.png', output: 'public/images/Uva-optimized.webp', maxWidth: 1920, quality: 85 },
  { input: 'public/images/Uva2.png', output: 'public/images/Uva2-optimized.webp', maxWidth: 1920, quality: 85 },
  { input: 'public/images/Uva3.png', output: 'public/images/Uva3-optimized.webp', maxWidth: 1920, quality: 85 },
  { input: 'public/images/Gris Fondo.png', output: 'public/images/Gris-Fondo-optimized.webp', maxWidth: 1920, quality: 85 },
]

// Logo images optimization
const logoImages = [
  { input: 'public/images/Logotipos/Colchagua Vino y Ruta - blanco.png', output: 'public/images/Logotipos/Colchagua-Vino-Ruta-blanco.webp', maxWidth: 800, quality: 90 },
  { input: 'public/images/Logotipos/Colchagua Vino y Ruta - color.png', output: 'public/images/Logotipos/Colchagua-Vino-Ruta-color.webp', maxWidth: 800, quality: 90 },
  { input: 'public/images/Logotipos/Energia Solar - blanco.png', output: 'public/images/Logotipos/Energia-Solar-blanco.webp', maxWidth: 800, quality: 90 },
  { input: 'public/images/Logotipos/Energia Solar - cafe.png', output: 'public/images/Logotipos/Energia-Solar-cafe.webp', maxWidth: 800, quality: 90 },
  { input: 'public/images/Logotipos/Logo Viña Blanco V Horizontal.png', output: 'public/images/Logotipos/Logo-Vina-Blanco-H.webp', maxWidth: 600, quality: 90 },
  { input: 'public/images/Logotipos/Logo Viña Blanco.png', output: 'public/images/Logotipos/Logo-Vina-Blanco.webp', maxWidth: 600, quality: 90 },
  { input: 'public/images/Logotipos/Logo Viña Color V Horizontal.png', output: 'public/images/Logotipos/Logo-Vina-Color-H.webp', maxWidth: 600, quality: 90 },
  { input: 'public/images/Logotipos/Logo Viña Color.png', output: 'public/images/Logotipos/Logo-Vina-Color.webp', maxWidth: 600, quality: 90 },
  { input: 'public/images/Logotipos/isotipo viña blanco.png', output: 'public/images/Logotipos/isotipo-vina-blanco.webp', maxWidth: 400, quality: 90 },
  { input: 'public/images/Logotipos/Wine of Chile logo.png', output: 'public/images/Logotipos/Wine-of-Chile.webp', maxWidth: 600, quality: 90 },
]

async function optimizeImage(config) {
  const { input, output, maxWidth, quality } = config

  try {
    const inputPath = path.join(__dirname, '..', input)
    const outputPath = path.join(__dirname, '..', output)

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${input} - File not found`)
      return
    }

    const inputStats = fs.statSync(inputPath)
    const inputSizeMB = (inputStats.size / (1024 * 1024)).toFixed(2)

    console.log(`🔄 Processing: ${input} (${inputSizeMB}MB)`)

    await sharp(inputPath)
      .resize(maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality })
      .toFile(outputPath)

    const outputStats = fs.statSync(outputPath)
    const outputSizeMB = (outputStats.size / (1024 * 1024)).toFixed(2)
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)

    console.log(`✅ Created: ${output} (${outputSizeMB}MB) - ${reduction}% reduction`)
  } catch (error) {
    console.error(`❌ Error processing ${input}:`, error.message)
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n')
  console.log('📊 CRITICAL IMAGES:\n')

  for (const config of criticalImages) {
    await optimizeImage(config)
  }

  console.log('\n📊 LOGO IMAGES:\n')

  for (const config of logoImages) {
    await optimizeImage(config)
  }

  console.log('\n✨ Image optimization complete!')
  console.log('\n⚠️  NEXT STEPS:')
  console.log('1. Update component imports to use new .webp files')
  console.log('2. Test all pages to ensure images load correctly')
  console.log('3. Delete old .png files after verification')
}

main()
