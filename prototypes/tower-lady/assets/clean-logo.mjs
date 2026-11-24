// Remove the detached start of the next tower level and the mockup divider.
// Keep the original artwork for provenance and preserve all crop coordinates.
import sharp from "sharp";
import { copyFile } from "node:fs/promises";

const source = new URL("./brand-artwork.webp", import.meta.url);
const output = new URL("./brand-artwork-clean.webp", import.meta.url);
const cleanup = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1487" height="1058">
  <path fill="#000" d="M1055 609H1205L1220 624H1055Z"/>
  <!-- Prevent the mockup's divider from bleeding into the small CSS mask. -->
  <path fill="#000" d="M795 624H1295V626H795Z"/>
</svg>`);

await sharp(source.pathname)
  .composite([{ input: cleanup }])
  .webp({ lossless: true })
  .toFile(output.pathname);
await copyFile(output, new URL("../../tower-lady-ograf/assets/brand-artwork.webp", import.meta.url));
console.log("Updated the website artwork and its self-contained OGraf copy.");
