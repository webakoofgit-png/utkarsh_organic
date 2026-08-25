import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Building, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { inr, priceFor } from "@/lib/products";
import { storeApi } from "@/lib/api";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { products } = useCatalog();
  const { cart, clearCart, addOrder } = useStore();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod" | "card">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });

  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    return product ? [{ ...line, product, amount: priceFor(product, line.weight).price * line.qty }] : [];
  });

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const grandTotal = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      toast.error("Please fill in all required delivery fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiPaymentMethod = paymentMethod === "cod" ? "COD" : paymentMethod === "upi" ? "UPI" : "Card";
      const response = await storeApi.createOrder({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          line1: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: "India",
        },
        items: lines.map((line) => ({
          slug: line.product.slug,
          weight: line.weight,
          quantity: line.qty,
        })),
        paymentMethod: apiPaymentMethod,
      });

      const created = response.data;
      const generatedId = created.orderNumber || `UO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      addOrder({
        id: generatedId,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        items: lines.map((l) => ({ name: l.product.name, weight: l.weight, qty: l.qty, price: l.amount })),
        total: Number(created.grandTotal || grandTotal),
        status: created.orderStatus || "Confirmed",
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        payment: apiPaymentMethod,
      });
      clearCart();
      setOrderComplete(true);
      toast.success("Order placed successfully!");
    } catch (error: any) {
      toast.error(error.message || "Unable to place order right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <main className="pt-24 pb-20 lg:pt-28">
        <div className="container-x max-w-2xl text-center py-12 px-6 rounded-3xl bg-cream border border-border shadow-soft">
          <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
          <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">Thank You for Your Order!</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We have received your order <span className="font-bold text-foreground">#{orderId}</span>. A confirmation email and SMS updates will be sent to <span className="font-semibold text-foreground">{formData.email || formData.phone}</span>.
          </p>

          <div className="mt-8 rounded-2xl bg-background p-6 text-left border border-border">
            <h3 className="font-display font-bold text-base border-b border-border pb-3">Delivery Information</h3>
            <div className="mt-3 text-sm space-y-1 text-muted-foreground">
              <p className="font-semibold text-foreground">{formData.name}</p>
              <p>{formData.address}, {formData.city}</p>
              <p>{formData.state} - {formData.pincode}</p>
              <p>Phone: {formData.phone}</p>
              <p className="mt-2 text-xs font-bold text-accent">Status: Order Confirmed &amp; Packing in Progress</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to={`/track-order?orderId=${orderId}`}
              className="w-full rounded-full bg-primary px-7 py-3.5 text-center text-sm font-bold text-primary-foreground transition hover:bg-forest min-[420px]:w-auto"
            >
              Track Order Status
            </Link>
            <Link
              to="/products"
              className="w-full rounded-full border border-border bg-background px-7 py-3.5 text-center text-sm font-bold text-foreground transition hover:bg-secondary min-[420px]:w-auto"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Checkout</h1>

        {lines.length === 0 ? (
          <div className="mt-10 text-center py-12 bg-cream rounded-3xl border border-border">
            <p className="text-muted-foreground">Your cart is empty. Please add products before checking out.</p>
            <Link to="/products" className="mt-4 inline-block font-bold text-primary underline">Return to shop</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,400px)] lg:gap-10">
            <div className="space-y-8">
              {/* Delivery Details */}
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <Truck className="h-5 w-5 text-accent" /> Delivery Address
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent focus:bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent focus:bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent focus:bg-background"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Street Address / House No. *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Flat 4B, Sunflower Apartments, MG Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent focus:bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nashik"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent focus:bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">PIN Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="422003"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent focus:bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" /> Select Payment Method
                </h2>

                <div className="mt-6 space-y-3">
                  <label className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${paymentMethod === "upi" ? "border-accent bg-secondary/40" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="accent-accent" />
                      <div>
                        <p className="font-display font-bold text-sm">UPI / QR Code (GPay, PhonePe, Paytm)</p>
                        <p className="text-xs text-muted-foreground">Instant payment with zero transaction fees</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent">Fastest</span>
                  </label>

                  <label className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${paymentMethod === "cod" ? "border-accent bg-secondary/40" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-accent" />
                      <div>
                        <p className="font-display font-bold text-sm">Cash on Delivery (COD)</p>
                        <p className="text-xs text-muted-foreground">Pay cash when your order reaches your doorstep</p>
                      </div>
                    </div>
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                  </label>

                  <label className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${paymentMethod === "card" ? "border-accent bg-secondary/40" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="accent-accent" />
                      <div>
                        <p className="font-display font-bold text-sm">Credit / Debit Card / Net Banking</p>
                        <p className="text-xs text-muted-foreground">Secure 256-bit encrypted checkout</p>
                      </div>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="h-fit rounded-3xl border border-border bg-cream p-7">
              <h2 className="font-display text-xl font-bold">Summary ({lines.length} items)</h2>

              <div className="mt-6 max-h-60 overflow-y-auto space-y-3 pr-1">
                {lines.map(({ product, weight, qty, amount }) => (
                  <div key={`${product.slug}-${weight}`} className="flex items-start justify-between gap-3 py-1 text-xs">
                    <div className="flex min-w-0 items-start gap-2">
                      <span className="font-bold">{qty}x</span>
                      <span className="min-w-0">{product.name} ({weight})</span>
                    </div>
                    <span className="shrink-0 text-right font-bold">{inr(amount)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{inr(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-accent font-bold">FREE</span> : inr(shipping)}</span>
                </div>
                <div className="flex justify-between pt-3 font-display text-lg font-bold text-foreground">
                  <span>Total Payable</span>
                  <span className="text-primary">{inr(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground transition hover:bg-forest disabled:opacity-50"
              >
                {isSubmitting ? "Placing Order..." : `Place Order (${inr(grandTotal)})`}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" /> 100% Safe &amp; Encrypted Payment
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
