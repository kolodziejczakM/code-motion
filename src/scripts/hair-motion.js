const presets = {
  B: { period: 10, start: .51, horizontal: 12, vertical: 6 },
  C: { period: 7.5, start: .33, horizontal: 21, vertical: 10 },
  D: { period: 5.5, start: .27, horizontal: 30, vertical: 14 },
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function smoothstep(start, end, value) {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

function prepareArtwork(context, canvas, frame, image, preset) {
  const art = frame.getBoundingClientRect();
  const picture = image.getBoundingClientRect();
  const resolution = Math.min(devicePixelRatio || 1, 1.5);
  const width = canvas.width = Math.round(art.width * resolution);
  const height = canvas.height = Math.round(art.height * resolution);

  context.drawImage(image,
    (picture.x - art.x) * width / art.width,
    (picture.y - art.y) * height / art.height,
    picture.width * width / art.width,
    picture.height * height / art.height,
  );

  const start = Math.floor(height * preset.start);
  const patchWidth = Math.ceil(width * .44);
  const patchHeight = Math.ceil(height * .92) - start;
  const source = context.getImageData(0, 0, width, height).data;
  const patch = context.getImageData(0, start, patchWidth, patchHeight);
  const weights = new Float32Array(patchWidth * patchHeight);
  // A stronger gust needs a wider taper to keep the contour from folding at the crop.
  const leftFalloff = 1.9 * preset.horizontal / 512;

  for (let row = 0; row < patchHeight; row++) {
    const y = (start + row) / height;
    // Anchor the roots and stop the field before the neck and the shoulder.
    const right = .43 - .11 * smoothstep(.39, .5, y) - .27 * Math.max(0, y - .53);
    const falloff = smoothstep(preset.start, preset.start + .16, y) * (1 - smoothstep(.84, .92, y));
    for (let col = 0; col < patchWidth; col++) {
      const x = col / width;
      weights[row * patchWidth + col] = falloff *
        (1 - smoothstep(right - .105, right, x)) *
        smoothstep(0, leftFalloff, x);
    }
  }

  return { start, width, height, source, patch, weights };
}

function drawWind(context, artwork, preset, seconds) {
  const { start, width, height, source, patch, weights } = artwork;
  const time = seconds * 2 * Math.PI / preset.period;
  const amplitude = width / 512 * smoothstep(0, .65, seconds);

  for (let row = 0; row < patch.height; row++) {
    const y = start + row;
    // The wave reaches the lower locks slightly later than the upper ones.
    const phase = time - ((y / height) - .55) * 4.8;
    const drift = (Math.sin(phase) + .16 * Math.sin(2 * phase)) * preset.horizontal * amplitude;
    const lift = Math.sin(phase - .8) * preset.vertical * amplitude;

    for (let x = 0; x < patch.width; x++) {
      const index = row * patch.width + x;
      const weight = weights[index];
      if (weight === 0) continue;

      const sx = clamp(x + weight * drift, 0, width - 1.01);
      const sy = clamp(y + weight * lift, 0, height - 1.01);
      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      const fx = sx - x0;
      const fy = sy - y0;
      const upperLeft = (y0 * width + x0) * 4;
      const lowerLeft = upperLeft + width * 4;

      // Interpolate across four source pixels so the silhouette moves smoothly.
      for (let channel = 0; channel < 3; channel++) {
        const a = source[upperLeft + channel] * (1 - fx) + source[upperLeft + channel + 4] * fx;
        const b = source[lowerLeft + channel] * (1 - fx) + source[lowerLeft + channel + 4] * fx;
        patch.data[index * 4 + channel] = a * (1 - fy) + b * fy;
      }
    }
  }

  context.putImageData(patch, 0, start);
}

function setup() {
  const address = new URL(location.href);
  const requested = address.searchParams.get("hair");
  const variants = ["A", "B", "C", "D"];
  const initial = requested === "on" ? "C" : requested;
  if (!variants.includes(initial)) return;

  const controls = document.querySelector("[data-hair-preview]");
  const select = controls.querySelector("select");
  const frame = document.querySelector(".home-art-graphic");
  const image = frame.querySelector("img");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  canvas.className = "hair-preview-canvas";
  canvas.hidden = true;
  canvas.setAttribute("aria-hidden", "true");
  frame.append(canvas);

  let decoded = false;
  let visible = true;
  let artwork;
  let frameId = null;
  let previousTime = 0;
  let elapsed = 0;

  function animate(now) {
    frameId = requestAnimationFrame(animate);
    if (!previousTime) previousTime = now;
    const delta = now - previousTime;
    if (delta < 30) return;
    previousTime = now;
    elapsed += Math.min(delta, 60) / 1000;
    drawWind(context, artwork, presets[select.value], elapsed);
  }

  function updatePlayback() {
    if (artwork && visible && !document.hidden) {
      if (frameId === null) frameId = requestAnimationFrame(animate);
      return;
    }
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    previousTime = 0;
  }

  function refresh() {
    artwork = null;
    elapsed = 0;
    updatePlayback();
    canvas.hidden = true;
    const preset = presets[select.value];
    if (context && decoded && preset && !reducedMotion.matches) {
      artwork = prepareArtwork(context, canvas, frame, image, preset);
      canvas.hidden = false;
      updatePlayback();
    }
  }

  function show(variant) {
    select.value = variant;
    address.searchParams.set("hair", variant);
    history.replaceState(history.state, "", address);
    refresh();
  }

  function step(direction) {
    const index = variants.indexOf(select.value) + direction;
    show(variants[(index + variants.length) % variants.length]);
  }

  for (const button of controls.querySelectorAll("[data-step]")) {
    button.addEventListener("click", () => step(Number(button.dataset.step)));
  }
  select.addEventListener("change", () => show(select.value));
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target instanceof Element && event.target.closest("input, select, textarea, [contenteditable]")) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    step(event.key === "ArrowLeft" ? -1 : 1);
  });
  reducedMotion.addEventListener("change", refresh);
  document.addEventListener("visibilitychange", updatePlayback);

  new ResizeObserver(refresh).observe(frame);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }).observe(frame);

  controls.hidden = false;
  show(initial);
  image.decode().then(() => {
    decoded = true;
    refresh();
  }, () => {});
}

setup();
