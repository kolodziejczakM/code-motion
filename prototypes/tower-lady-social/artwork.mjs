// Deterministic extensions of the established logo system, not a new logo.
import { createWindArtwork } from "../tower-lady-ograf/wind.mjs";

export const colors = { black: "#000000", ivory: "#F5EBD3", muted: "#D8CEBB", brass: "#BD9B5F", rule: "#9A8459" };
export const variants = {
  A: { name: "Nazwa studia", description: "Emblemat i pełny logotyp prowadzą kompozycję. Hasło uzupełnia znak. Najbliżej identyfikacji strony i intro." },
  B: { name: "Hasło", description: "Większe hasło w Cormorant Garamond, mniejszy logotyp. Łączy filmowy charakter nagłówków strony z obecną marką." },
  C: { name: "Filmy", description: "Kadry trzech filmów tworzą tło. Na środku emblemat, nazwa w jednym wierszu i zatwierdzone hasło." },
};
export const formats = {
  youtube: { width: 2560, height: 1440, safe: { x: 508.125, y: 508.75, width: 1543.75, height: 422.5 } },
  // Working export at 2x 851 x 315. The inner rectangle is our conservative
  // planning margin, not a verified Facebook safe-area specification.
  facebook: { width: 1702, height: 630, safe: { x: 291, y: 80, width: 1120, height: 470 } },
};

function canvas(width, height) {
  const element = document.createElement("canvas");
  element.width = width; element.height = height;
  return element;
}

export async function loadResources() {
  const image = async path => {
    const asset = new Image();
    asset.src = new URL(path, import.meta.url).href;
    await asset.decode();
    return asset;
  };
  const font = async (name, path, weight) => {
    const face = new FontFace(name, `url("${new URL(path, import.meta.url).href}")`, { weight });
    await face.load(); document.fonts.add(face);
    return face;
  };
  const [brand, boundless, akabei] = await Promise.all([
    image("../tower-lady/assets/brand-artwork-clean.webp"),
    image("../tower-lady/assets/boundless.jpg"),
    image("../tower-lady/assets/akabei.jpg"),
    font("TowerLadySocialInter", "../tower-lady/assets/inter.woff2", "100 900"),
    font("TowerLadySocialSerif", "../tower-lady/assets/cormorant.woff2", "300 700"),
  ]);
  // The original Saturday Cleaning YouTube thumbnail includes the old name and
  // credits. Use the clean photographic crop already selected for the website.
  return { brand, films: [boundless, akabei, { image: brand, source: { x: 979, y: 733, width: 443, height: 241 } }], marks: new Map() };
}

function mark(resources, height) {
  const width = Math.round(height * 500 / 580);
  const key = `${width}x${height}`;
  if (!resources.marks.has(key)) {
    resources.marks.set(key, createWindArtwork(resources.brand, width, height).render(0));
  }
  return resources.marks.get(key);
}

function emblem(context, resources, centerX, centerY, height) {
  const image = mark(resources, height);
  context.drawImage(image, Math.round(centerX - image.width / 2), Math.round(centerY - image.height / 2));
  return { x: centerX - image.width / 2, y: centerY - height / 2, width: image.width, height };
}

function trackedText(context, text, centerX, top, size, { weight = 700, tracking = .15, color = colors.ivory, family = "TowerLadySocialInter" } = {}) {
  context.font = `${weight} ${size}px "${family}"`;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const glyphs = [...text];
  const widths = glyphs.map(glyph => context.measureText(glyph).width);
  const spacing = tracking * size;
  const width = widths.reduce((sum, value) => sum + value, 0) + spacing * (glyphs.length - 1);
  const metrics = context.measureText(text);
  const baseline = top + metrics.actualBoundingBoxAscent;
  let x = centerX - width / 2;
  context.fillStyle = color;
  for (let index = 0; index < glyphs.length; index++) {
    context.fillText(glyphs[index], x, baseline);
    x += widths[index] + spacing;
  }
  return { x: centerX - width / 2, y: top, width, height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent };
}

function wordmark(context, centerX, top, size) {
  const title = trackedText(context, "TOWER LADY", centerX, top, size);
  const secondarySize = size * .52;
  const detail = trackedText(context, "PICTURES", centerX, top + size * 1.27, secondarySize, { tracking: .42 });
  const rule = secondarySize * 2.35;
  const gap = secondarySize * .6;
  context.fillStyle = colors.rule;
  context.fillRect(detail.x - gap - rule, detail.y + detail.height / 2, rule, 1.5);
  context.fillRect(detail.x + detail.width + gap, detail.y + detail.height / 2, rule, 1.5);
  return [title, { ...detail, x: detail.x - gap - rule, width: detail.width + (gap + rule) * 2 }];
}

function tagline(context, centerX, top, size, serif = false) {
  const options = serif
    ? { family: "TowerLadySocialSerif", weight: 600, tracking: 0 }
    : { weight: 600, tracking: .075, color: colors.muted };
  return [
    trackedText(context, serif ? "Stories without walls." : "STORIES WITHOUT WALLS.", centerX, top, size, options),
    trackedText(context, serif ? "Always original." : "ALWAYS ORIGINAL.", centerX, top + size * 1.37, size, options),
  ];
}

function brickFragment(width) {
  const height = Math.round(width / 3.2);
  const tile = canvas(Math.round(width), height);
  const context = tile.getContext("2d");
  context.strokeStyle = "rgba(184,152,108,.19)";
  context.lineWidth = 1.25;
  context.beginPath();
  for (const [x1, y1, x2, y2] of [[.05,.33,.82,.33],[.27,.66,.91,.66],[.28,0,.28,.33],[.59,.323,.59,.663],[.39,.66,.39,1],[.76,.66,.76,1]]) {
    context.moveTo(x1 * width, y1 * height); context.lineTo(x2 * width, y2 * height);
  }
  context.stroke();
  context.globalCompositeOperation = "destination-in";
  context.translate(width / 2, height / 2); context.scale(width / 2, height / 2);
  const fade = context.createRadialGradient(0, 0, 0, 0, 0, 1);
  fade.addColorStop(0, "#000"); fade.addColorStop(.32, "#000"); fade.addColorStop(.62, "#000a"); fade.addColorStop(1, "#0000");
  context.fillStyle = fade; context.fillRect(-1, -1, 2, 2);
  return tile;
}

function backdrop(context, width, height) {
  context.fillStyle = colors.black; context.fillRect(0, 0, width, height);
  context.save();
  context.translate(width * .13, height * .10); context.scale(width * .9, height * .95);
  const light = context.createRadialGradient(0, 0, 0, 0, 0, 1);
  light.addColorStop(0, "rgba(171,137,83,.15)");
  light.addColorStop(.46, "rgba(153,119,72,.06)");
  light.addColorStop(.84, "rgba(0,0,0,0)");
  context.fillStyle = light; context.fillRect(-2, -2, 4, 4); context.restore();
  for (const [x, y, scale, flip] of [[.04,.15,.17,0],[.77,.13,.18,1],[.14,.76,.16,0],[.74,.77,.20,1],[.43,.06,.15,1],[.04,.49,.14,1],[.85,.47,.14,0],[.42,.88,.17,0],[.58,.68,.13,1]]) {
    const tile = brickFragment(width * scale);
    context.save(); context.translate(width * x + (flip ? tile.width : 0), height * y);
    if (flip) context.scale(-1, 1);
    context.drawImage(tile, 0, 0); context.restore();
  }
}

function photoCover(context, asset, x, y, width, height) {
  const image = asset.image || asset;
  const source = asset.source || { x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight };
  const scale = Math.max(width / source.width, height / source.height);
  context.save(); context.beginPath(); context.rect(x, y, width, height); context.clip();
  context.drawImage(image, source.x, source.y, source.width, source.height,
    x + (width - source.width * scale) / 2, y + (height - source.height * scale) / 2,
    source.width * scale, source.height * scale);
  context.restore();
}

export function createAvatar(resources) {
  const image = canvas(1080, 1080);
  const context = image.getContext("2d");
  context.fillStyle = colors.black; context.fillRect(0, 0, 1080, 1080);
  // Optical alignment, with room for the circular platform crop.
  emblem(context, resources, 1080 * .46, 1080 * .51, 842);
  return image;
}

export function createBanner(resources, platform, variant) {
  const format = formats[platform];
  const { width, height } = format;
  const image = canvas(width, height);
  const context = image.getContext("2d");
  backdrop(context, width, height);
  const critical = [];
  const yt = platform === "youtube";
  if (variant === "A") {
    critical.push(emblem(context, resources, yt ? 830 : 488, yt ? 720 : 310, yt ? 336 : 390));
    critical.push(...wordmark(context, yt ? 1470 : 1045, yt ? 577 : 176, yt ? 98 : 80));
    critical.push(...tagline(context, yt ? 1470 : 1045, yt ? 794 : 365, yt ? 34 : 29));
  } else if (variant === "B") {
    critical.push(emblem(context, resources, yt ? 830 : 488, yt ? 720 : 310, yt ? 336 : 390));
    critical.push(...wordmark(context, yt ? 1470 : 1045, yt ? 567 : 155, yt ? 64 : 54));
    critical.push(...tagline(context, yt ? 1470 : 1045, yt ? 732 : 305, yt ? 76 : 68, true));
  } else {
    const panelWidth = width / 3;
    for (let index = 0; index < 3; index++) photoCover(context, resources.films[index], index * panelWidth, 0, panelWidth + 1, height);
    const shade = context.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, "rgba(0,0,0,.55)"); shade.addColorStop(.35, "rgba(0,0,0,.8)");
    shade.addColorStop(.65, "rgba(0,0,0,.85)"); shade.addColorStop(1, "rgba(0,0,0,.6)");
    context.fillStyle = shade; context.fillRect(0, 0, width, height);
    critical.push(emblem(context, resources, width / 2 - 10, yt ? 590 : 170, yt ? 144 : 150));
    critical.push(trackedText(context, "TOWER LADY PICTURES", width / 2, yt ? 710 : 292, yt ? 76 : 65, { tracking: .12 }));
    critical.push(...tagline(context, width / 2, yt ? 815 : 405, yt ? 32 : 28));
  }
  return { canvas: image, critical, format };
}

export function cropCanvas(source, crop) {
  const result = canvas(Math.round(crop.width), Math.round(crop.height));
  result.getContext("2d").drawImage(source, crop.x, crop.y, crop.width, crop.height, 0, 0, result.width, result.height);
  return result;
}
