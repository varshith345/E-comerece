"use client";

import type { ReactElement } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeMode } from "@/types/theme";
import { cn } from "@/utils/cn";

interface ThemeOptionDef {
  readonly value: ThemeMode;
  readonly label: string;
  readonly aria: string;
  readonly Icon: () => ReactElement;
}

const SystemIcon = (): ReactElement => (
  <svg
    viewBox="0 0 12 12"
    width="12"
    height="12"
    fill="none"
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="6" cy="6" r="4.6" stroke="currentColor" strokeWidth="1.1" />
    <path d="M6 1.4A4.6 4.6 0 0 1 6 10.6Z" fill="currentColor" />
  </svg>
);

const SunIcon = (): ReactElement => (
  <svg
    viewBox="0 0 12 12"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="6" cy="6" r="1.9" />
    <path d="M6 1.2v1.3M6 9.5v1.3M1.2 6h1.3M9.5 6h1.3M2.6 2.6l.95.95M8.45 8.45l.95.95M2.6 9.4l.95-.95M8.45 3.55l.95-.95" />
  </svg>
);

const MoonIcon = (): ReactElement => (
  <svg
    viewBox="0 0 12 12"
    width="12"
    height="12"
    fill="none"
    aria-hidden="true"
    role="presentation"
  >
    <path
      d="M10.4 7.5A4.8 4.8 0 1 1 4.5 1.6 3.8 3.8 0 0 0 10.4 7.5Z"
      fill="currentColor"
    />
  </svg>
);

const OPTIONS: readonly ThemeOptionDef[] = [
  { value: "system", label: "sys", aria: "Match system theme", Icon: SystemIcon },
  { value: "light", label: "lite", aria: "Switch to light theme", Icon: SunIcon },
  { value: "dark", label: "drk", aria: "Switch to dark theme", Icon: MoonIcon },
];

interface ThemeToggleProps {
  readonly className?: string;
  readonly expanded?: boolean;
}

export const ThemeToggle = ({
  className,
  expanded = false,
}: ThemeToggleProps): ReactElement => {
  const { theme, setTheme, hydrated } = useTheme();
  const found = OPTIONS.findIndex((o) => o.value === theme);
  const index = found === -1 ? 0 : found;

  const segmentPx = expanded ? 88 : 36;
  const buttonClass = expanded ? "w-[88px] gap-1.5" : "w-9";
  const trackWidth = segmentPx * OPTIONS.length;

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-1",
        className,
      )}
    >
      <div
        role="radiogroup"
        aria-label="Theme"
        className="relative inline-flex items-center rounded-full border border-hairline bg-bone-2 p-[3px]"
        style={{
          boxShadow: "inset 0 1px 0 rgb(var(--hairline-rgb) / 0.06)",
        }}
      >
        {/* sliding knob */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-[3px] left-[3px] rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            expanded ? "w-[88px]" : "w-9",
          )}
          style={{ transform: `translateX(${index * segmentPx}px)` }}
        />

        {OPTIONS.map((opt) => {
          const active = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={opt.aria}
              title={opt.aria}
              onClick={() => setTheme(opt.value)}
              className={cn(
                "relative z-10 inline-flex h-[26px] items-center justify-center font-mono text-[10px] uppercase tracking-wider2 transition-colors duration-200",
                buttonClass,
                active ? "text-bone" : "text-muted hover:text-ink",
              )}
            >
              <opt.Icon />
              {expanded ? <span>{opt.label}</span> : null}
            </button>
          );
        })}
      </div>

      {/* LED rail — sliding orange power indicator under the active segment */}
      <div
        aria-hidden
        className="relative h-[6px]"
        style={{ width: `${trackWidth}px` }}
      >
        <span
          className="absolute top-[2px] flex h-1 items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: `${segmentPx}px`,
            transform: `translateX(${index * segmentPx}px)`,
          }}
        >
          <span
            className={cn(
              "block h-1 w-1 rounded-full bg-signal",
              hydrated && "animate-led-pulse",
            )}
            style={{ boxShadow: "0 0 6px rgba(255,61,0,0.55)" }}
          />
        </span>
      </div>
    </div>
  );
};
