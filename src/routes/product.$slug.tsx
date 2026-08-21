import { Link, useParams } from "react-router-dom";
import { Check, ChevronRight, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/ProductCard";
import { inr, priceFor, WEIGHTS, type Weight } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, getProductBySlug, categoryLabel } = useCatalog();
  const product = getProductBySlug(slug || "");
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();
  const [weight, setWeight] = useState<Weight>("1kg");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="pt-32 pb-20 text-center container-x">
        <h1 className="font-display text-4xl font-extrabold">Product Not Found</h1>
        <p className="mt-2 text-muted-foreground">The organic product you are looking for does not exist.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          Back to Shop
        </Link>
      </main>
    );
  }

  const saved = wishlist.includes(product.slug);
  const prices = priceFor(product, weight);
  const priceLabel = prices.mrp > prices.price ? `${inr(prices.price)} - ${inr(prices.mrp)}` : inr(prices.price);
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 4);
  const add = () => { addToCart(product.slug, weight, qty); toast.success(`${product.name} added to cart`); };

  return (
    <main className="pt-16 lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.short, sku: product.sku, brand: { "@type": "Brand", name: "Utkarsh Organic" }, offers: { "@type": "Offer", priceCurrency: "INR", price: prices.price, availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews } }) }} />
      <div className="container-x py-5 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> <ChevronRight className="mx-1 inline h-3 w-3" /> <Link to="/shop" className="hover:text-primary">Shop</Link> <ChevronRight className="mx-1 inline h-3 w-3" /> <span>{product.name}</span></div>
      <section className="container-x grid gap-10 pb-16 pt-4 lg:grid-cols-2 lg:pb-24">
        <div className="overflow-hidden rounded-[2rem] bg-cream"><img src={product.image} alt={product.name} className="aspect-square h-full w-full object-cover" /></div>
        <div className="lg:py-4"><p className="eyebrow">{categoryLabel(product.category)}</p><div className="mt-3 flex items-start justify-between gap-4"><h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">{product.name}</h1><button onClick={() => toggleWishlist(product.slug)} aria-label="Add product to wishlist" className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border ${saved ? "bg-secondary text-destructive" : "text-foreground hover:bg-secondary"}`}><Heart className="h-5 w-5" fill={saved ? "currentColor" : "none"} /></button></div><div className="mt-4 flex flex-wrap items-center gap-4"><span className="flex items-center gap-1 text-sm font-bold"><Star className="h-4 w-4 fill-saffron text-saffron" /> {product.rating} <span className="font-normal text-muted-foreground">({product.reviews} reviews)</span></span><span className="h-4 border-l border-border" /><span className="text-sm font-semibold text-accent">{product.inStock ? "Available for quote" : "Currently unavailable"}</span><span className="h-4 border-l border-border" /><span className="text-sm font-semibold text-muted-foreground">MOQ {product.moq}</span></div><p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-7"><p className="text-sm font-bold">Choose pack size</p><div className="mt-3 flex flex-wrap gap-2">{WEIGHTS.map((option) => <button key={option} onClick={() => setWeight(option)} className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${weight === option ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-accent"}`}>{option}</button>)}</div></div>
          <div className="mt-7 flex items-end gap-4"><div><p className="font-display text-3xl font-extrabold">{priceLabel}</p><p className="mt-1 text-sm text-muted-foreground">{weight} selected &middot; Official listing: {product.priceLabel}</p></div></div>
          <div className="mt-7 flex flex-wrap gap-3"><div className="flex h-12 items-center rounded-full border border-border bg-background"><button onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" className="p-3"><Minus className="h-4 w-4" /></button><span className="w-8 text-center text-sm font-bold">{qty}</span><button onClick={() => setQty((value) => value + 1)} aria-label="Increase quantity" className="p-3"><Plus className="h-4 w-4" /></button></div><button disabled={!product.inStock} onClick={add} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:bg-forest disabled:opacity-50"><ShoppingBag className="h-4 w-4" /> Add to cart</button><button disabled={!product.inStock} onClick={() => { add(); setCartOpen(true); }} className="h-12 rounded-full bg-accent px-5 text-sm font-bold text-accent-foreground">Buy now</button></div>
          <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">{[{ icon: Truck, text: "Pan India supply" }, { icon: ShieldCheck, text: "Manufacturer & supplier" }, { icon: LeafIcon, text: "Source specs included" }].map(({ icon: Icon, text }) => <p key={text} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Icon className="h-4 w-4 text-accent" /> {text}</p>)}</div>
        </div>
      </section>
      <section className="bg-beige/45 py-16 lg:py-20"><div className="container-x grid gap-10 lg:grid-cols-3"><div className="lg:col-span-2"><h2 className="font-display text-3xl font-extrabold">Why buyers choose it</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{product.benefits.map((benefit) => <p key={benefit} className="flex gap-3 rounded-2xl bg-background p-4 text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {benefit}</p>)}</div></div><aside className="rounded-3xl bg-forest p-7 text-forest-foreground"><h3 className="font-display text-xl font-bold">The essentials</h3><p className="mt-5 text-xs font-bold uppercase tracking-widest text-accent">Raw Material</p><p className="mt-2 text-sm leading-relaxed text-forest-foreground/80">{product.ingredients}</p><p className="mt-5 text-xs font-bold uppercase tracking-widest text-accent">Storage</p><p className="mt-2 text-sm leading-relaxed text-forest-foreground/80">{product.storage}</p><a href={product.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block text-xs font-bold text-accent underline underline-offset-4">View official source listing</a></aside></div></section>
      <section className="container-x grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-24"><div><h2 className="font-display text-3xl font-extrabold">How to use it</h2><ol className="mt-6 space-y-4">{product.usage.map((tip, index) => <li key={tip} className="flex gap-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-primary">{index + 1}</span><p className="pt-1 text-sm leading-relaxed text-muted-foreground">{tip}</p></li>)}</ol></div><div className="rounded-3xl border border-border p-6 sm:p-8"><h2 className="font-display text-2xl font-extrabold">Product specifications</h2><p className="mt-2 text-sm text-muted-foreground">Based on the official Utkarsh Organic Farm listing</p><div className="mt-5 divide-y divide-border">{product.specs.map((item) => <div key={item.label} className="flex justify-between gap-4 py-3 text-sm"><span>{item.label}</span><strong className="text-right">{item.value}</strong></div>)}</div></div></section>
      {related.length ? <section className="bg-cream py-16 lg:py-20"><div className="container-x"><div className="flex items-end justify-between gap-5"><div><p className="eyebrow">Keep exploring</p><h2 className="mt-3 font-display text-3xl font-extrabold">You may also like</h2></div><Link to="/shop" className="text-sm font-bold text-primary underline underline-offset-4">All products</Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.slug} product={item} compact />)}</div></div></section> : null}
    </main>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20 3C11 3 4 8 4 16c0 2 1 4 3 5 8 0 13-7 13-18Z" /><path d="M4 21c3-5 7-8 12-10" /></svg>;
}
