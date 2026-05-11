import Link from "next/link";
import type { ReactElement } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  readonly products: readonly Product[];
}

export const FeaturedProducts = ({ products }: FeaturedProductsProps): ReactElement => (
  <section
    aria-labelledby="featured-heading"
    className="shell py-24 sm:py-32"
  >
    <SectionHeader
      index="02"
      kicker="Featured / Editor's selection"
      titleId="featured-heading"
      title={
        <>
          A small <em>library</em> of objects
          <br className="hidden sm:block" /> we&apos;d buy again.
        </>
      }
      description="Picked from the catalog by hand. Each one is something we keep on our own desks — tested for sound, for feel, for the way it ages."
      aside={
        <Link
          href={ROUTES.products}
          className="font-mono text-[12px] uppercase tracking-wider2 text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
        >
          view full catalog →
        </Link>
      }
    />

    <ul className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p, i) => (
        <li
          key={p.id}
          className={i % 2 === 1 ? "lg:translate-y-12" : ""}
        >
          <ProductCard product={p} index={i} priority={i < 2} />
        </li>
      ))}
    </ul>
  </section>
);
