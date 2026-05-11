import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write the studio. Voltage Collective is a three-person operation in San Francisco and we reply to every message within two working days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Voltage Collective",
    description:
      "Write the studio. Voltage Collective is a three-person operation in San Francisco.",
  },
};

const CHANNELS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/[^0-9+]/g, "")}` },
  { label: "Studio", value: `${SITE.address.city}, ${SITE.address.region}`, href: "#" },
];

const ContactPage = (): JSX.Element => (
  <section className="shell pb-32 pt-16 sm:pt-24">
    <p className="label-mono">↳ contact · 01 / 01</p>
    <h1 className="display-italic mt-3 text-balance text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tightest">
      Write the <em>studio</em>.
    </h1>

    <div className="mt-16 grid gap-12 lg:grid-cols-12">
      <aside className="lg:col-span-5">
        <p className="max-w-md text-pretty text-base leading-relaxed text-muted">
          We answer email faster than phone. The form on the right routes to the same inbox the
          editors read every morning. Expect a reply within two working days — from a real
          person, not a queue.
        </p>

        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden bg-hairline">
          {CHANNELS.map((c) => (
            <div key={c.label} className="bg-bone p-6">
              <dt className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
                ↳ {c.label}
              </dt>
              <dd className="mt-3">
                <a href={c.href} className="display-italic text-2xl hover:text-signal">
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 border-l border-signal pl-5">
          <p className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
            ↳ studio hours
          </p>
          <p className="mt-3 font-mono text-[13px]">
            mon–thu · 10:00 — 18:00 PT<br />
            fri · 10:00 — 14:00 PT
          </p>
        </div>
      </aside>

      <div className="lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  </section>
);

export default ContactPage;
