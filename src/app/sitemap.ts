import { PAGES } from "@/pages";
import { fetchData } from "@/utils";
import type { MetadataRoute } from "next";

const BASE_URL = "https://lmermod.ch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchData();

  // @ts-expect-error
  return [
    ...Object.entries(PAGES).map((page) => ({
      url: `${BASE_URL}/${page[1]}`,
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
    })),
    ...data.projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      changeFrequence: "monthly",
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}
