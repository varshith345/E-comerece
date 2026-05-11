import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, trailing, className, id, ...props },
  ref,
) {
  const inputId = id ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className="label-mono">
        {label}
      </label>
      <div className="flex items-center gap-3 border-b border-hairline pb-2 focus-within:border-ink">
        <input
          ref={ref}
          id={inputId}
          className="input-base flex-1"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {trailing ? <span className="text-muted">{trailing}</span> : null}
      </div>
      {hint && !error ? (
        <p id={hintId} className="font-mono text-[11px] text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="font-mono text-[11px] text-signal">
          {error}
        </p>
      ) : null}
    </div>
  );
});
