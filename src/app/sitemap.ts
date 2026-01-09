import { PAGES } from "@/pages";
import { fetchData } from "@/fetch";
import type { MetadataRoute } from "next";
import { WEBSITE_BASE_URL } from "@/consts";

function extractUrls(value: { [key: string]: any }): string[] {
  return Object.values(value).flatMap((o) => {
    if (
      typeof o === "string" &&
      URL.canParse(o) &&
      new URL(o).hostname === WEBSITE_BASE_URL.hostname
    ) {
      return [o];
    } else if (typeof o === "object") {
      return extractUrls(o);
    } else {
      return [];
    }
  });
}

function generateEntries(
  paths: string[],
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority: MetadataRoute.Sitemap[0]["priority"],
): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: new URL(p, WEBSITE_BASE_URL).toString(),
    changeFrequency,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchData();

  let entries: MetadataRoute.Sitemap = [
    ...generateEntries(
      Object.entries(PAGES).map((page) => page[1]),
      "always",
      1,
    ),
    ...generateEntries(
      data.projects.map((project) => `/projects/${project.id}`),
      "always",
      0.7,
    ),
    ...generateEntries(extractUrls(data), "always", 0.7),
  ];

  entries.forEach((e) => {
    // Removes double slashes, except if they are part of the protocol (e.g. https://).
    e.url = e.url.replaceAll(/(?<=(?<!:)\/)\//g, "");

    // Remove trailing slashes.
    e.url = e.url.replaceAll(/\/$/g, "");
  });

  entries = entries
    .sort((a, b) => a.url.localeCompare(b.url))
    .filter((item, pos, array) => !pos || item.url != array[pos - 1].url);

  return entries;
}
