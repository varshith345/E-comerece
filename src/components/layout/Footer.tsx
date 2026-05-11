import Link from "next/link";
import type { ReactElement } from "react";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

interface FooterColumn {
  readonly title: string;
  readonly links: readonly { readonly href: string; readonly label: string }[];
}

const COLUMNS: readonly FooterColumn[] = [
  {
    title: "Catalog",
    links: [
      { href: ROUTES.products, label: "All products" },
      { href: `${ROUTES.products}?category=audio`, label: "Audio" },
      { href: `${ROUTES.products}?category=peripherals`, label: "Peripherals" },
      { href: `${ROUTES.products}?category=displays`, label: "Displays" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: ROUTES.about, label: "About" },
      { href: ROUTES.contact, label: "Contact" },
      { href: ROUTES.cart, label: "Cart" },
      { href: ROUTES.login, label: "Account" },
    ],
  },
];

export const Footer = (): ReactElement => (
  <footer className="mt-32 border-t border-ink bg-ink text-bone">
    <div className="shell pb-10 pt-24">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-wider2 text-signal">
            est. {SITE.founded} — san francisco
          </p>
          <h2 className="display-italic mt-6 max-w-xl text-balance text-5xl leading-[0.95] sm:text-6xl">
            Built for the desk that becomes the studio.
          </h2>
          <div className="mt-10 max-w-md">
            <p className="text-pretty text-sm text-bone/70">
              Voltage Collective curates electronics that hold up under real work. Every product is
              auditioned, measured, and disassembled before it earns a place in the catalog.
            </p>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] uppercase tracking-wider2 text-bone/40">
                  ↳ {col.title}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm hover:text-signal">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider2 text-bone/40">
                ↳ Studio
              </p>
              <address className="mt-5 not-italic">
                <p className="text-sm">{SITE.address.street}</p>
                <p className="text-sm">
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
                </p>
                <a href={`mailto:${SITE.email}`} className="mt-3 inline-block text-sm hover:text-signal">
                  {SITE.email}
                </a>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-4 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider2 text-bone/45">
          © {new Date().getFullYear()} {SITE.name}. A showcase project.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider2 text-bone/45">
          rev_01 · {SITE.tagline.toLowerCase()}
        </p>
      </div>
    </div>
  </footer>
);
