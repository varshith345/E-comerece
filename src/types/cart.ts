import type { Product } from "@/types/product";

export interface CartLine {
  readonly productId: Product["id"];
  readonly quantity: number;
}

export interface CartState {
  readonly lines: readonly CartLine[];
}

export interface ResolvedCartLine {
  readonly product: Product;
  readonly quantity: number;
  readonly lineTotal: number;
}

export interface CartTotals {
  readonly subtotal: number;
  readonly shipping: number;
  readonly tax: number;
  readonly total: number;
  readonly itemCount: number;
}

export type CartAction =
  | { readonly type: "ADD"; readonly productId: Product["id"]; readonly quantity: number }
  | { readonly type: "REMOVE"; readonly productId: Product["id"] }
  | { readonly type: "UPDATE_QUANTITY"; readonly productId: Product["id"]; readonly quantity: number }
  | { readonly type: "CLEAR" }
  | { readonly type: "HYDRATE"; readonly lines: readonly CartLine[] };
