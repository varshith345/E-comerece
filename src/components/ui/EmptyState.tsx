import type { ReactNode } from "react";

interface EmptyStateProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description: string;
  readonly action?: ReactNode;
}

export const EmptyState = ({
  eyebrow = "Empty",
  title,
  description,
  action,
}: EmptyStateProps): JSX.Element => (
  <div className="border border-hairline px-8 py-16 text-center sm:py-24">
    <p className="label-mono">— {eyebrow} —</p>
    <h3 className="display-italic mt-4 text-4xl sm:text-5xl">{title}</h3>
    <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-muted">{description}</p>
    {action ? <div className="mt-8 inline-flex">{action}</div> : null}
  </div>
);
