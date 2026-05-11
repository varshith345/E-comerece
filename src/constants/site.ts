export const SITE = {
  name: "Voltage Collective",
  shortName: "Voltage",
  tagline: "Sound. Pixels. Power.",
  description:
    "Voltage Collective is an editorial electronics showcase — a curated catalog of headphones, peripherals, wearables, and displays built for makers and dreamers.",
  url: "https://voltage-collective.example.com",
  locale: "en_US",
  email: "studio@voltage-collective.example.com",
  phone: "+1 (415) 555-0117",
  address: {
    street: "118 Mission Street",
    city: "San Francisco",
    region: "CA",
    postal: "94105",
    country: "USA",
  },
  social: {
    twitter: "@voltageco",
  },
  founded: "MMXXVI",
} as const;

export const CART = {
  freeShippingThreshold: 150,
  shippingFee: 12,
  taxRate: 0.08,
  maxQuantityPerLine: 9,
} as const;

export const PRICE_RANGE = {
  min: 0,
  max: 1000,
} as const;
