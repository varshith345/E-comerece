import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";

const ProductNotFound = (): JSX.Element => (
  <section className="shell py-32">
    <EmptyState
      eyebrow="404 / catalog"
      title="That product slipped off the shelf."
      description="The catalog only holds twelve items at a time. The one you're looking for may have been retired."
      action={
        <Link href={ROUTES.products} className="btn-primary h-11 px-6">
          back to catalog →
        </Link>
      }
    />
  </section>
);

export default ProductNotFound;
