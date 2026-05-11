"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

interface ProvidersProps {
  readonly children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): JSX.Element => (
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  </ThemeProvider>
);
