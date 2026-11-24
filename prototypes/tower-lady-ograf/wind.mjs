// Port of src/scripts/hair-motion.js, using the same mask, phase and amplitudes.
// Work in the original RGB-over-black space, then unpremultiply into alpha.
// This keeps dark antialiased edges from becoming black fringes over other shots.
export const gust = Object.freeze({ period: 5.5, start: .27, horizontal: 30, vertical: 14 });
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function smoothstep(start, end, value) {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

function writeTransparentPixel(pixels, index, red, green, blue) {
  const light = Math.max(red, green, blue);
  // Discard near-black compression noise. At full ivory brightness, ink is opaque.
  const alpha = light <= 2 ? 0 : Math.min(1, light / 245);
  pixels[index] = alpha ? red / alpha : 0;
  pixels[index + 1] = alpha ? green / alpha : 0;
  pixels[index + 2] = alpha ? blue / alpha : 0;
  pixels[index + 3] = alpha * 255;
}

export function createWindArtwork(image, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");

  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.save();
  // The same crop as the desktop hero, including its 10px image offset at 500px.
  // The notch excludes text from the source mockup, outside the actual emblem.
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(width * .82, 0);
  context.lineTo(width * .82, height * .07);
  context.lineTo(width, height * .07);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
  context.clip();
  context.drawImage(image, -1.59 * width, -.0759 * height + width / 50,
    2.974 * width, 2.974 * width * image.naturalHeight / image.naturalWidth);
  context.restore();

  const source = context.getImageData(0, 0, width, height).data;
  const output = context.createImageData(width, height);
  for (let index = 0; index < source.length; index += 4) {
    writeTransparentPixel(output.data, index, source[index], source[index + 1], source[index + 2]);
  }

  const start = Math.floor(height * gust.start);
  const patchWidth = Math.ceil(width * .44);
  const patchHeight = Math.ceil(height * .92) - start;
  const weights = new Float32Array(patchWidth * patchHeight);
  const leftFalloff = 1.9 * gust.horizontal / 512;
  for (let row = 0; row < patchHeight; row++) {
    const y = (start + row) / height;
    const right = .43 - .11 * smoothstep(.39, .5, y) - .27 * Math.max(0, y - .53);
    const falloff = smoothstep(gust.start, gust.start + .16, y) * (1 - smoothstep(.84, .92, y));
    for (let col = 0; col < patchWidth; col++) {
      weights[row * patchWidth + col] = falloff *
        (1 - smoothstep(right - .105, right, col / width)) *
        smoothstep(0, leftFalloff, col / width);
    }
  }

  function render(seconds) {
    const time = seconds * 2 * Math.PI / gust.period;
    const amplitude = width / 512 * smoothstep(0, .65, seconds);
    for (let row = 0; row < patchHeight; row++) {
      const y = start + row;
      const phase = time - ((y / height) - .55) * 4.8;
      const drift = (Math.sin(phase) + .16 * Math.sin(2 * phase)) * gust.horizontal * amplitude;
      const lift = Math.sin(phase - .8) * gust.vertical * amplitude;
      for (let x = 0; x < patchWidth; x++) {
        const weight = weights[row * patchWidth + x];
        if (weight === 0) continue;
        const sx = clamp(x + weight * drift, 0, width - 1.01);
        const sy = clamp(y + weight * lift, 0, height - 1.01);
        const x0 = Math.floor(sx);
        const y0 = Math.floor(sy);
        const fx = sx - x0;
        const fy = sy - y0;
        const upperLeft = (y0 * width + x0) * 4;
        const lowerLeft = upperLeft + width * 4;
        const sample = channel => {
          const a = source[upperLeft + channel] * (1 - fx) + source[upperLeft + channel + 4] * fx;
          const b = source[lowerLeft + channel] * (1 - fx) + source[lowerLeft + channel + 4] * fx;
          return a * (1 - fy) + b * fy;
        };
        writeTransparentPixel(output.data, (y * width + x) * 4, sample(0), sample(1), sample(2));
      }
    }
    context.putImageData(output, 0, 0);
    return canvas;
  }

  return { canvas, render };
}
