const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sizes = [120, 152, 167, 180]
const src = path.resolve(__dirname, '..', 'public', 'images', 'favicon-512.png')
const outDir = path.resolve(__dirname, '..', 'public', 'images')

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src)
  process.exit(1)
}

async function run() {
  for (const size of sizes) {
    const out = path.join(outDir, `apple-touch-${size}.png`)
    await sharp(src)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 90 })
      .toFile(out)
    console.log('Wrote', out)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
