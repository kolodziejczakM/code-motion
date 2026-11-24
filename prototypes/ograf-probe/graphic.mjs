// Small OGraf v1 non-real-time probe. No network, fonts, images or dependencies.
// The host owns the clock: this component does not use requestAnimationFrame.
export default class TowerLadyProbe extends HTMLElement {
  async load({ renderType, renderCharacteristics = {} } = {}) {
    if (renderType !== "non-realtime") {
      return { statusCode: 400, statusMessage: "This probe requires non-real-time rendering." };
    }

    const resolution = renderCharacteristics.resolution || {};
    const dimension = (value, fallback) => Number.isFinite(value) && value > 0
      ? Math.round(value) : fallback;
    this.style.cssText = "position:absolute;inset:0;display:block;overflow:hidden;background:transparent";
    this.canvas = document.createElement("canvas");
    this.canvas.width = dimension(resolution.width, 1920);
    this.canvas.height = dimension(resolution.height, 1080);
    this.canvas.style.cssText = "display:block;width:100%;height:100%;background:transparent";
    this.replaceChildren(this.canvas);
    this.context = this.canvas.getContext("2d", { alpha: true });
    if (!this.context) return { statusCode: 500, statusMessage: "Canvas 2D is unavailable." };
    this.timestamp = 0;
    this.schedule = null;
    this.directActions = [];
    // The canvas remains transparent until Play is invoked or scheduled.
    return { statusCode: 200 };
  }

  async dispose() {
    this.replaceChildren();
    this.context = null;
    this.canvas = null;
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
    // The manifest exposes no data controls.
    return { statusCode: 200 };
  }

  async customAction() {
    return { statusCode: 400, statusMessage: "No custom actions are defined." };
  }

  async setActionsSchedule({ schedule = [] } = {}) {
    // Recompute from this complete schedule on every seek, including backwards.
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
    const events = this.schedule ?? this.directActions;
    for (const event of events) {
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
    if (!this.context) return;
    const context = this.context;
    const { width, height } = this.canvas;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    const state = this.stateAt(this.timestamp);
    if (state.step === undefined) return;

    // Fit inside any host aspect ratio without stretching the geometry.
    const scale = Math.min(width / 1920, height / 1080);
    context.setTransform(scale, 0, 0, scale, (width - 1920 * scale) / 2, (height - 1080 * scale) / 2);
    context.textBaseline = "top";
    context.fillStyle = "#f5ebd3";
    context.font = "bold 54px monospace";
    context.fillText("TOWER LADY / OGRAF TEST", 180, 240);
    context.font = "38px monospace";
    context.fillText(`HOST TIME: ${(this.timestamp / 1000).toFixed(3)} s`, 180, 350);
    context.fillText(`SINCE PLAY: ${(state.elapsed / 1000).toFixed(3)} s`, 180, 410);
    context.font = "28px monospace";
    context.fillText("NON-REALTIME / TRANSPARENT CANVAS", 180, 790);
    context.fillText(`${width} x ${height} / CIRCLE PERIOD: 4 s`, 180, 840);

    context.strokeStyle = "rgba(189,155,95,0.45)";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(180, 640);
    context.lineTo(1740, 640);
    for (let index = 0; index <= 4; index++) {
      const x = 180 + index * 390;
      context.moveTo(x, 620);
      context.lineTo(x, 660);
    }
    context.stroke();

    const phase = (state.elapsed % 4000) / 4000;
    const x = 180 + 1560 * (0.5 - 0.5 * Math.cos(phase * Math.PI * 2));
    context.beginPath();
    context.arc(x, 640, 48, 0, Math.PI * 2);
    context.fillStyle = "#bd9b5f";
    context.fill();
    // Half alpha: the colour below this square should remain visible.
    context.fillStyle = "rgba(189,155,95,0.5)";
    context.fillRect(1580, 300, 160, 160);
  }
}
