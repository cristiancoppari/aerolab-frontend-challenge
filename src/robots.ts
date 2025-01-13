import { MetadataRoute } from "next";

import { PROD_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/images/*", "/_next/*"],
    },
    sitemap: `${PROD_URL}/sitemap.xml`,
  };
}
