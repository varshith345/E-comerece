"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps): JSX.Element | null => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg bg-bone p-8 shadow-2xl sm:p-10 animate-rise-in",
          "border-t border-ink sm:border sm:border-ink",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="label-mono">Voltage / Modal</span>
            <h2 id="modal-title" className="display-italic text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 max-w-sm text-pretty text-sm text-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="label-mono-ink -mr-2 -mt-2 px-3 py-2 hover:text-signal"
          >
            ✕ close
          </button>
        </div>
        <div className="rule-h mt-6" />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};
