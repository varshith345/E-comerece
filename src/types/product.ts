import type { ProductCategory } from "@/constants/categories";

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly price: number;
  readonly currency: "USD";
  readonly image: string;
  readonly imageAlt: string;
  readonly category: ProductCategory;
  readonly featured: boolean;
  readonly rating: number;
  readonly reviewCount: number;
  readonly stock: number;
  readonly highlights: readonly string[];
  readonly specs: readonly ProductSpec[];
}

export interface ProductFilters {
  readonly query: string;
  readonly category: ProductCategory | "all";
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly sort: ProductSort;
}

export type ProductSort = "featured" | "price-asc" | "price-desc" | "rating";
