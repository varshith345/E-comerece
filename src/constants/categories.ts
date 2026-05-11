export const ProductCategory = {
  Audio: "audio",
  Wearables: "wearables",
  Peripherals: "peripherals",
  Displays: "displays",
  Accessories: "accessories",
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export interface CategoryMeta {
  readonly id: ProductCategory;
  readonly label: string;
  readonly index: string;
}

export const CATEGORY_META: readonly CategoryMeta[] = [
  { id: ProductCategory.Audio, label: "Audio", index: "01" },
  { id: ProductCategory.Wearables, label: "Wearables", index: "02" },
  { id: ProductCategory.Peripherals, label: "Peripherals", index: "03" },
  { id: ProductCategory.Displays, label: "Displays", index: "04" },
  { id: ProductCategory.Accessories, label: "Accessories", index: "05" },
];

export const CATEGORY_LABELS: Readonly<Record<ProductCategory, string>> = {
  [ProductCategory.Audio]: "Audio",
  [ProductCategory.Wearables]: "Wearables",
  [ProductCategory.Peripherals]: "Peripherals",
  [ProductCategory.Displays]: "Displays",
  [ProductCategory.Accessories]: "Accessories",
};
