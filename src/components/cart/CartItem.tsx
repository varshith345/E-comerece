"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ROUTES } from "@/constants/routes";
import { formatPricePrecise } from "@/lib/format";
import type { ResolvedCartLine } from "@/types/cart";

interface CartItemProps {
  readonly line: ResolvedCartLine;
  readonly index: number;
  readonly onQuantity: (productId: string, quantity: number) => void;
  readonly onRemove: (productId: string) => void;
}

export const CartItem = ({
  line,
  index,
  onQuantity,
  onRemove,
}: CartItemProps): ReactElement => {
  const { product, quantity, lineTotal } = line;

  return (
    <li className="grid grid-cols-12 items-center gap-4 border-b border-hairline py-6 first:border-t first:pt-6">
      <span className="col-span-12 font-mono text-[11px] uppercase tracking-wider2 text-muted sm:col-span-1">
        ↳ {String(index + 1).padStart(2, "0")}
      </span>

      <Link
        href={ROUTES.product(product.id)}
        className="col-span-3 block aspect-square overflow-hidden border border-hairline card-art sm:col-span-2"
        aria-label={product.title}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="col-span-9 sm:col-span-4">
        <Link href={ROUTES.product(product.id)}>
          <h3 className="display-italic text-balance text-2xl leading-tight hover:text-signal">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{product.tagline}</p>
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          className="mt-3 font-mono text-[11px] uppercase tracking-wider2 text-muted hover:text-signal"
        >
          ✕ remove
        </button>
      </div>

      <div className="col-span-6 flex items-center sm:col-span-3 sm:justify-center">
        <div className="flex items-center border border-hairline">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onQuantity(product.id, quantity - 1)}
            className="h-10 w-10 font-mono hover:bg-ink hover:text-bone"
          >
            –
          </button>
          <span className="flex h-10 min-w-[28px] items-center justify-center font-mono text-sm">
            {String(quantity).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => onQuantity(product.id, quantity + 1)}
            className="h-10 w-10 font-mono hover:bg-ink hover:text-bone"
          >
            +
          </button>
        </div>
      </div>

      <div className="col-span-6 text-right sm:col-span-2">
        <p className="font-mono text-base">{formatPricePrecise(lineTotal)}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider2 text-muted">
          {formatPricePrecise(product.price)} ea
        </p>
      </div>
    </li>
  );
};
