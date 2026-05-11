import type { ReactElement } from "react";

interface MarqueeProps {
  readonly items: readonly string[];
}

export const Marquee = ({ items }: MarqueeProps): ReactElement => {
  const segments = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-hairline bg-bone-2 py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {segments.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-3xl italic leading-none tracking-tightest"
          >
            {item}
            <span aria-hidden className="ml-12 inline-block h-2 w-2 -translate-y-2 rounded-full bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
};
