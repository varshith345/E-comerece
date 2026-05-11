"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

interface ProvidersProps {
  readonly children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): JSX.Element => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);
