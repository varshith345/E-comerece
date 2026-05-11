import { cn } from "@/utils/cn";

interface RatingProps {
  readonly value: number;
  readonly reviewCount?: number;
  readonly className?: string;
}

export const Rating = ({ value, reviewCount, className }: RatingProps): JSX.Element => {
  const clamped = Math.max(0, Math.min(5, value));
  const percent = (clamped / 5) * 100;
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      role="img"
      aria-label={`Rated ${clamped.toFixed(1)} out of 5${
        reviewCount !== undefined ? ` from ${reviewCount} reviews` : ""
      }`}
    >
      <span
        className="relative inline-block font-mono text-[14px] leading-none"
        aria-hidden
      >
        <span className="text-hairline">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-signal"
          style={{ width: `${percent}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
        {clamped.toFixed(1)}
        {reviewCount !== undefined ? ` · ${reviewCount} reviews` : null}
      </span>
    </div>
  );
};
