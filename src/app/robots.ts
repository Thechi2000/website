import { WEBSITE_BASE_URL } from "@/consts";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "googlebot-image",
          "googlebot-mobile",
          "MSNBot",
          "Slurp",
          "Teoma",
          "Gigabot",
          "Robozilla",
          "Nutch",
          "ia_archiver",
          "baiduspider",
          "naverbot",
          "yeti",
          "yahoo-mmcrawler",
          "psbot",
          "yahoo-blogs/v3.9",
        ],
        allow: "/",
        crawlDelay: 5,
      },
      { userAgent: "*", disallow: "/" },
    ],
    sitemap: `${WEBSITE_BASE_URL}/sitemap.xml`,
  };
}
