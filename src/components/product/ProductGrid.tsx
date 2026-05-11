import type { ReactElement } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";
import { cn } from "@/utils/cn";

interface ProductGridProps {
  readonly products: readonly Product[];
  readonly priorityCount?: number;
  readonly className?: string;
}

export const ProductGrid = ({
  products,
  priorityCount = 0,
  className,
}: ProductGridProps): ReactElement => (
  <ul
    className={cn(
      "grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
  >
    {products.map((product, i) => (
      <li key={product.id}>
        <ProductCard product={product} index={i} priority={i < priorityCount} />
      </li>
    ))}
  </ul>
);
