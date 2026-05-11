import type { ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Reason {
  readonly index: string;
  readonly title: string;
  readonly body: string;
}

const REASONS: readonly Reason[] = [
  {
    index: "01",
    title: "Auditioned, not advertised.",
    body: "Every product in the catalog is opened, listened to, and stress-tested on a real desk before it gets a page on this site. If we wouldn't use it, it isn't here.",
  },
  {
    index: "02",
    title: "Twelve products, not twelve hundred.",
    body: "A small catalog is a kind of editing. Less paralysis, less noise, less time wasted comparing seven flavors of the same plastic peripheral.",
  },
  {
    index: "03",
    title: "Repairable, returnable, real.",
    body: "We publish service manuals, stock spare parts for two years, and accept returns for thirty days with no questions and no friction.",
  },
  {
    index: "04",
    title: "Carbon-neutral by ship date.",
    body: "Shipping is consolidated, packaging is recyclable, and the studio offsets every order. None of this is a marketing program; it's an operational line item.",
  },
];

export const WhyChooseUs = (): ReactElement => (
  <section aria-labelledby="why-heading" className="shell py-24 sm:py-32">
    <SectionHeader
      index="03"
      kicker="Why us"
      titleId="why-heading"
      title={
        <>
          A studio, not a <em>storefront</em>.
        </>
      }
      description="Voltage Collective is run by three people, in one room, with one rule — nothing on the site we wouldn't put on our own desks. Here is what that means in practice."
    />

    <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-hairline md:grid-cols-2">
      {REASONS.map((reason) => (
        <article
          key={reason.index}
          className="group relative bg-bone p-8 transition-colors hover:bg-bone-2 sm:p-10"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-signal">
            ↳ {reason.index}
          </span>
          <h3 className="display-italic mt-6 text-balance text-3xl leading-tight sm:text-4xl">
            {reason.title}
          </h3>
          <p className="mt-5 max-w-md text-pretty text-sm text-muted sm:text-base">{reason.body}</p>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 bottom-6 h-px scale-x-0 bg-signal origin-left transition-transform duration-500 group-hover:scale-x-100"
          />
        </article>
      ))}
    </div>
  </section>
);
