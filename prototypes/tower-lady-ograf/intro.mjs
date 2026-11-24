import TowerLadyLogo from "./graphic.mjs";

// Reuse the working OGraf clock and hair renderer. The surrounding DOM matches
// layout.prototype.html, variant A, shift=-2, in a fixed 3840 x 2160 design space.
export default class TowerLadyIntro extends TowerLadyLogo {
  async load(params = {}) {
    if (params.renderType !== "non-realtime") return super.load(params);
    if (this.introFont || this.introScene) await this.dispose();

    const characteristics = params.renderCharacteristics || {};
    const resolution = characteristics.resolution || {};
    const dimension = (value, fallback) => Number.isFinite(value) && value > 0
      ? Math.round(value) : fallback;
    const width = dimension(resolution.width, 1920);
    const height = dimension(resolution.height, 1080);
    const scale = Math.min(width / 3840, height / 2160);
    // Keep the composition at 16:9 in other host aspect ratios, without stretching.
    const result = await super.load({
      ...params,
      renderCharacteristics: {
        ...characteristics,
        resolution: {
          width: Math.max(2, Math.round(3840 * scale)),
          height: Math.max(2, Math.round(2160 * scale)),
        },
      },
    });
    if (result.statusCode !== 200) return result;

    try {
      const fontUrl = new URL("./assets/inter.woff2", import.meta.url).href;
      this.introFont = new FontFace("TowerLadyIntroInter", `url("${fontUrl}")`, {
        weight: "100 900", style: "normal",
      });
      await this.introFont.load();
      document.fonts.add(this.introFont);
      await Promise.all([
        document.fonts.load('700 112px "TowerLadyIntroInter"'),
        document.fonts.load('400 44px "TowerLadyIntroInter"'),
      ]);

      const style = document.createElement("style");
      style.textContent = `
        .tower-lady-intro-scene {
          font-family: "TowerLadyIntroInter", sans-serif;
          font-style: normal; font-weight: 400; font-stretch: normal;
          font-synthesis: none; font-feature-settings: normal; word-spacing: normal;
          background: transparent;
        }
        .tower-lady-intro-scene * { box-sizing: border-box; }
        .tower-lady-intro-emblem {
          position: absolute; inset: 0; transform-origin: center;
          transform: translate(-76.8px, -302.4px) scale(.60);
        }
        .tower-lady-intro-name, .tower-lady-intro-detail, .tower-lady-intro-presents {
          position: absolute; left: 1920px; white-space: nowrap;
          text-align: center; transform: translateX(-50%); margin: 0;
          line-height: 1; color: #f5ebd3;
        }
        .tower-lady-intro-name {
          top: 1430px; font-size: 112px; font-weight: 700;
          letter-spacing: .15em; padding-left: .15em;
        }
        .tower-lady-intro-detail {
          top: 1585px; display: flex; align-items: center; gap: 35px;
          font-size: 58px; font-weight: 700; letter-spacing: .42em;
        }
        .tower-lady-intro-detail span { padding-left: .42em; }
        .tower-lady-intro-detail::before, .tower-lady-intro-detail::after {
          content: ""; height: 2px; width: 136px; background: #9a8459;
        }
        .tower-lady-intro-presents {
          top: 1820px; font-size: 44px; font-weight: 400;
          letter-spacing: .35em; padding-left: .35em; color: #d8cebb;
        }
      `;
      const scene = document.createElement("div");
      scene.className = "tower-lady-intro-scene";
      scene.style.cssText = `position:absolute;width:3840px;height:2160px;overflow:hidden;left:${(width - 3840 * scale) / 2}px;top:${(height - 2160 * scale) / 2}px;transform:scale(${scale});transform-origin:0 0;visibility:hidden`;
      scene.innerHTML = '<div class="tower-lady-intro-emblem"></div><div class="tower-lady-intro-name">TOWER LADY</div><div class="tower-lady-intro-detail"><span>PICTURES</span></div><div class="tower-lady-intro-presents">PRESENTS</div>';
      scene.querySelector(".tower-lady-intro-emblem").append(this.canvas);
      this.replaceChildren(style, scene);
      this.introScene = scene;
      return { statusCode: 200 };
    } catch (error) {
      await this.dispose();
      return { statusCode: 500, statusMessage: `Cannot prepare the intro: ${error.message}` };
    }
  }

  render() {
    super.render();
    if (this.introScene) {
      // Titles follow the same scheduled Play/Stop state as the animated emblem.
      this.introScene.style.visibility = this.stateAt(this.timestamp).step === 0 ? "visible" : "hidden";
    }
  }

  async dispose() {
    if (this.introFont) document.fonts.delete(this.introFont);
    this.introFont = null;
    this.introScene = null;
    return super.dispose();
  }
}
