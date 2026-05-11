import type { MetadataRoute } from "next";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getProductIds } from "@/lib/products";

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  const base = SITE.url;
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}${ROUTES.home}`, lastModified: now, priority: 1, changeFrequency: "weekly" },
    { url: `${base}${ROUTES.products}`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}${ROUTES.about}`, lastModified: now, priority: 0.4, changeFrequency: "yearly" },
    { url: `${base}${ROUTES.contact}`, lastModified: now, priority: 0.4, changeFrequency: "yearly" },
    { url: `${base}${ROUTES.login}`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
  ];
  const productPages: MetadataRoute.Sitemap = getProductIds().map((id) => ({
    url: `${base}${ROUTES.product(id)}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "weekly",
  }));
  return [...staticPages, ...productPages];
};

export default sitemap;
