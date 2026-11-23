import type { APIRoute } from "astro";
import { locales, pages, pathFor } from "../content";

export const GET: APIRoute = ({ site }) => {
  const urls = locales.flatMap(locale =>
    pages.map(page => `  <url><loc>${new URL(pathFor(locale, page), site)}</loc></url>`),
  );

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls,
      '</urlset>',
      '',
    ].join("\n"),
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
