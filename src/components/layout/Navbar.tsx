"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/utils/cn";

interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly index: string;
}

const NAV: readonly NavItem[] = [
  { href: ROUTES.products, label: "shop", index: "01" },
  { href: ROUTES.about, label: "studio", index: "02" },
  { href: ROUTES.contact, label: "contact", index: "03" },
];

export const Navbar = (): ReactElement => {
  const { totals, hydrated } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const count = hydrated ? totals.itemCount : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bone/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.home}
            className="group flex items-baseline gap-2"
            aria-label={`${SITE.name} — home`}
          >
            <span aria-hidden className="block h-2 w-2 rounded-full bg-signal" />
            <span className="font-mono text-[12px] uppercase tracking-wider2">
              voltage<span className="text-signal">/</span>collective
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-2 font-mono text-[12px] uppercase tracking-wider2 text-ink transition hover:text-signal"
            >
              <span className="text-muted group-hover:text-signal">{item.index}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <ThemeToggle className="hidden md:inline-flex" />
          <Link
            href={ROUTES.login}
            className="hidden font-mono text-[12px] uppercase tracking-wider2 hover:text-signal md:inline-flex"
          >
            {user ? user.name.split(" ")[0] ?? "account" : "sign in"}
          </Link>
          <Link
            href={ROUTES.cart}
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider2"
          >
            <span className="hover:text-signal">cart</span>
            <span
              aria-label={`${count} items in cart`}
              className={cn(
                "inline-flex h-6 min-w-[24px] items-center justify-center px-1.5 text-[11px]",
                count > 0 ? "bg-signal text-bone" : "border border-hairline text-muted",
              )}
            >
              {String(count).padStart(2, "0")}
            </span>
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-[12px] uppercase tracking-wider2 hover:text-signal md:hidden"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-hairline bg-bone md:hidden">
          <nav className="shell flex flex-col py-6" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-hairline py-4 last:border-b-0"
              >
                <span className="display-italic text-2xl">{item.label}</span>
                <span className="font-mono text-[11px] text-muted">{item.index}</span>
              </Link>
            ))}
            <Link
              href={ROUTES.login}
              onClick={() => setOpen(false)}
              className="mt-4 font-mono text-[12px] uppercase tracking-wider2 text-signal"
            >
              {user ? `↳ signed in as ${user.name}` : "↳ sign in"}
            </Link>

            <div className="mt-8 flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider2 text-muted">
                ↳ display mode · pwr
              </span>
              <ThemeToggle expanded />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
