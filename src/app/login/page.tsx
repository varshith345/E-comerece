import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Mock sign-in for Voltage Collective — a showcase project that persists your cart across sessions.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

const LoginPage = (): JSX.Element => (
  <section className="shell pb-24 pt-16 sm:pt-24">
    <div className="grid gap-12 lg:grid-cols-12">
      <aside className="lg:col-span-5">
        <p className="label-mono">↳ account / 00</p>
        <h1 className="display-italic mt-3 text-balance text-5xl leading-[0.95] sm:text-6xl">
          One <em>account</em>, one cart, across devices.
        </h1>
        <p className="mt-6 max-w-md text-pretty text-sm text-muted sm:text-base">
          Voltage Collective is a portfolio piece, so the sign-in flow stays local — no server, no
          password, no email. The form on the right keeps your name and email on this device so
          the cart can travel with you between sessions.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-wider2 text-muted">
          <li className="border-l border-signal pl-3 text-ink">no server</li>
          <li className="border-l border-signal pl-3 text-ink">no password</li>
          <li className="border-l border-signal pl-3 text-ink">no tracking</li>
          <li className="border-l border-signal pl-3 text-ink">localstorage only</li>
        </ul>
      </aside>
      <div className="lg:col-span-7">
        <Suspense
          fallback={
            <div className="grid place-items-center py-32">
              <p className="font-mono text-[12px] uppercase tracking-wider2 text-muted">
                ↳ loading sign-in…
              </p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  </section>
);

export default LoginPage;
