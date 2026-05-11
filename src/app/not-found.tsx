import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const NotFound = (): JSX.Element => (
  <section className="shell py-32">
    <div className="border border-hairline px-8 py-16 text-center sm:py-24">
      <p className="label-mono">— 404 / lost signal —</p>
      <h1 className="display-italic mt-4 text-4xl sm:text-5xl">
        The page never made it past the front desk.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-muted">
        Either the URL is bent or this route was retired with an older catalog. Head back to the
        home page or the catalog.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={ROUTES.home} className="btn-primary h-11 px-6">
          ↳ home
        </Link>
        <Link href={ROUTES.products} className="btn-secondary h-11 px-6">
          ↳ catalog
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
