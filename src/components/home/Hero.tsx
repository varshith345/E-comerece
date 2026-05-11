import Link from "next/link";
import type { ReactElement } from "react";
import { ROUTES } from "@/constants/routes";

export const Hero = (): ReactElement => (
  <section
    aria-labelledby="hero-heading"
    className="relative overflow-hidden border-b border-hairline"
  >
    <div className="shell relative grid min-h-[88vh] grid-cols-12 items-end gap-8 pb-16 pt-32 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-0 hidden h-full w-1/2 md:block"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 40%, rgba(255,61,0,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="col-span-12 flex items-center justify-between md:col-span-12">
        <p className="font-mono text-[11px] uppercase tracking-wider2 text-signal">
          ◐ est. mmxxvi — voltage collective
        </p>
        <p className="hidden font-mono text-[11px] uppercase tracking-wider2 text-muted md:block">
          catalog · 012 / 012
        </p>
      </div>

      <div className="col-span-12 md:col-span-9">
        <h1
          id="hero-heading"
          className="display-italic text-balance text-[clamp(3.5rem,11vw,11rem)] leading-[0.86] tracking-tightest text-ink animate-rise-in"
        >
          <span className="block">Sound.</span>
          <span className="block pl-[12%]">Pixels.</span>
          <span className="block">
            Power<span className="text-signal">.</span>
          </span>
        </h1>
      </div>

      <div className="col-span-12 flex flex-col gap-8 md:col-span-3 md:gap-10">
        <p className="max-w-xs text-pretty text-sm text-muted md:text-base">
          A small, deliberate catalog of electronics chosen for the desk that becomes the studio.
          Twelve products. Zero filler.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href={ROUTES.products}
            className="btn-primary h-12 px-6"
          >
            enter the catalog <span aria-hidden>→</span>
          </Link>
          <Link
            href={ROUTES.about}
            className="font-mono text-[11px] uppercase tracking-wider2 text-ink hover:text-signal"
          >
            ↳ read the studio note
          </Link>
        </div>
      </div>
    </div>

    <div className="shell flex items-center justify-between gap-4 border-t border-hairline py-5 font-mono text-[11px] uppercase tracking-wider2 text-muted">
      <span>↳ fig.01 — opening composition</span>
      <span className="hidden sm:inline">scroll to begin · 01 / 04</span>
      <span>shipped from san francisco</span>
    </div>
  </section>
);
