"use client";

import type { ChangeEvent, ReactElement } from "react";

interface ProductSearchProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly resultCount: number;
}

export const ProductSearch = ({
  value,
  onChange,
  resultCount,
}: ProductSearchProps): ReactElement => {
  const handle = (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value);
  return (
    <div className="flex items-center gap-6 border-b border-hairline pb-4">
      <span aria-hidden className="font-mono text-[12px] text-signal">
        ⌕
      </span>
      <input
        type="search"
        value={value}
        onChange={handle}
        placeholder="search the catalog · headphones, keyboards, displays …"
        aria-label="Search products"
        className="flex-1 bg-transparent font-display text-xl italic placeholder:not-italic placeholder:font-sans placeholder:text-base placeholder:text-muted focus:outline-none sm:text-2xl"
      />
      <span className="hidden font-mono text-[11px] uppercase tracking-wider2 text-muted sm:inline">
        {String(resultCount).padStart(2, "0")} matches
      </span>
    </div>
  );
};
