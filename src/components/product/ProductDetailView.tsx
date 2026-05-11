import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LABELS } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductDetailViewProps {
  readonly product: Product;
}

export const ProductDetailView = ({ product }: ProductDetailViewProps): ReactElement => (
  <article className="grid gap-12 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider2 text-muted">
        <Link href={ROUTES.home} className="hover:text-ink">home</Link>
        <span>/</span>
        <Link href={ROUTES.products} className="hover:text-ink">shop</Link>
        <span>/</span>
        <span className="text-ink">{product.id}</span>
      </nav>
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-hairline card-art">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          priority
          className="object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <Badge tone="ink">↳ {product.id}</Badge>
          {product.featured ? <Badge tone="signal">featured</Badge> : null}
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge>{CATEGORY_LABELS[product.category]}</Badge>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-8">
      <header>
        <p className="label-mono">— {CATEGORY_LABELS[product.category]}</p>
        <h1 className="display-italic mt-3 text-balance text-5xl leading-[0.95] sm:text-6xl">
          {product.title}
        </h1>
        <p className="mt-4 text-pretty text-base text-muted">{product.tagline}</p>
        <div className="mt-6 flex items-center justify-between">
          <p className="font-mono text-2xl">{formatPrice(product.price)}</p>
          <Rating value={product.rating} reviewCount={product.reviewCount} />
        </div>
      </header>

      <div className="rule-h" />

      <p className="text-pretty text-base leading-relaxed text-ink/80">{product.description}</p>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {product.highlights.map((h) => (
          <li key={h} className="flex gap-3 border-l border-signal pl-3">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-signal">●</span>
            <span className="text-sm">{h}</span>
          </li>
        ))}
      </ul>

      <AddToCartButton product={product} fullWidth />

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-hairline pt-6">
        {product.specs.map((spec) => (
          <div key={spec.label} className="flex justify-between border-b border-hairline pb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
              {spec.label}
            </span>
            <span className="font-mono text-[12px]">{spec.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider2 text-muted">
        <span>free shipping over $150</span>
        <span>{product.stock > 0 ? `${product.stock} in stock` : "sold out"}</span>
      </div>
    </div>
  </article>
);
