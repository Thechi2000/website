import { PAGES } from "@/pages";
import { fetchData } from "@/fetch";
import type { MetadataRoute } from "next";
import { WEBSITE_BASE_URL } from "@/consts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchData();

  // @ts-expect-error
  let entries: MetadataRoute.Sitemap = [
    ...Object.entries(PAGES).map((page) => ({
      url: `${WEBSITE_BASE_URL}/${page[1]}`,
      changeFrequency: "monthly",
      priority: 1,
    })),
    ...data.projects.map((project) => ({
      url: `${WEBSITE_BASE_URL}/projects/${project.id}`,
      changeFrequence: "monthly",
      priority: 0.7,
    })),
  ];

  entries.forEach((e) => {
    // Removes double slashes, except if they are part of the protocol (e.g. https://).
    e.url = e.url.replaceAll(/(?<=(?<!:)\/)\//g, "");

    // Remove trailing slashes.
    e.url = e.url.replaceAll(/\/$/g, "");
  });

  return entries;
}
