import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const robots = __TAILNET_PREVIEW__
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nDisallow:\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`;

  return new Response(robots, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
