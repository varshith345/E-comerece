import Link from "next/link";
import type { ReactElement } from "react";
import { ROUTES } from "@/constants/routes";

export const CTA = (): ReactElement => (
  <section aria-labelledby="cta-heading" className="shell pb-24 pt-12 sm:pt-20">
    <div className="relative grid grid-cols-12 items-end gap-6 border border-ink bg-ink p-10 text-bone sm:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 80% at 90% 0%, rgba(255,61,0,0.35) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 col-span-12 md:col-span-8">
        <p className="font-mono text-[11px] uppercase tracking-wider2 text-signal">↳ 04 / outro</p>
        <h2
          id="cta-heading"
          className="display-italic mt-6 text-balance text-5xl leading-[0.95] sm:text-6xl md:text-7xl"
        >
          <em>Pick one thing.</em>
          <br />
          Live with it for years.
        </h2>
      </div>
      <div className="relative z-10 col-span-12 flex flex-col gap-4 md:col-span-4 md:items-end">
        <p className="max-w-xs text-pretty text-sm text-bone/70 md:text-right">
          Begin where most people end — with the catalog, not the campaign.
        </p>
        <Link
          href={ROUTES.products}
          className="inline-flex h-14 items-center gap-2 bg-signal px-8 font-mono text-[12px] uppercase tracking-wider2 text-bone hover:bg-bone hover:text-ink"
        >
          enter catalog <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
);
