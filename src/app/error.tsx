"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";

interface ErrorPageProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps): JSX.Element => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <section className="shell py-32">
      <div className="border border-hairline px-8 py-16 text-center sm:py-24">
        <p className="label-mono">— 500 / circuit interrupted —</p>
        <h1 className="display-italic mt-4 text-4xl sm:text-5xl">
          Something tripped the breaker.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-muted">
          An unexpected error stopped the page from rendering. The studio has been notified — try
          again, or head back to the catalog.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider2 text-muted">
            ↳ ref · {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary h-11 px-6">
            ↳ try again
          </button>
          <Link href={ROUTES.home} className="btn-secondary h-11 px-6">
            ↳ home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
