// Generate public/logo.png from public/logo.svg and public/favicon.ico from public/favicon.svg
// The .ico comes from the simplified 32px mark so it stays legible in a browser tab.
// Usage: node scripts/generate-logo.mjs
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const logoSvgPath = resolve(root, 'public/logo.svg')
const faviconSvgPath = resolve(root, 'public/favicon.svg')
const pngPath = resolve(root, 'public/logo.png')
const icoPath = resolve(root, 'public/favicon.ico')

const png512 = await sharp(logoSvgPath).resize(512, 512).png().toBuffer()
await writeFile(pngPath, png512)
console.log(`Wrote ${pngPath}`)

const sizes = [16, 32, 48, 64]
const pngs = await Promise.all(
  sizes.map((size) => sharp(faviconSvgPath).resize(size, size).png().toBuffer())
)

const ico = await pngToIco(pngs)
await writeFile(icoPath, ico)
console.log(`Wrote ${icoPath} (${ico.length} bytes) with sizes: ${sizes.join(', ')}`)
