"use client";

import { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  readonly product: Product;
  readonly fullWidth?: boolean;
}

export const AddToCartButton = ({
  product,
  fullWidth = false,
}: AddToCartButtonProps): ReactElement => {
  const { add } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [pulse, setPulse] = useState<boolean>(false);

  const handleAdd = (): void => {
    add(product.id, quantity);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 700);
  };

  const dec = (): void => setQuantity((q) => Math.max(1, q - 1));
  const inc = (): void => setQuantity((q) => Math.min(9, q + 1));

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      <div className="flex h-14 items-center border border-ink">
        <button
          type="button"
          onClick={dec}
          aria-label="Decrease quantity"
          className="h-full w-12 font-mono text-base hover:bg-ink hover:text-bone"
        >
          –
        </button>
        <span
          aria-live="polite"
          className="flex h-full min-w-[36px] items-center justify-center font-mono text-sm"
        >
          {String(quantity).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={inc}
          aria-label="Increase quantity"
          className="h-full w-12 font-mono text-base hover:bg-ink hover:text-bone"
        >
          +
        </button>
      </div>
      <Button
        size="lg"
        onClick={handleAdd}
        fullWidth={fullWidth}
        trailing={pulse ? "✓" : "→"}
        className="flex-1"
      >
        {pulse ? "added to cart" : "add to cart"}
      </Button>
    </div>
  );
};
