"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/context/CartContext";

export const CartView = (): ReactElement => {
  const { lines, totals, setQuantity, remove, clear, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="grid place-items-center py-32">
        <p className="font-mono text-[12px] uppercase tracking-wider2 text-muted">
          ↳ loading cart…
        </p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        eyebrow="Empty bag"
        title="Nothing in the cart yet."
        description="Pick something from the catalog — the cart will remember it across sessions on this device."
        action={
          <Link href={ROUTES.products} className="btn-primary h-11 px-6">
            browse the catalog →
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="label-mono">↳ {String(lines.length).padStart(2, "0")} lines</p>
        <h2 className="display-italic mt-3 text-balance text-5xl leading-[0.95] sm:text-6xl">
          <em>Bag</em> &mdash; awaiting checkout.
        </h2>
        <ul className="mt-12 flex flex-col">
          {lines.map((line, i) => (
            <CartItem
              key={line.product.id}
              line={line}
              index={i}
              onQuantity={setQuantity}
              onRemove={remove}
            />
          ))}
        </ul>
      </div>
      <div className="lg:col-span-4">
        <CartSummary totals={totals} onClear={clear} />
      </div>
    </div>
  );
};
