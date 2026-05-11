import type { Metadata } from "next";
import { CTA } from "@/components/home/CTA";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Marquee } from "@/components/layout/Marquee";
import { SITE } from "@/constants/site";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

const MARQUEE_ITEMS = [
  "Sound",
  "Pixels",
  "Power",
  "Auditioned",
  "Repairable",
  "Real",
] as const;

const HomePage = (): JSX.Element => {
  const featured = getFeaturedProducts();
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <FeaturedProducts products={featured} />
      <WhyChooseUs />
      <CTA />
    </>
  );
};

export default HomePage;
