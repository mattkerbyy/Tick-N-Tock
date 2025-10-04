// Generates multi-size favicon.ico (16,24,32,48,64,96,128,256)
// Usage: node scripts/generate-favicon-ico.js
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function main() {
  const publicImages = path.join(__dirname, '..', 'public', 'images')
  if (!fs.existsSync(publicImages))
    fs.mkdirSync(publicImages, { recursive: true })

  const candidates = [path.join(publicImages, 'favicon.png')]
  const src = candidates.find((p) => fs.existsSync(p))
  if (!src) {
    console.error(
      'No source image found. Please add a master image at public/images/favicon.png (or one of the candidates).',
    )
    process.exit(1)
  }

  const sizes = [16, 24, 32, 48, 64, 96, 128, 256]
  const buffers = []

  for (const s of sizes) {
    try {
      const buf = await sharp(src)
        .resize({
          width: s,
          height: s,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer()
      buffers.push({ size: s, buf })
      console.log('Prepared', s)
    } catch (err) {
      console.error('Failed to prepare size', s, err)
      process.exit(1)
    }
  }

  // Build ICO file
  const count = buffers.length
  const ICONDIR = Buffer.alloc(6)
  ICONDIR.writeUInt16LE(0, 0)
  ICONDIR.writeUInt16LE(1, 2) // type ICO
  ICONDIR.writeUInt16LE(count, 4)

  const entries = []
  let offset = 6 + count * 16
  for (const item of buffers) {
    const { size, buf } = item
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // color palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(0, 4) // color planes
    entry.writeUInt16LE(0, 6) // bpp
    entry.writeUInt32LE(buf.length, 8) // size
    entry.writeUInt32LE(offset, 12) // offset
    entries.push(entry)
    offset += buf.length
  }

  const outPath = path.join(publicImages, 'favicon.ico')
  const content = Buffer.concat([
    ICONDIR,
    ...entries,
    ...buffers.map((b) => b.buf),
  ])
  fs.writeFileSync(outPath, content)
  console.log('Wrote', outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
