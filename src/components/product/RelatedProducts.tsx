import type { ReactElement } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  readonly products: readonly Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps): ReactElement | null => {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-32">
      <SectionHeader
        index="↳ Related"
        kicker="Same shelf"
        title={<><em>Pairs well</em> with the catalog.</>}
        description="Hand-picked companions from the same family — chosen because they sound, feel, or work better together."
      />
      <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <li key={p.id}>
            <ProductCard product={p} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
};
