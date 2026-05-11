"use client";

import { useEffect, type ReactElement } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSearch } from "@/components/product/ProductSearch";
import { ROUTES } from "@/constants/routes";
import { useProductFilters } from "@/hooks/useProductFilters";
import { isProductCategory } from "@/lib/products";

export const ProductListing = (): ReactElement => {
  const params = useSearchParams();
  const {
    filters,
    results,
    setQuery,
    setCategory,
    setMaxPrice,
    setSort,
    reset,
  } = useProductFilters();

  useEffect(() => {
    const cat = params.get("category");
    if (cat && isProductCategory(cat)) {
      setCategory(cat);
    }
  }, [params, setCategory]);

  return (
    <div className="flex flex-col gap-12">
      <ProductSearch
        value={filters.query}
        onChange={setQuery}
        resultCount={results.length}
      />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <FilterSidebar
            filters={filters}
            resultCount={results.length}
            onCategory={setCategory}
            onMaxPrice={setMaxPrice}
            onSort={setSort}
            onReset={reset}
          />
        </div>
        <div className="lg:col-span-9">
          {results.length === 0 ? (
            <EmptyState
              eyebrow="No matches"
              title="Nothing fits the brief."
              description="Try removing the search term or widening the price ceiling. The catalog only holds twelve products — every one of them earns its place."
              action={
                <Link
                  href={ROUTES.products}
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}
                  className="btn-secondary h-11 px-6"
                >
                  reset filters
                </Link>
              }
            />
          ) : (
            <ProductGrid products={results} priorityCount={3} />
          )}
        </div>
      </div>
    </div>
  );
};
