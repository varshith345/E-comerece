"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CART } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { formatPricePrecise } from "@/lib/format";
import type { CartTotals } from "@/types/cart";

interface CartSummaryProps {
  readonly totals: CartTotals;
  readonly onClear: () => void;
}

export const CartSummary = ({ totals, onClear }: CartSummaryProps): ReactElement => {
  const { isAuthenticated, user } = useAuth();
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleCheckout = (): void => {
    if (!isAuthenticated) {
      setGateOpen(true);
      return;
    }
    setSuccess(true);
  };

  const remaining = Math.max(0, CART.freeShippingThreshold - totals.subtotal);
  const shippingLabel =
    totals.shipping === 0 ? "free" : formatPricePrecise(totals.shipping);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="border border-ink p-8">
        <p className="label-mono">↳ Summary</p>
        <h2 className="display-italic mt-2 text-4xl">Your bag</h2>

        <dl className="mt-8 flex flex-col gap-3 font-mono text-[13px]">
          <div className="flex justify-between">
            <dt className="text-muted">Items</dt>
            <dd>{String(totals.itemCount).padStart(2, "0")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPricePrecise(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className={totals.shipping === 0 ? "text-signal uppercase" : ""}>
              {shippingLabel}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Tax (est.)</dt>
            <dd>{formatPricePrecise(totals.tax)}</dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-hairline pt-6">
          <div className="flex items-end justify-between">
            <span className="label-mono">Total</span>
            <span className="font-mono text-2xl">{formatPricePrecise(totals.total)}</span>
          </div>
        </div>

        {remaining > 0 ? (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-wider2 text-muted">
            Add <span className="text-signal">{formatPricePrecise(remaining)}</span> for free
            shipping.
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3">
          <Button
            size="lg"
            fullWidth
            onClick={handleCheckout}
            disabled={totals.itemCount === 0}
            trailing="→"
          >
            {isAuthenticated ? "checkout" : "sign in to checkout"}
          </Button>
          <button
            type="button"
            onClick={onClear}
            disabled={totals.itemCount === 0}
            className="font-mono text-[11px] uppercase tracking-wider2 text-muted hover:text-signal disabled:opacity-40"
          >
            empty cart
          </button>
        </div>
      </div>

      <Modal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        title="Sign in to continue"
        description="A mock account is all we need — no email is sent and nothing is charged."
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">
            Voltage Collective uses a lightweight account so your cart stays with you across
            sessions. Use the sign-in page to continue.
          </p>
          <Link href={ROUTES.login} className="btn-primary h-12 px-6">
            go to sign in →
          </Link>
        </div>
      </Modal>

      <Modal
        open={success}
        onClose={() => setSuccess(false)}
        title="Order placed."
        description="This is a showcase project — nothing is charged, nothing is shipped. Pretend the box is en route."
      >
        <div className="flex flex-col gap-4">
          <div className="border-l border-signal pl-4 font-mono text-[12px] uppercase tracking-wider2">
            <p className="text-muted">order</p>
            <p className="text-ink">vc-{Date.now().toString(36).slice(-6)}</p>
          </div>
          <p className="text-sm text-muted">
            Thanks{user ? `, ${user.name.split(" ")[0] ?? user.name}` : ""}. We&apos;ll keep your cart
            on this device until you return.
          </p>
          <Button
            onClick={() => {
              setSuccess(false);
              onClear();
            }}
            fullWidth
            trailing="→"
          >
            back to shop
          </Button>
        </div>
      </Modal>
    </aside>
  );
};
