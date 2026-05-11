import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/components/product/ProductListing";

export const metadata: Metadata = {
  title: "Shop the catalog",
  description:
    "Browse the full Voltage Collective catalog — twelve electronics chosen for desks that become studios. Filter by category and price, search by name.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Shop the catalog · Voltage Collective",
    description:
      "Browse the full Voltage Collective catalog — twelve electronics chosen for desks that become studios.",
  },
};

const ProductsPage = (): JSX.Element => (
  <section className="shell pb-24 pt-16 sm:pt-24">
    <header className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-1">
        <span className="font-mono text-[12px] tracking-wider2 text-signal">↳</span>
      </div>
      <div className="md:col-span-7">
        <p className="label-mono">— catalog index</p>
        <h1 className="display-italic mt-3 text-balance text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
          The <em>catalog</em> &mdash; twelve items, no filler.
        </h1>
      </div>
      <div className="md:col-span-4">
        <p className="max-w-sm text-pretty text-sm text-muted md:text-base">
          Use the filters to narrow by category or price ceiling. Search anywhere in title,
          tagline, or description. Sort by featured, by price, or by what reviewers loved.
        </p>
      </div>
    </header>

    <div className="rule-h mt-16" />

    <div className="mt-12">
      <Suspense
        fallback={
          <div className="grid place-items-center py-32">
            <p className="font-mono text-[12px] uppercase tracking-wider2 text-muted">
              ↳ loading catalog…
            </p>
          </div>
        }
      >
        <ProductListing />
      </Suspense>
    </div>
  </section>
);

export default ProductsPage;
