import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductImageWithLogo } from "@/components/site/ProductImageWithLogo";
import { inr, priceFor } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { products } = useCatalog();
  const { cart, removeLine, setQty, clearCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    return product ? [{ ...line, product, amount: priceFor(product, line.weight).price * line.qty }] : [];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === "ORGANIC10") {
      setDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
      toast.success("Coupon ORGANIC10 applied! 10% discount added.");
    } else if (coupon.trim().length > 0) {
      toast.error("Invalid coupon code. Try ORGANIC10");
    }
  };

  const shipping = subtotal > 499 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <div className="flex items-center gap-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Your Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground">
          {lines.length > 0 ? `${lines.length} item(s) selected for your kitchen.` : "Your cart is currently empty."}
        </p>

        {lines.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-3xl bg-cream border border-border">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary text-primary">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">No products in your cart yet</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Explore our range of 100% natural, farm-fresh organic powders and stock up your pantry today.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-forest"
            >
              Browse Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,380px)] lg:gap-10">
            <div className="space-y-4">
              <div className="hidden rounded-2xl bg-secondary/60 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
                <span className="w-8"></span>
              </div>

              {lines.map(({ product, weight, qty, amount }) => {
                const itemPrice = priceFor(product, weight).price;
                return (
                  <div
                    key={`${product.slug}-${weight}`}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 sm:p-5 md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:items-center"
                  >
                    <div className="flex min-w-0 items-start gap-3 min-[420px]:items-center sm:gap-4">
                      <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-cream p-2">
                        <ProductImageWithLogo
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full"
                          imageClassName="max-h-full max-w-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link to={`/product/${product.slug}`} className="font-display text-base font-bold text-foreground hover:text-accent">
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">Pack size: <span className="font-semibold text-foreground">{weight}</span></p>
                        <p className="text-xs font-bold text-primary sm:hidden mt-1">{inr(itemPrice)} / pack</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-start md:justify-center">
                      <div className="flex items-center rounded-full border border-border bg-secondary/50">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(product.slug, weight, qty - 1)}
                          className="p-2 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(product.slug, weight, qty + 1)}
                          className="p-2 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 md:block md:text-right">
                      <span className="text-xs font-semibold text-muted-foreground md:hidden">Total</span>
                      <span className="font-display text-base font-bold">{inr(amount)}</span>
                      <p className="text-[11px] text-muted-foreground hidden sm:block">{inr(itemPrice)} each</p>
                    </div>

                    <div className="text-right">
                      <button
                        onClick={() => removeLine(product.slug, weight)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col gap-2 pt-2 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
                <button
                  onClick={() => { clearCart(); toast.info("Cart cleared"); }}
                  className="text-xs font-semibold text-muted-foreground hover:text-destructive underline"
                >
                  Clear all items
                </button>
                <p className="text-xs text-muted-foreground min-[480px]:text-right">
                  {subtotal > 499 ? "🎉 Free shipping applied!" : `Add ${inr(500 - subtotal)} more for Free Shipping`}
                </p>
              </div>
            </div>

            <div className="h-fit rounded-3xl border border-border bg-cream p-7">
              <h2 className="font-display text-xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-3 divide-y divide-border text-sm">
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{inr(subtotal)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between pt-3 text-accent font-medium">
                    <span>Discount (ORGANIC10)</span>
                    <span>-{inr(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-3">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="font-semibold">{shipping === 0 ? <span className="text-accent font-bold">FREE</span> : inr(shipping)}</span>
                </div>

                <div className="flex justify-between pt-4 font-display text-lg font-bold text-foreground">
                  <span>Grand Total</span>
                  <span className="text-primary">{inr(grandTotal)}</span>
                </div>
              </div>

              <form onSubmit={handleCoupon} className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (ORGANIC10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                />
                <button type="submit" className="rounded-full bg-secondary px-4 py-2.5 text-xs font-bold text-secondary-foreground hover:bg-secondary/80">
                  Apply
                </button>
              </form>

              <Link
                to="/checkout"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:bg-forest"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
