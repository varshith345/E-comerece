import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  readonly index: string;
  readonly kicker: string;
  readonly title: ReactNode;
  readonly titleId?: string;
  readonly description?: ReactNode;
  readonly aside?: ReactNode;
  readonly className?: string;
}

export const SectionHeader = ({
  index,
  kicker,
  title,
  titleId,
  description,
  aside,
  className,
}: SectionHeaderProps): JSX.Element => (
  <header className={cn("grid gap-8 md:grid-cols-12", className)}>
    <div className="md:col-span-1">
      <span className="font-mono text-[12px] tracking-wider2 text-signal">{index}</span>
    </div>
    <div className="md:col-span-7">
      <p className="label-mono">{kicker}</p>
      <h2
        {...(titleId ? { id: titleId } : {})}
        className="display-italic mt-3 text-balance text-4xl leading-[0.95] sm:text-5xl md:text-6xl"
      >
        {title}
      </h2>
    </div>
    <div className="md:col-span-4">
      {description ? (
        <p className="max-w-sm text-pretty text-sm text-muted md:text-base">{description}</p>
      ) : null}
      {aside ? <div className="mt-6">{aside}</div> : null}
    </div>
  </header>
);
