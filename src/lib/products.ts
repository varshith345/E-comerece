import productsJson from "@/data/products.json";
import { ProductCategory } from "@/constants/categories";
import type { Product, ProductFilters, ProductSort } from "@/types/product";

const PRODUCTS: readonly Product[] = (productsJson as readonly Product[]).map((p) => ({
  ...p,
  highlights: [...p.highlights],
  specs: p.specs.map((s) => ({ ...s })),
}));

export const getAllProducts = (): readonly Product[] => PRODUCTS;

export const getFeaturedProducts = (): readonly Product[] =>
  PRODUCTS.filter((p) => p.featured);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getRelatedProducts = (
  product: Product,
  limit = 3,
): readonly Product[] =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);

export const getProductIds = (): readonly string[] => PRODUCTS.map((p) => p.id);

const sortProducts = (products: readonly Product[], sort: ProductSort): readonly Product[] => {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "featured":
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
};

export const filterProducts = (filters: ProductFilters): readonly Product[] => {
  const needle = filters.query.trim().toLowerCase();

  const filtered = PRODUCTS.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (needle.length > 0) {
      const haystack = `${product.title} ${product.tagline} ${product.description}`.toLowerCase();
      if (!haystack.includes(needle)) {
        return false;
      }
    }
    return true;
  });

  return sortProducts(filtered, filters.sort);
};

export const isProductCategory = (value: string): value is ProductCategory =>
  Object.values(ProductCategory).some((cat) => cat === value);
