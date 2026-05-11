import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getProductById, getProductIds, getRelatedProducts } from "@/lib/products";

interface ProductPageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export const generateStaticParams = async (): Promise<Array<{ id: string }>> => {
  return getProductIds().map((id) => ({ id }));
};

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.title,
    description: product.tagline,
    alternates: { canonical: ROUTES.product(product.id) },
    openGraph: {
      title: `${product.title} · ${SITE.name}`,
      description: product.tagline,
      images: [{ url: product.image, alt: product.imageAlt }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} · ${SITE.name}`,
      description: product.tagline,
      images: [product.image],
    },
  };
};

const ProductPage = async ({ params }: ProductPageProps): Promise<JSX.Element> => {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    notFound();
  }
  const related = getRelatedProducts(product, 3);

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.id,
    image: [product.image],
    brand: { "@type": "Brand", name: SITE.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${SITE.url}${ROUTES.product(product.id)}`,
    },
  };

  return (
    <section className="shell pb-24 pt-12 sm:pt-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} />
      <RelatedProducts products={related} />
    </section>
  );
};

export default ProductPage;
