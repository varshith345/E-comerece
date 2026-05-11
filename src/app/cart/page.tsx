import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Your Voltage Collective cart — review, update quantities, or check out. Cart contents persist on this device.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: false },
};

const CartPage = (): JSX.Element => (
  <section className="shell pb-24 pt-16 sm:pt-24" aria-labelledby="cart-heading">
    <p className="label-mono">↳ checkout · step 01 / 02</p>
    <h1 id="cart-heading" className="sr-only">
      Your cart
    </h1>
    <div className="rule-h my-8" />
    <CartView />
  </section>
);

export default CartPage;
