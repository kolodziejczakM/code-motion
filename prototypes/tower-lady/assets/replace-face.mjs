// Fit the actual reference face into the original head, without redrawing it.
import sharp from "sharp";
import assert from "node:assert/strict";

async function faceComponent(path, seed) {
  const { data, info } = await sharp(path).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const light = index => Math.max(data[index * 3], data[index * 3 + 1], data[index * 3 + 2]);
  const mask = new Uint8Array(info.width * info.height);
  const pixels = [seed[1] * info.width + seed[0]];
  assert.ok(light(pixels[0]) > 100, "Face seed must be inside the ivory skin.");
  mask[pixels[0]] = 1;
  const bounds = { left: info.width, top: info.height, right: 0, bottom: 0 };
  for (let cursor = 0; cursor < pixels.length; cursor++) {
    const index = pixels[cursor], x = index % info.width, y = Math.floor(index / info.width);
    bounds.left = Math.min(bounds.left, x); bounds.right = Math.max(bounds.right, x);
    bounds.top = Math.min(bounds.top, y); bounds.bottom = Math.max(bounds.bottom, y);
    for (const neighbor of [index - 1, index + 1, index - info.width, index + info.width]) {
      if (neighbor >= 0 && neighbor < mask.length && !mask[neighbor] && light(neighbor) > 100) {
        mask[neighbor] = 1; pixels.push(neighbor);
      }
    }
  }
  return { data, info, light, mask, pixels, bounds };
}

function expand(component, radius) {
  const mask = new Uint8Array(component.mask.length), { width, height } = component.info;
  for (const index of component.pixels) {
    const x = index % width, y = Math.floor(index / width);
    for (let dy = -radius; dy <= radius; dy++) for (let dx = -radius; dx <= radius; dx++) {
      if (x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height) mask[(y + dy) * width + x + dx] = 1;
    }
  }
  return mask;
}

export async function faceLayers(originalPath, referencePath) {
  const [original, reference] = await Promise.all([
    faceComponent(originalPath, [1120, 175]),
    faceComponent(referencePath, [580, 290]),
  ]);
  assert.deepEqual(original.bounds, { left: 1063, top: 104, right: 1174, bottom: 225 });
  assert.deepEqual(reference.bounds, { left: 481, top: 157, right: 684, bottom: 379 });

  const erase = Buffer.alloc(original.mask.length * 4);
  const originalArea = expand(original, 2);
  for (let index = 0; index < originalArea.length; index++) if (originalArea[index]) erase[index * 4 + 3] = 255;

  const cutout = Buffer.alloc(reference.mask.length * 4), referenceArea = expand(reference, 2);
  for (let index = 0; index < referenceArea.length; index++) {
    if (!referenceArea[index] || (!reference.mask[index] && reference.light(index) > 100)) continue;
    reference.data.copy(cutout, index * 4, index * 3, index * 3 + 3);
    cutout[index * 4 + 3] = 255;
  }
  const padding = 3, a = original.bounds, b = reference.bounds;
  const crop = { left: b.left - padding, top: b.top - padding, width: b.right - b.left + 1 + padding * 2, height: b.bottom - b.top + 1 + padding * 2 };
  const image = await sharp(cutout, { raw: { width: reference.info.width, height: reference.info.height, channels: 4 } }).extract(crop).png().toBuffer();
  const sx = (a.right - a.left + 1) / (b.right - b.left + 1), sy = (a.bottom - a.top + 1) / (b.bottom - b.top + 1);
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${original.info.width}" height="${original.info.height}">
    <image x="${a.left - padding * sx}" y="${a.top - padding * sy}" width="${crop.width * sx}" height="${crop.height * sy}" preserveAspectRatio="none" href="data:image/png;base64,${image.toString("base64")}"/>
  </svg>`);

  // Restore neighboring hair/crown pixels and their antialiasing, where close
  // to the fitted face. The reference's surrounding artwork is never copied.
  const protectedPixels = [];
  for (let y = a.top - 4; y <= a.bottom + 4; y++) for (let x = a.left - 4; x <= a.right + 4; x++) {
    const index = y * original.info.width + x;
    if (!original.mask[index] && original.light(index) > 100) protectedPixels.push(index);
  }
  const protectedArea = expand({ ...original, pixels: protectedPixels }, 2);
  const restore = Buffer.alloc(original.mask.length * 4);
  for (let index = 0; index < protectedArea.length; index++) {
    if (!protectedArea[index] || original.mask[index]) continue;
    original.data.copy(restore, index * 4, index * 3, index * 3 + 3);
    restore[index * 4 + 3] = 255;
  }
  const raw = { width: original.info.width, height: original.info.height, channels: 4 };
  return [{ input: erase, raw }, { input: overlay }, { input: restore, raw }];
}
