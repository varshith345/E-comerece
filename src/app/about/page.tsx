import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Voltage Collective is a three-person electronics studio in San Francisco. We pick twelve products at a time and stand behind every one.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Studio · Voltage Collective",
    description:
      "A three-person electronics studio in San Francisco. Twelve products at a time. Each one earns its place.",
  },
};

interface TimelineEntry {
  readonly year: string;
  readonly title: string;
  readonly body: string;
}

const TIMELINE: readonly TimelineEntry[] = [
  {
    year: "2021",
    title: "A room. A list of objects.",
    body: "We started by writing down every gadget we wished existed — fewer, better, repairable — and audited the market against the list.",
  },
  {
    year: "2023",
    title: "Catalog v1, twelve items.",
    body: "After two years of testing, we published the first twelve-product catalog. None of the launch products are still in the catalog. All have been replaced by better ones.",
  },
  {
    year: "2025",
    title: "Service manuals public.",
    body: "Every product page now links to the full service manual, a parts list, and a thirty-second repair walkthrough.",
  },
  {
    year: "2026",
    title: "Catalog v4 — this site.",
    body: "Twelve current products, three editors, one room. We still publish to the same twelve-product cap.",
  },
];

const AboutPage = (): JSX.Element => (
  <>
    <section className="shell pb-16 pt-20 sm:pt-28">
      <p className="label-mono">↳ studio · 01 / 03</p>
      <h1 className="display-italic mt-3 text-balance text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tightest">
        <em>A studio</em>, not
        <br className="hidden sm:block" /> a storefront.
      </h1>
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-1" />
        <div className="md:col-span-6">
          <p className="text-pretty text-base leading-relaxed sm:text-lg">
            Voltage Collective is three editors in a single sunlit room in San Francisco. We
            don&apos;t accept advertising. We don&apos;t take affiliate fees. We buy every product on
            the catalog at retail and tear it open before it earns a page on this site. Then we
            keep it on our own desks for at least a month. Then we publish.
          </p>
          <p className="mt-6 text-pretty text-base leading-relaxed sm:text-lg">
            The catalog is intentionally small — twelve products at any time. That number is a
            constraint, not a target, and it forces a conversation: if a new product is going on
            the site, which existing one is coming off?
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="border-l border-signal pl-6">
            <p className="display-italic text-balance text-4xl leading-tight">
              &ldquo;The only number we&apos;d optimize for is how long a product stays useful.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider2 text-muted">
              ↳ ada moreno · editor-in-chief
            </p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="timeline-heading" className="shell border-t border-hairline py-24">
      <SectionHeader
        index="02"
        kicker="Timeline"
        title={
          <>
            Four notes from the <em>studio log</em>.
          </>
        }
        description="A short timeline of the work, not a brand story. Dates are real, products are still listed (or were retired). We keep a public changelog for the catalog as well."
      />
      <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {TIMELINE.map((entry, i) => (
          <li key={entry.year} className="relative bg-bone p-8 sm:p-10">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-signal">
              ↳ {String(i + 1).padStart(2, "0")}
            </span>
            <p className="display mt-6 text-4xl">{entry.year}</p>
            <h3 className="display-italic mt-4 text-balance text-2xl leading-tight">
              {entry.title}
            </h3>
            <p className="mt-3 text-sm text-muted">{entry.body}</p>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="visit-heading" className="shell pb-32 pt-16">
      <div className="grid gap-8 border-t border-hairline pt-16 md:grid-cols-12">
        <div className="md:col-span-1">
          <span className="font-mono text-[12px] tracking-wider2 text-signal">03</span>
        </div>
        <div className="md:col-span-6">
          <p className="label-mono">— visit</p>
          <h2 id="visit-heading" className="display-italic mt-3 text-balance text-4xl leading-tight sm:text-5xl">
            Come by, by appointment.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-sm text-muted sm:text-base">
            The studio doors are open on Thursdays for anyone who wants to audition a product
            on real speakers, on a real desk, in real light. Email ahead and we&apos;ll set the
            kettle.
          </p>
          <div className="mt-8 flex flex-col gap-2 font-mono text-[12px] uppercase tracking-wider2">
            <p>{SITE.address.street}</p>
            <p>{SITE.address.city} · {SITE.address.region} · {SITE.address.postal}</p>
            <a href={`mailto:${SITE.email}`} className="mt-2 text-signal hover:underline">
              {SITE.email}
            </a>
          </div>
        </div>
        <div className="flex items-end md:col-span-5 md:justify-end">
          <Link href={ROUTES.contact} className="btn-primary h-14 px-8">
            write the studio →
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
