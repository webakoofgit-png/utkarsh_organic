import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export function CataloguePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialQ = searchParams.get("q") || "";
  const initialCat = (searchParams.get("category") as Category) || "all";

  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState<Category | "all">(initialCat);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setQ(searchParams.get("q") || "");
    const c = searchParams.get("category");
    if (c && ["vegetable", "spice", "wellness", "bulk"].includes(c)) {
      setCategory(c as Category);
    } else {
      setCategory("all");
    }
  }, [searchParams]);

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    const selected = PRODUCTS.filter((product) => (category === "all" || product.category === category) && (!term || `${product.name} ${product.short} ${product.category}`.toLowerCase().includes(term)));
    return [...selected].sort((a, b) => sort === "price-low" ? a.basePrice - b.basePrice : sort === "price-high" ? b.basePrice - a.basePrice : sort === "rating" ? b.rating - a.rating : Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)));
  }, [category, q, sort]);

  const updateSearch = (nextQ: string, nextCategory: Category | "all") => {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextCategory !== "all") params.set("category", nextCategory);
    const queryString = params.toString();
    navigate(queryString ? `/shop?${queryString}` : "/shop");
  };

  return (
    <main className="pt-16 lg:pt-20">
      <section className="bg-forest py-16 text-forest-foreground"><div className="container-x"><p className="eyebrow text-accent">The whole collection</p><h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">A more useful pantry, naturally.</h1><p className="mt-4 max-w-2xl text-forest-foreground/75">Clean, concentrated ingredients for home kitchens, cafés and food businesses.</p></div></section>
      <section className="container-x py-10 lg:py-14">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-cream p-4 lg:flex-row lg:items-center lg:p-5">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-background px-4 py-3"><Search className="h-4 w-4 text-muted-foreground" /><input value={q} onChange={(event) => { setQ(event.target.value); updateSearch(event.target.value, category); }} placeholder="Search ingredients" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label>
          <div className="flex flex-wrap gap-2">{[{ id: "all" as const, name: "All products" }, ...CATEGORIES].map((item) => <button key={item.id} onClick={() => { setCategory(item.id); updateSearch(q, item.id); }} className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${category === item.id ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-secondary"}`}>{item.name}</button>)}</div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-muted-foreground"><strong className="text-foreground">{items.length}</strong> naturally good choices{q ? <> for “{q}”</> : null}</p><label className="flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal className="h-4 w-4 text-accent" /> Sort <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-medium outline-none"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
        {items.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-border py-20 text-center"><Search className="mx-auto h-8 w-8 text-accent" /><h2 className="mt-4 font-display text-2xl font-bold">Nothing matched that search.</h2><p className="mt-2 text-sm text-muted-foreground">Try a product name or clear the filters.</p><button onClick={() => { setQ(""); setCategory("all"); updateSearch("", "all"); }} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><X className="h-4 w-4" /> Clear filters</button></div>}
        <div className="mt-14 rounded-3xl bg-secondary p-7 text-center"><p className="font-display text-xl font-bold">Looking for commercial packs?</p><p className="mt-2 text-sm text-muted-foreground">Tell us the product, mesh and volume you need—we will make a sensible plan.</p><Link to="/bulk-orders" className="mt-4 inline-block text-sm font-bold text-primary underline underline-offset-4">Explore bulk orders</Link></div>
      </section>
    </main>
  );
}
