import { defineConfig } from "astro/config";

const tailnetPreview = process.env.TOWER_LADY_PREVIEW === "1";
const previewPath = "/prototypes/tower-lady/astro/";

export default defineConfig({
  site: "https://towerlady.com",
  output: "static",
  trailingSlash: "always",
  base: tailnetPreview ? previewPath : "/",
  outDir: tailnetPreview ? `.${previewPath}` : "./dist/",
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  devToolbar: { enabled: false },
  vite: {
    define: { __TAILNET_PREVIEW__: JSON.stringify(tailnetPreview) },
  },
});
