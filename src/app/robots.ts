import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/login"],
    },
  ],
  sitemap: `${SITE.url}/sitemap.xml`,
  host: SITE.url,
});

export default robots;
