"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";

interface LoginFormState {
  readonly email: string;
  readonly name: string;
}

interface LoginFormErrors {
  readonly email?: string;
  readonly name?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY: LoginFormState = { email: "", name: "" };

const validate = (state: LoginFormState): LoginFormErrors => {
  const next: { -readonly [K in keyof LoginFormErrors]: string } = {};
  if (state.name.trim().length < 2) next.name = "Please enter your name.";
  if (!EMAIL_RE.test(state.email.trim())) next.email = "A valid email, even mocked.";
  return next;
};

export const LoginForm = (): ReactElement => {
  const router = useRouter();
  const params = useSearchParams();
  const { login, user, logout } = useAuth();
  const [state, setState] = useState<LoginFormState>(EMPTY);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  if (user) {
    return (
      <div className="border border-hairline p-10">
        <p className="label-mono text-signal">↳ Signed in</p>
        <h3 className="display-italic mt-4 text-4xl">Welcome back, {user.name.split(" ")[0] ?? user.name}.</h3>
        <p className="mt-3 max-w-md text-sm text-muted">
          You&apos;re signed in as <span className="font-mono text-[12px]">{user.email}</span>.
          Your cart will travel with you across sessions on this device.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => router.push(ROUTES.products)} trailing="→">
            browse catalog
          </Button>
          <button
            type="button"
            onClick={logout}
            className="font-mono text-[11px] uppercase tracking-wider2 text-muted hover:text-signal"
          >
            ↳ sign out
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const next = validate(state);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    login(state);
    const redirect = params.get("next");
    router.push(redirect ?? ROUTES.products);
  };

  const set = <K extends keyof LoginFormState>(key: K, value: LoginFormState[K]): void => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-8 border border-hairline p-8 sm:p-10"
    >
      <div>
        <p className="label-mono">↳ Account</p>
        <h2 className="display-italic mt-3 text-balance text-4xl sm:text-5xl">
          <em>Sign in</em> &mdash; mocked, friendly.
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted">
          No password, no email sent. Voltage Collective is a showcase project, so the sign-in only
          stores a name and email on your device.
        </p>
      </div>

      <Input
        label="Your name"
        value={state.name}
        onChange={(e) => set("name", e.target.value)}
        autoComplete="name"
        required
        {...(errors.name ? { error: errors.name } : {})}
      />
      <Input
        label="Email"
        type="email"
        value={state.email}
        onChange={(e) => set("email", e.target.value)}
        autoComplete="email"
        required
        {...(errors.email ? { error: errors.email } : {})}
      />

      <div className="flex items-center justify-between gap-4 border-t border-hairline pt-6">
        <p className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
          guest cart will merge in
        </p>
        <Button type="submit" size="lg" trailing="→">
          continue
        </Button>
      </div>
    </form>
  );
};
