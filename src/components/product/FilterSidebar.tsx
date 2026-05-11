"use client";

import type { ReactElement } from "react";
import { CATEGORY_META, ProductCategory } from "@/constants/categories";
import { PRICE_RANGE } from "@/constants/site";
import { formatPrice } from "@/lib/format";
import type { ProductFilters, ProductSort } from "@/types/product";
import { cn } from "@/utils/cn";

interface FilterSidebarProps {
  readonly filters: ProductFilters;
  readonly resultCount: number;
  readonly onCategory: (value: ProductCategory | "all") => void;
  readonly onMaxPrice: (value: number) => void;
  readonly onSort: (value: ProductSort) => void;
  readonly onReset: () => void;
}

interface SortOption {
  readonly value: ProductSort;
  readonly label: string;
}

const SORT_OPTIONS: readonly SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · low" },
  { value: "price-desc", label: "Price · high" },
  { value: "rating", label: "Top rated" },
];

export const FilterSidebar = ({
  filters,
  resultCount,
  onCategory,
  onMaxPrice,
  onSort,
  onReset,
}: FilterSidebarProps): ReactElement => (
  <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
    <div>
      <div className="flex items-baseline justify-between">
        <p className="label-mono">↳ filter</p>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[11px] uppercase tracking-wider2 text-muted hover:text-signal"
        >
          reset
        </button>
      </div>
      <p className="display-italic mt-3 text-3xl">{String(resultCount).padStart(2, "0")}</p>
      <p className="label-mono mt-1">results</p>
    </div>

    <div>
      <p className="label-mono mb-4">— category</p>
      <ul className="flex flex-col">
        <li>
          <button
            type="button"
            onClick={() => onCategory("all")}
            className={cn(
              "flex w-full items-baseline justify-between border-b border-hairline py-2 text-left font-mono text-[12px] uppercase tracking-wider2",
              filters.category === "all" ? "text-signal" : "hover:text-ink",
            )}
          >
            <span>all products</span>
            <span className="text-muted">00</span>
          </button>
        </li>
        {CATEGORY_META.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              onClick={() => onCategory(cat.id)}
              className={cn(
                "flex w-full items-baseline justify-between border-b border-hairline py-2 text-left font-mono text-[12px] uppercase tracking-wider2",
                filters.category === cat.id ? "text-signal" : "hover:text-ink",
              )}
            >
              <span>{cat.label}</span>
              <span className="text-muted">{cat.index}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <p className="label-mono mb-4">— price ceiling</p>
      <input
        type="range"
        min={PRICE_RANGE.min}
        max={PRICE_RANGE.max}
        step={10}
        value={filters.maxPrice}
        onChange={(e) => onMaxPrice(Number(e.target.value))}
        aria-label="Maximum price"
        className="w-full accent-signal"
      />
      <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-wider2 text-muted">
        <span>{formatPrice(PRICE_RANGE.min)}</span>
        <span className="text-ink">≤ {formatPrice(filters.maxPrice)}</span>
        <span>{formatPrice(PRICE_RANGE.max)}</span>
      </div>
    </div>

    <div>
      <p className="label-mono mb-4">— sort by</p>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSort(opt.value)}
            className={cn(
              "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider2 transition",
              filters.sort === opt.value
                ? "border-ink bg-ink text-bone"
                : "border-hairline text-ink hover:border-ink",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  </aside>
);
