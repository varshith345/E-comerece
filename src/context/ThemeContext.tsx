"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "@/constants/storage";
import type { ResolvedTheme, ThemeMode } from "@/types/theme";

interface ThemeContextValue {
  readonly theme: ThemeMode;
  readonly resolvedTheme: ResolvedTheme;
  readonly hydrated: boolean;
  readonly setTheme: (next: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const VALID_MODES: readonly ThemeMode[] = ["system", "light", "dark"];

const isThemeMode = (value: string | null): value is ThemeMode =>
  value !== null && (VALID_MODES as readonly string[]).includes(value);

const readSystemPreference = (): ResolvedTheme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const resolveTheme = (mode: ThemeMode): ResolvedTheme =>
  mode === "system" ? readSystemPreference() : mode;

const applyTheme = (resolved: ResolvedTheme): void => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolved);
};

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolved] = useState<ResolvedTheme>("light");
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEYS.theme)
      : null;
    const initial: ThemeMode = isThemeMode(stored) ? stored : "system";
    setThemeState(initial);
    const next = resolveTheme(initial);
    setResolved(next);
    applyTheme(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent): void => {
      const next: ResolvedTheme = e.matches ? "dark" : "light";
      setResolved(next);
      applyTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    const resolved = resolveTheme(next);
    setResolved(resolved);
    applyTheme(resolved);
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, next);
    } catch {
      // ignore storage write failures
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, hydrated, setTheme }),
    [theme, resolvedTheme, hydrated, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
};
