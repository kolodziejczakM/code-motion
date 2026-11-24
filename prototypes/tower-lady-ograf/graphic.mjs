import { createWindArtwork } from "./wind.mjs";

export default class TowerLadyLogo extends HTMLElement {
  async load({ renderType, renderCharacteristics = {} } = {}) {
    if (renderType !== "non-realtime") {
      return { statusCode: 400, statusMessage: "Non-real-time rendering is required." };
    }
    const resolution = renderCharacteristics.resolution || {};
    const dimension = (value, fallback) => Number.isFinite(value) && value > 0
      ? Math.round(value) : fallback;
    const width = dimension(resolution.width, 1920);
    const height = dimension(resolution.height, 1080);
    this.style.cssText = "position:absolute;inset:0;display:block;overflow:hidden;background:transparent";
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.cssText = "display:block;width:100%;height:100%;background:transparent";
    this.replaceChildren(this.canvas);
    this.context = this.canvas.getContext("2d", { alpha: true });
    if (!this.context) return { statusCode: 500, statusMessage: "Canvas 2D is unavailable." };

    try {
      const image = new Image();
      image.src = new URL("./assets/brand-artwork.webp", import.meta.url).href;
      await image.decode();
      // Leave space to position or scale the emblem in the editor.
      const artWidth = Math.max(2, Math.round(Math.min(height * .8 * 500 / 580, width * .8)));
      const artHeight = Math.max(2, Math.round(artWidth * 580 / 500));
      this.artwork = createWindArtwork(image, artWidth, artHeight);
    } catch (error) {
      this.replaceChildren();
      this.context = null;
      this.canvas = null;
      return { statusCode: 500, statusMessage: `Cannot prepare the logo: ${error.message}` };
    }
    this.timestamp = 0;
    this.schedule = null;
    this.directActions = [];
    // No visible pixels until the host invokes or schedules Play.
    return { statusCode: 200 };
  }

  async dispose() {
    this.replaceChildren();
    this.context = null;
    this.canvas = null;
    this.artwork = null;
    this.schedule = null;
    this.directActions = [];
    return { statusCode: 200 };
  }

  async playAction(params = {}) {
    this.directActions.push({ timestamp: this.timestamp, action: { type: "playAction", params } });
    this.render();
    return { statusCode: 200, currentStep: this.stateAt(this.timestamp).step };
  }

  async stopAction(params = {}) {
    this.directActions.push({ timestamp: this.timestamp, action: { type: "stopAction", params } });
    this.render();
    return { statusCode: 200 };
  }

  async updateAction() {
    return { statusCode: 200 };
  }

  async customAction() {
    return { statusCode: 400, statusMessage: "No custom actions are defined." };
  }

  async setActionsSchedule({ schedule = [] } = {}) {
    this.schedule = schedule.map(event => ({
      timestamp: event.timestamp,
      action: { type: event.action.type, params: { ...event.action.params } },
    })).sort((a, b) => a.timestamp - b.timestamp);
    return { statusCode: 200 };
  }

  async goToTime({ timestamp } = {}) {
    if (!Number.isFinite(timestamp)) {
      return { statusCode: 400, statusMessage: "A finite timestamp in milliseconds is required." };
    }
    this.timestamp = timestamp;
    this.render();
    return { statusCode: 200 };
  }

  stateAt(timestamp) {
    let step;
    let startedAt = 0;
    for (const event of this.schedule ?? this.directActions) {
      if (event.timestamp > timestamp) break;
      if (event.action.type === "stopAction") {
        step = undefined;
      } else if (event.action.type === "playAction") {
        const { goto, delta = 1 } = event.action.params || {};
        const target = goto !== undefined && goto >= 0 ? goto : (step ?? -1) + delta;
        step = target === 0 ? 0 : undefined;
        if (step === 0) startedAt = event.timestamp;
      }
    }
    return { step, elapsed: Math.max(0, timestamp - startedAt) };
  }

  render() {
    if (!this.context || !this.artwork) return;
    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height);
    const state = this.stateAt(this.timestamp);
    if (state.step === undefined) return;
    const image = this.artwork.render(state.elapsed / 1000);
    this.context.drawImage(image, Math.round((width - image.width) / 2), Math.round((height - image.height) / 2));
  }
}
