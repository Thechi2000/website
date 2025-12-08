import { PAGES } from "@/pages";
import { fetchData } from "@/fetch";
import type { MetadataRoute } from "next";
import { WEBSITE_BASE_URL } from "@/consts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchData();

  // @ts-expect-error
  return [
    ...Object.entries(PAGES).map((page) => ({
      url: `${WEBSITE_BASE_URL}/${page[1]}`,
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
    })),
    ...data.projects.map((project) => ({
      url: `${WEBSITE_BASE_URL}/projects/${project.id}`,
      changeFrequence: "monthly",
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}
