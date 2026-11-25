// Derive the two website images from the approved artwork without re-rendering it.
import sharp from "sharp";

const source = new URL("./brand-artwork-clean.webp", import.meta.url);
const mark = new URL("./brand-mark.webp", import.meta.url);
const still = new URL("./saturday-cleaning-still.webp", import.meta.url);

// The old 500 x 580 viewport started at (795, 44) in the full mockup.
// Its clipped top-right corner contains navigation text, outside the emblem.
const clearCorner = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="580">
  <rect x="410" y="0" width="90" height="41" fill="#000"/>
</svg>`);

await sharp(source.pathname)
  .extract({ left: 795, top: 44, width: 500, height: 580 })
  .composite([{ input: clearCorner }])
  .webp({ lossless: true })
  .toFile(mark.pathname);

await sharp(source.pathname)
  .extract({ left: 979, top: 732, width: 443, height: 240 })
  .webp({ lossless: true })
  .toFile(still.pathname);

console.log("Extracted brand-mark.webp and saturday-cleaning-still.webp for the website.");
