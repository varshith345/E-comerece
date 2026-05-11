export interface AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

export interface AuthState {
  readonly user: AuthUser | null;
  readonly status: AuthStatus;
}

export type AuthStatus = "unauthenticated" | "authenticated";

export interface LoginInput {
  readonly email: string;
  readonly name: string;
}
