"use client";

import { useMemo, useState } from "react";
import { PRICE_RANGE } from "@/constants/site";
import { filterProducts } from "@/lib/products";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product, ProductFilters, ProductSort } from "@/types/product";
import type { ProductCategory } from "@/constants/categories";

interface ProductFilterApi {
  readonly filters: ProductFilters;
  readonly results: readonly Product[];
  readonly setQuery: (value: string) => void;
  readonly setCategory: (value: ProductCategory | "all") => void;
  readonly setMaxPrice: (value: number) => void;
  readonly setSort: (value: ProductSort) => void;
  readonly reset: () => void;
}

const DEFAULTS: ProductFilters = {
  query: "",
  category: "all",
  minPrice: PRICE_RANGE.min,
  maxPrice: PRICE_RANGE.max,
  sort: "featured",
};

export const useProductFilters = (): ProductFilterApi => {
  const [query, setQuery] = useState<string>(DEFAULTS.query);
  const [category, setCategory] = useState<ProductCategory | "all">(DEFAULTS.category);
  const [maxPrice, setMaxPrice] = useState<number>(DEFAULTS.maxPrice);
  const [sort, setSort] = useState<ProductSort>(DEFAULTS.sort);

  const debouncedQuery = useDebounce(query, 180);

  const filters = useMemo<ProductFilters>(
    () => ({
      query: debouncedQuery,
      category,
      minPrice: PRICE_RANGE.min,
      maxPrice,
      sort,
    }),
    [debouncedQuery, category, maxPrice, sort],
  );

  const results = useMemo(() => filterProducts(filters), [filters]);

  const reset = (): void => {
    setQuery(DEFAULTS.query);
    setCategory(DEFAULTS.category);
    setMaxPrice(DEFAULTS.maxPrice);
    setSort(DEFAULTS.sort);
  };

  return {
    filters: { query, category, minPrice: PRICE_RANGE.min, maxPrice, sort },
    results,
    setQuery,
    setCategory,
    setMaxPrice,
    setSort,
    reset,
  };
};
