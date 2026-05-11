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
import { clearStorage, readStorage, writeStorage } from "@/utils/storage";
import type { AuthState, AuthUser, LoginInput } from "@/types/auth";

interface AuthContextValue {
  readonly user: AuthUser | null;
  readonly isAuthenticated: boolean;
  readonly hydrated: boolean;
  readonly login: (input: LoginInput) => AuthUser;
  readonly logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const UNAUTHENTICATED: AuthState = { user: null, status: "unauthenticated" };

const makeUserId = (email: string): string =>
  `usr_${email.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12) || "guest"}`;

interface AuthProviderProps {
  readonly children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, setState] = useState<AuthState>(UNAUTHENTICATED);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    const persisted = readStorage<AuthState>(STORAGE_KEYS.auth, UNAUTHENTICATED);
    if (persisted.user) {
      setState({ user: persisted.user, status: "authenticated" });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage<AuthState>(STORAGE_KEYS.auth, state);
  }, [state, hydrated]);

  const login = useCallback((input: LoginInput): AuthUser => {
    const user: AuthUser = {
      id: makeUserId(input.email),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    };
    setState({ user, status: "authenticated" });
    return user;
  }, []);

  const logout = useCallback(() => {
    setState(UNAUTHENTICATED);
    clearStorage(STORAGE_KEYS.auth);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      isAuthenticated: state.status === "authenticated",
      hydrated,
      login,
      logout,
    }),
    [state, hydrated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
};
