const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const USDPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

export const formatPrice = (value: number): string => USD.format(value);
export const formatPricePrecise = (value: number): string => USDPrecise.format(value);
export const formatCount = (value: number): string => compact.format(value);

export const padIndex = (index: number, total = 2): string =>
  String(index).padStart(total, "0");
