import { Link, useSearchParams } from "react-router-dom";
import { Heart, LogOut, Package, User, MapPin, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { inr } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const { user, logout, wishlist, orders } = useStore();
  const { products } = useCatalog();
  const tabParam = searchParams.get("tab") as "orders" | "wishlist" | "profile" | "addresses" | null;
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "profile" | "addresses">(tabParam || "orders");

  useEffect(() => {
    if (tabParam && ["orders", "wishlist", "profile", "addresses"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const wishlistProducts = products.filter((item) => wishlist.includes(item.slug));

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        {/* Header banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl bg-forest p-8 text-forest-foreground">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-accent-foreground font-display text-2xl font-bold">
              {user ? user.name.charAt(0).toUpperCase() : "G"}
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
                {user ? `Hello, ${user.name}!` : "Welcome to Your Account"}
              </h1>
              <p className="text-xs text-forest-foreground/75 mt-1">
                {user ? user.email : "Manage your pantry orders, wishlist and address book."}
              </p>
            </div>
          </div>

          {user && (
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-forest-foreground/30 px-5 py-2.5 text-xs font-bold transition hover:bg-forest-foreground/10"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
          {[
            { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
            { id: "wishlist", label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: "profile", label: "Profile Settings", icon: User },
            { id: "addresses", label: "Saved Addresses", icon: MapPin },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
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
                  <Link to="/shop" className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="rounded-3xl border border-border bg-background p-6 space-y-4">
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
                        <div key={i} className="flex justify-between text-sm">
                          <span>{item.qty}x {item.name} ({item.weight})</span>
                          <span className="font-semibold">{inr(item.price)}</span>
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
                  <Link to="/shop" className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground">
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
            <div className="max-w-xl rounded-3xl border border-border bg-background p-8 space-y-6">
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
