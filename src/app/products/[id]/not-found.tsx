import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const ProductNotFound = (): JSX.Element => (
  <section className="shell py-32">
    <div className="border border-hairline px-8 py-16 text-center sm:py-24">
      <p className="label-mono">— 404 / catalog —</p>
      <h1 className="display-italic mt-4 text-4xl sm:text-5xl">
        That product slipped off the shelf.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-muted">
        The catalog only holds twelve items at a time. The one you&apos;re looking for may have
        been retired.
      </p>
      <div className="mt-8 inline-flex">
        <Link href={ROUTES.products} className="btn-primary h-11 px-6">
          back to catalog →
        </Link>
      </div>
    </div>
  </section>
);

export default ProductNotFound;
