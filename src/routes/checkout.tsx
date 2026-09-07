import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Tag, X, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { inr, priceFor } from "@/lib/products";
import { storeApi } from "@/lib/api";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

type AvailableCoupon = {
  code: string;
  description?: string;
  discountType: string;
  discountValue: number | string;
  minimumOrder: number | string;
};

type CheckoutPaymentMethod = "upi" | "cod" | "card";
type ApiPaymentMethod = "COD" | "UPI" | "Card";

type RazorpayCheckoutResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
    reason?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: { color: string };
  handler: (response: RazorpayCheckoutResponse) => void;
  modal?: {
    escape?: boolean;
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: RazorpayFailureResponse) => void) => void;
};

type PendingRazorpayOrder = {
  orderNumber: string;
  razorpayOrderId: string;
  apiPaymentMethod: ApiPaymentMethod;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
const CHECKOUT_GST_PERCENT = 18;
const PENDING_RAZORPAY_KEY = "utkarsh-organic-pending-razorpay";

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise<boolean>((resolve) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(Boolean(window.Razorpay)), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { products } = useCatalog();
  const { cart, clearCart, addOrder, ready, user } = useStore();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<AvailableCoupon[]>([]);
  const [pendingRazorpayOrder, setPendingRazorpayOrder] = useState<PendingRazorpayOrder | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });

  useEffect(() => {
    let mounted = true;
    void storeApi.coupons()
      .then((response) => {
        if (mounted) setAvailableCoupons(response.data || []);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PENDING_RAZORPAY_KEY);
      if (raw) setPendingRazorpayOrder(JSON.parse(raw) as PendingRazorpayOrder);
    } catch {
      localStorage.removeItem(PENDING_RAZORPAY_KEY);
    }
  }, []);

  useEffect(() => {
    if (!ready || user) return;
    toast.info("Please login or create an account before checkout.");
    navigate("/login?redirect=/checkout", { replace: true });
  }, [ready, user, navigate]);

  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    if (!product) return [];
    const amount = priceFor(product, line.weight).price * line.qty;
    return [{ ...line, product, amount, gst: Math.round((amount * CHECKOUT_GST_PERCENT) / 100) }];
  });

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const gst = lines.reduce((sum, line) => sum + line.gst, 0);
  const discount = Math.min(appliedCoupon?.discount || 0, subtotal);
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping = discountedSubtotal > 499 ? 0 : 50;
  const grandTotal = discountedSubtotal + gst + shipping;

  const handleCouponApply = async (requestedCode = couponCode) => {
    const code = requestedCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Enter a coupon code.");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");
    try {
      const response = await storeApi.validateCoupon({ couponCode: code, subtotal });
      setAppliedCoupon({ code: response.data.code, discount: Number(response.data.discount || 0) });
      setCouponCode(response.data.code);
      toast.success(`${response.data.code} applied successfully.`);
    } catch (error: any) {
      setAppliedCoupon(null);
      setCouponError(error.message || "This coupon cannot be applied.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCouponRemove = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const buildOrderPayload = (apiPaymentMethod: ApiPaymentMethod) => ({
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
    couponCode: appliedCoupon?.code || "",
    paymentMethod: apiPaymentMethod,
  });

  const finishOrder = (created: any, apiPaymentMethod: ApiPaymentMethod) => {
    const generatedId = created.orderNumber || `UO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    addOrder({
      id: generatedId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items: lines.map((l) => ({ name: l.product.name, weight: l.weight, qty: l.qty, price: l.amount })),
      total: Number(created.grandTotal || grandTotal),
      status: created.orderStatus || "Confirmed",
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      payment: apiPaymentMethod === "COD" ? "COD" : "Razorpay",
    });
    clearCart();
    setPendingRazorpayOrder(null);
    localStorage.removeItem(PENDING_RAZORPAY_KEY);
    setOrderComplete(true);
  };

  const checkRazorpayPaymentStatus = async (pending = pendingRazorpayOrder, options: { quiet?: boolean; throwOnError?: boolean } = {}) => {
    if (!pending) return false;
    if (!options.quiet) setIsCheckingPayment(true);
    try {
      const response = await storeApi.reconcileRazorpayPayment({
        orderNumber: pending.orderNumber,
        razorpayOrderId: pending.razorpayOrderId,
      });
      finishOrder(response.data, pending.apiPaymentMethod);
      toast.success("Payment confirmed. Order placed!");
      return true;
    } catch (error: any) {
      if (!options.quiet) toast.info(error.message || "Payment is still pending with Razorpay.");
      if (options.throwOnError) throw error;
      return false;
    } finally {
      if (!options.quiet) setIsCheckingPayment(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login or create an account before placing your order.");
      navigate("/login?redirect=/checkout");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      toast.error("Please fill in all required delivery fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiPaymentMethod: ApiPaymentMethod = paymentMethod === "cod" ? "COD" : paymentMethod === "upi" ? "UPI" : "Card";
      const orderPayload = buildOrderPayload(apiPaymentMethod);

      if (apiPaymentMethod === "COD") {
        const response = await storeApi.createOrder(orderPayload);
        finishOrder(response.data, apiPaymentMethod);
        toast.success("Order placed successfully!");
        return;
      }

      const scriptReady = await loadRazorpayCheckout();
      const RazorpayCheckout = window.Razorpay;
      if (!scriptReady || !RazorpayCheckout) {
        throw new Error("Razorpay Checkout could not be loaded. Please check your connection and try again.");
      }

      const response = await storeApi.createRazorpayOrder(orderPayload);
      const created = response.data.order;
      const razorpay = response.data.razorpay;
      const pending: PendingRazorpayOrder = {
        orderNumber: created.orderNumber,
        razorpayOrderId: razorpay.orderId,
        apiPaymentMethod,
      };
      setPendingRazorpayOrder(pending);
      localStorage.setItem(PENDING_RAZORPAY_KEY, JSON.stringify(pending));

      await new Promise<void>((resolve, reject) => {
        let settled = false;
        let pollId: number | undefined;
        const cleanup = () => {
          if (pollId) window.clearInterval(pollId);
        };
        const resolveOnce = () => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        };
        const rejectOnce = (error: Error) => {
          if (settled) return;
          settled = true;
          cleanup();
          reject(error);
        };

        const checkout = new RazorpayCheckout({
          key: razorpay.keyId,
          amount: razorpay.amount,
          currency: razorpay.currency,
          name: razorpay.name || "Utkarsh Organic",
          description: razorpay.description || `Payment for ${created.orderNumber}`,
          image: "/logo.png",
          order_id: razorpay.orderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
            ...(razorpay.prefill || {}),
          },
          notes: {
            order_number: created.orderNumber,
          },
          theme: { color: "#31572c" },
          modal: {
            escape: true,
            ondismiss: () => {
              void checkRazorpayPaymentStatus(pending, { quiet: true, throwOnError: true })
                .then((confirmed) => {
                  if (confirmed) resolveOnce();
                  else rejectOnce(new Error("Payment is pending. If money was deducted, click Check Payment Status."));
                })
                .catch((error) => rejectOnce(new Error(error.message || "Unable to confirm Razorpay payment.")));
            },
          },
          handler: async (paymentResponse) => {
            try {
              const verified = await storeApi.verifyRazorpayPayment({
                orderNumber: created.orderNumber,
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature,
              });
              finishOrder(verified.data, apiPaymentMethod);
              toast.success("Payment successful. Order placed!");
              resolveOnce();
            } catch (error: any) {
              rejectOnce(new Error(error.message || "Payment verification failed. Please contact support."));
            }
          },
        });

        checkout.on("payment.failed", (paymentFailure) => {
          rejectOnce(new Error(paymentFailure.error?.description || paymentFailure.error?.reason || "Razorpay payment failed. Please try again."));
        });

        checkout.open();
        pollId = window.setInterval(() => {
          void checkRazorpayPaymentStatus(pending, { quiet: true }).then((confirmed) => {
            if (confirmed) resolveOnce();
          });
        }, 5000);
      });
    } catch (error: any) {
      toast.error(error.message || "Unable to place order right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ready) {
    return (
      <main className="pt-24 pb-20 lg:pt-28">
        <div className="container-x">
          <div className="rounded-[1.35rem] border border-border bg-cream px-5 py-14 text-center sm:rounded-3xl">
            <p className="text-sm font-semibold text-muted-foreground">Preparing checkout...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="pt-24 pb-20 lg:pt-28">
        <div className="container-x max-w-xl">
          <div className="rounded-[1.35rem] border border-border bg-cream px-5 py-12 text-center shadow-soft sm:rounded-3xl sm:px-8">
            <ShieldCheck className="mx-auto h-12 w-12 text-accent" />
            <h1 className="mt-4 font-display text-2xl font-extrabold">Login Required</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in or create an account before placing your order.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/login?redirect=/checkout"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-forest"
              >
                Login First
              </Link>
              <Link
                to="/register?redirect=/checkout"
                className="rounded-full border border-border bg-background px-7 py-3.5 text-sm font-bold text-foreground transition hover:bg-secondary"
              >
                Register First
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">Checkout</h1>

        {lines.length === 0 ? (
          <div className="mt-10 text-center py-12 bg-cream rounded-3xl border border-border">
            <p className="text-muted-foreground">Your cart is empty. Please add products before checking out.</p>
            <Link to="/products" className="mt-4 inline-block font-bold text-primary underline">Return to shop</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,400px)] lg:gap-10">
            <div className="space-y-8">
              {/* Delivery Details */}
              <div className="rounded-[1.35rem] border border-border bg-background p-5 sm:rounded-3xl sm:p-8">
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
              <div className="rounded-[1.35rem] border border-border bg-background p-5 sm:rounded-3xl sm:p-8">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" /> Select Payment Method
                </h2>

                <div className="mt-6 space-y-3">
                  <label className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${paymentMethod === "upi" ? "border-accent bg-secondary/40" : "border-border"}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="accent-accent" />
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm">UPI / QR Code via Razorpay</p>
                        <p className="text-xs text-muted-foreground">Pay with GPay, PhonePe, Paytm or any UPI app</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent">Fastest</span>
                  </label>

                  <label className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${paymentMethod === "cod" ? "border-accent bg-secondary/40" : "border-border"}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-accent" />
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm">Cash on Delivery (COD)</p>
                        <p className="text-xs text-muted-foreground">Pay cash when your order reaches your doorstep</p>
                      </div>
                    </div>
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                  </label>

                  <label className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${paymentMethod === "card" ? "border-accent bg-secondary/40" : "border-border"}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="accent-accent" />
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm">Credit / Debit Card / Net Banking</p>
                        <p className="text-xs text-muted-foreground">Secure Razorpay checkout for cards and banks</p>
                      </div>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="h-fit rounded-[1.35rem] border border-border bg-cream p-5 sm:rounded-3xl sm:p-7 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-bold">Summary ({lines.length} items)</h2>

              <div className="mt-6 max-h-60 overflow-y-auto space-y-3 pr-1">
                {lines.map(({ product, weight, qty, amount, gst: lineGst }) => (
                  <div key={`${product.slug}-${weight}`} className="flex items-start justify-between gap-3 py-1 text-xs">
                    <div className="flex min-w-0 items-start gap-2">
                      <span className="font-bold">{qty}x</span>
                      <span className="min-w-0 break-words">
                        {product.name} ({weight})
                        <span className="mt-0.5 block text-[11px] font-medium text-muted-foreground">
                          GST @ {CHECKOUT_GST_PERCENT}%: {inr(lineGst)}
                        </span>
                      </span>
                    </div>
                    <span className="shrink-0 text-right font-bold">{inr(amount)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Tag className="h-4 w-4 text-accent" /> Apply Coupon
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleCouponApply();
                      }
                    }}
                    placeholder="Enter coupon code"
                    aria-label="Coupon code"
                    className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm uppercase outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => void handleCouponApply()}
                    disabled={isApplyingCoupon}
                    className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:bg-forest disabled:opacity-50"
                  >
                    {isApplyingCoupon ? "Checking..." : "Apply"}
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-3 flex items-center justify-between gap-2 text-xs font-semibold text-accent">
                    <span>{appliedCoupon.code} applied</span>
                    <button
                      type="button"
                      onClick={handleCouponRemove}
                      aria-label="Remove coupon"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                )}
                {couponError && <p className="mt-2 text-xs font-semibold text-destructive">{couponError}</p>}
                {!appliedCoupon && availableCoupons.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-xs font-bold text-muted-foreground">Available coupons</p>
                    <div className="mt-2 space-y-2">
                      {availableCoupons.map((coupon) => {
                        const value = Number(coupon.discountValue || 0);
                        const benefit = coupon.discountType === "Percentage"
                          ? `${value}% off`
                          : coupon.discountType === "Fixed Amount"
                            ? `${inr(value)} off`
                            : "Free shipping";
                        const minimum = Number(coupon.minimumOrder || 0);
                        return (
                          <div key={coupon.code} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
                            <div className="min-w-0">
                              <p className="break-all text-xs font-bold text-primary">{coupon.code}</p>
                              <p className="text-[11px] text-muted-foreground">
                                {benefit}{minimum > 0 ? ` on orders above ${inr(minimum)}` : ""}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void handleCouponApply(coupon.code)}
                              disabled={isApplyingCoupon}
                              className="shrink-0 rounded-lg border border-primary px-3 py-1.5 text-[11px] font-bold text-primary transition hover:bg-secondary disabled:opacity-50"
                            >
                              Apply
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{inr(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-semibold text-accent">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{inr(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>GST ({CHECKOUT_GST_PERCENT}%)</span>
                  <span>{inr(gst)}</span>
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
                {isSubmitting ? (paymentMethod === "cod" ? "Placing Order..." : "Opening Razorpay...") : `Place Order (${inr(grandTotal)})`}
              </button>

              {pendingRazorpayOrder && !orderComplete && (
                <div className="mt-4 rounded-2xl border border-accent/30 bg-background/80 p-4 text-center">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Already paid but still seeing checkout? Confirm the payment status with Razorpay.
                  </p>
                  <button
                    type="button"
                    onClick={() => void checkRazorpayPaymentStatus()}
                    disabled={isCheckingPayment || isSubmitting}
                    className="mt-3 w-full rounded-full border border-primary px-4 py-2.5 text-xs font-bold text-primary transition hover:bg-secondary disabled:opacity-50"
                  >
                    {isCheckingPayment ? "Checking Payment..." : "Check Payment Status"}
                  </button>
                </div>
              )}

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" /> 100% Safe &amp; Encrypted Payment via Razorpay
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
