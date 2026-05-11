import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type BadgeTone = "default" | "signal" | "ink";

interface BadgeProps {
  readonly tone?: BadgeTone;
  readonly children: ReactNode;
  readonly className?: string;
}

const TONES: Readonly<Record<BadgeTone, string>> = {
  default: "border-hairline text-ink",
  signal: "border-signal text-signal",
  ink: "border-ink bg-ink text-bone",
};

export const Badge = ({ tone = "default", children, className }: BadgeProps): JSX.Element => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider2",
      TONES[tone],
      className,
    )}
  >
    {children}
  </span>
);
