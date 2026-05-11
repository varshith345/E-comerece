import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";

const NotFound = (): JSX.Element => (
  <section className="shell py-32">
    <EmptyState
      eyebrow="404 / lost signal"
      title="The page never made it past the front desk."
      description="Either the URL is bent or this route was retired with an older catalog. Head back to the home page or the catalog."
      action={
        <div className="flex gap-3">
          <Link href={ROUTES.home} className="btn-primary h-11 px-6">
            ↳ home
          </Link>
          <Link href={ROUTES.products} className="btn-secondary h-11 px-6">
            ↳ catalog
          </Link>
        </div>
      }
    />
  </section>
);

export default NotFound;
