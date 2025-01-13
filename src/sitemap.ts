import type { MetadataRoute } from "next";

import { PROD_URL } from "./lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PROD_URL,
      lastModified: new Date(),
    },
  ];
}
