import { CART } from "@/constants/site";
import { getProductById } from "@/lib/products";
import type { CartLine, CartState, CartTotals, ResolvedCartLine } from "@/types/cart";

export const EMPTY_CART_STATE: CartState = { lines: [] };

const clampQuantity = (quantity: number): number => {
  if (Number.isNaN(quantity) || quantity < 1) return 1;
  if (quantity > CART.maxQuantityPerLine) return CART.maxQuantityPerLine;
  return Math.floor(quantity);
};

export const addLine = (
  state: CartState,
  productId: string,
  quantity: number,
): CartState => {
  const next = clampQuantity(quantity);
  const existing = state.lines.find((l) => l.productId === productId);
  if (existing) {
    return updateLineQuantity(state, productId, existing.quantity + next);
  }
  return { lines: [...state.lines, { productId, quantity: next }] };
};

export const updateLineQuantity = (
  state: CartState,
  productId: string,
  quantity: number,
): CartState => {
  if (quantity < 1) {
    return removeLine(state, productId);
  }
  const next = clampQuantity(quantity);
  return {
    lines: state.lines.map((l) =>
      l.productId === productId ? { productId: l.productId, quantity: next } : l,
    ),
  };
};

export const removeLine = (state: CartState, productId: string): CartState => ({
  lines: state.lines.filter((l) => l.productId !== productId),
});

export const resolveLines = (lines: readonly CartLine[]): readonly ResolvedCartLine[] => {
  const resolved: ResolvedCartLine[] = [];
  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product) continue;
    resolved.push({
      product,
      quantity: line.quantity,
      lineTotal: product.price * line.quantity,
    });
  }
  return resolved;
};

export const computeTotals = (lines: readonly ResolvedCartLine[]): CartTotals => {
  const subtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);
  const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= CART.freeShippingThreshold ? 0 : CART.shippingFee;
  const tax = Math.round(subtotal * CART.taxRate * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  return { subtotal, shipping, tax, total, itemCount };
};
