"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "@/constants/storage";
import {
  EMPTY_CART_STATE,
  addLine,
  computeTotals,
  removeLine,
  resolveLines,
  updateLineQuantity,
} from "@/lib/cart";
import { readStorage, writeStorage } from "@/utils/storage";
import type { CartAction, CartState, CartTotals, ResolvedCartLine } from "@/types/cart";

interface CartContextValue {
  readonly state: CartState;
  readonly lines: readonly ResolvedCartLine[];
  readonly totals: CartTotals;
  readonly hydrated: boolean;
  readonly add: (productId: string, quantity?: number) => void;
  readonly remove: (productId: string) => void;
  readonly setQuantity: (productId: string, quantity: number) => void;
  readonly clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD":
      return addLine(state, action.productId, action.quantity);
    case "REMOVE":
      return removeLine(state, action.productId);
    case "UPDATE_QUANTITY":
      return updateLineQuantity(state, action.productId, action.quantity);
    case "CLEAR":
      return EMPTY_CART_STATE;
    case "HYDRATE":
      return { lines: action.lines };
  }
};

interface CartProviderProps {
  readonly children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, EMPTY_CART_STATE);
  const [hydrated, setHydrated] = useReducer(() => true, false);

  useEffect(() => {
    const persisted = readStorage<CartState>(STORAGE_KEYS.cart, EMPTY_CART_STATE);
    if (persisted.lines.length > 0) {
      dispatch({ type: "HYDRATE", lines: persisted.lines });
    }
    setHydrated();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage<CartState>(STORAGE_KEYS.cart, state);
  }, [state, hydrated]);

  const add = useCallback((productId: string, quantity = 1) => {
    dispatch({ type: "ADD", productId, quantity });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveLines(state.lines);
    const totals = computeTotals(lines);
    return { state, lines, totals, hydrated, add, remove, setQuantity, clear };
  }, [state, hydrated, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
};
