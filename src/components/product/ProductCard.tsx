import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { CATEGORY_LABELS } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  readonly product: Product;
  readonly index?: number;
  readonly priority?: boolean;
  readonly className?: string;
}

export const ProductCard = ({
  product,
  index,
  priority = false,
  className,
}: ProductCardProps): ReactElement => {
  const indexLabel = index !== undefined ? String(index + 1).padStart(2, "0") : product.id;

  return (
    <Link
      href={ROUTES.product(product.id)}
      className={cn("group flex flex-col gap-4 outline-none", className)}
      aria-label={`${product.title} — ${formatPrice(product.price)}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-hairline card-art">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 100vw"
          priority={priority}
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-0 transition group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 100%, rgba(255,61,0,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-ink/70">
            ↳ {indexLabel}
          </span>
          {product.featured ? (
            <span className="bg-signal px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider2 text-bone">
              featured
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wider2 text-ink/55">
          {CATEGORY_LABELS[product.category]}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="display-italic text-balance text-2xl leading-tight">{product.title}</h3>
          <p className="mt-1.5 line-clamp-1 text-pretty text-sm text-muted">{product.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-[12px] uppercase tracking-wider2 text-muted">price</p>
          <p className="font-mono text-base">{formatPrice(product.price)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-hairline pt-3">
        <span className="font-mono text-[11px] uppercase tracking-wider2 text-ink group-hover:text-signal">
          view product →
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
          {product.stock > 0 ? `${product.stock} in stock` : "sold out"}
        </span>
      </div>
    </Link>
  );
};
