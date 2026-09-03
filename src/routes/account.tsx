import { Link, useSearchParams } from "react-router-dom";
import { Heart, LogOut, Package, User, MapPin, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { inr } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const { ready, user, logout, wishlist, orders } = useStore();
  const { products } = useCatalog();
  const tabParam = searchParams.get("tab") as "orders" | "wishlist" | "profile" | "addresses" | null;
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "profile" | "addresses">(tabParam || "orders");

  useEffect(() => {
    if (tabParam && ["orders", "wishlist", "profile", "addresses"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  if (!ready) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 pt-24 pb-20 lg:pt-28">
        <p className="text-sm font-semibold text-muted-foreground">Loading your account...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="pt-24 pb-20 lg:pt-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl rounded-3xl bg-forest p-8 text-center text-forest-foreground sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <User className="h-8 w-8" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">Sign in to view your account</h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-forest-foreground/75">
              Your orders, wishlist and saved addresses will appear here after you sign in.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:brightness-110"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-forest-foreground/30 px-6 py-3 text-sm font-bold transition hover:bg-forest-foreground/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const wishlistProducts = products.filter((item) => wishlist.includes(item.slug));

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        {/* Header banner */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-forest p-5 text-forest-foreground sm:flex-row sm:items-center sm:p-8">
          <div className="flex min-w-0 items-start gap-4 sm:items-center">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground font-display text-2xl font-bold sm:h-16 sm:w-16">
              {user ? user.name.charAt(0).toUpperCase() : "G"}
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
                {user ? `Hello, ${user.name}!` : "Welcome to Your Account"}
              </h1>
              <p className="mt-1 break-all text-xs text-forest-foreground/75">
                {user ? user.email : "Manage your pantry orders, wishlist and address book."}
              </p>
            </div>
          </div>

          {user && (
            <button
              onClick={logout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-forest-foreground/30 px-5 py-2.5 text-xs font-bold transition hover:bg-forest-foreground/10 sm:w-auto"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="no-scrollbar -mx-1 mt-8 flex snap-x gap-2 overflow-x-auto border-b border-border px-1 pb-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {[
            { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
            { id: "wishlist", label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: "profile", label: "Profile Settings", icon: User },
            { id: "addresses", label: "Saved Addresses", icon: MapPin },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex max-w-full shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 text-left text-sm font-bold transition sm:px-5 ${
                activeTab === id ? "bg-primary text-primary-foreground" : "bg-cream text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="mt-8">
          {activeTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-cream rounded-3xl border border-border">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-display text-xl font-bold">No orders placed yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Once you order, your shipment details will show up here.</p>
                  <Link to="/products" className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="space-y-4 rounded-3xl border border-border bg-background p-5 sm:p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 border-b border-border pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">Order #{order.id}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">
                          {order.status}
                        </span>
                        <Link
                          to={`/track-order?orderId=${order.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          <Truck className="h-3.5 w-3.5" /> Track
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-start justify-between gap-3 text-sm">
                          <span className="min-w-0">{item.qty}x {item.name} ({item.weight})</span>
                          <span className="shrink-0 text-right font-semibold">{inr(item.price)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-border flex justify-between items-center text-sm font-bold">
                      <span>Total Amount Paid</span>
                      <span className="text-primary font-display text-base">{inr(order.total)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12 bg-cream rounded-3xl border border-border">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-display text-xl font-bold">Your wishlist is empty</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Tap the heart icon on any product to save it for later.</p>
                  <Link to="/products" className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground">
                    Explore Catalogue
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {wishlistProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-xl space-y-6 rounded-[1.35rem] border border-border bg-background p-5 sm:rounded-3xl sm:p-8">
              <h3 className="font-display text-xl font-bold">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || "Ananya Sharma"}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || "ananya@example.com"}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
              <button className="rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground">
                Save Profile
              </button>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-background p-6">
                <div className="flex justify-between items-center">
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold text-accent-foreground">DEFAULT</span>
                  <button className="text-xs text-primary font-bold hover:underline">Edit</button>
                </div>
                <h4 className="mt-3 font-display font-bold">Home Address</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Flat 4B, Sunflower Apartments, MG Road, Nashik, Maharashtra 422003
                </p>
                <p className="mt-2 text-xs font-semibold text-foreground">Phone: +91 98765 43210</p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-cream p-8 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <p className="mt-3 font-display font-bold text-sm">Add New Address</p>
                <button className="mt-3 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold text-foreground">
                  + Add Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
