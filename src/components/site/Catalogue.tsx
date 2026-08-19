import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Home,
  Leaf,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Tractor,
  X,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import flatlay from "@/assets/flatlay.jpg";
import onion from "@/assets/p-onion.jpg";
import spinach from "@/assets/p-spinach.jpg";

const bannerSlides = [
  {
    id: "whole-collection",
    eyebrow: "THE WHOLE COLLECTION",
    titleLine1: "A more useful pantry,",
    titleLine2: "naturally.",
    subtitle: "Clean, concentrated ingredients for home kitchens, cafés and food businesses.",
    features: [
      { icon: Leaf, title: "100% Natural", sub: "Pure & Clean" },
      { icon: ShieldCheck, title: "No Additives", sub: "No Shortcuts" },
      { icon: Sprout, title: "Farm to Pantry", sub: "Trusted Source" },
    ],
    image: flatlay,
  },
  {
    id: "dehydrated-veg",
    eyebrow: "DEHYDRATED VEGETABLES & POWDERS",
    titleLine1: "Direct from Satara farm,",
    titleLine2: "shelf-ready.",
    subtitle: "Zero peeling, zero chopping. Pure dehydrated powders packed with natural aroma & nutrition.",
    features: [
      { icon: FlaskConical, title: "No Preservatives", sub: "100% Dehydrated" },
      { icon: Tractor, title: "Farm Fresh", sub: "Satara Sourced" },
      { icon: ShieldCheck, title: "Hygienic", sub: "Modern Tech" },
    ],
    image: onion,
  },
  {
    id: "wellness-mixes",
    eyebrow: "HERBAL TEAS & WELLNESS MIXES",
    titleLine1: "Health & vitality in",
    titleLine2: "every spoonful.",
    subtitle: "Moringa lemon tea, soup mixes and immunity powders for everyday wellness.",
    features: [
      { icon: Leaf, title: "Moringa Rich", sub: "High Antioxidants" },
      { icon: Sparkles, title: "Pure Energy", sub: "Clean Wellness" },
      { icon: ShieldCheck, title: "Nutritionist Approved", sub: "Doctor Formulated" },
    ],
    image: spinach,
  },
];

export function CataloguePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQ = searchParams.get("q") || "";
  const initialCat = (searchParams.get("category") as Category) || "all";

  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState<Category | "all">(initialCat);
  const [sort, setSort] = useState("featured");

  // Hero Banner Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

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
    const selected = PRODUCTS.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        (!term || `${product.name} ${product.short} ${product.category}`.toLowerCase().includes(term))
    );
    return [...selected].sort((a, b) =>
      sort === "price-low"
        ? a.basePrice - b.basePrice
        : sort === "price-high"
        ? b.basePrice - a.basePrice
        : sort === "rating"
        ? b.rating - a.rating
        : Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller))
    );
  }, [category, q, sort]);

  const updateSearch = (nextQ: string, nextCategory: Category | "all") => {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextCategory !== "all") params.set("category", nextCategory);
    const queryString = params.toString();
    navigate(queryString ? `/products?${queryString}` : "/products");
  };

  const slide = (bannerSlides[activeSlide % bannerSlides.length] || bannerSlides[0])!;

  return (
    <main className="pt-20 lg:pt-24 bg-background">
      {/* Hero Banner Carousel Box */}
      <section className="container-x pb-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#072415] via-[#041a0e] to-[#021008] text-white shadow-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Subtle Ambient Leaf Glow */}
          <div className="absolute top-0 right-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Animate Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid items-center gap-8 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16 relative z-10"
            >
              {/* Left Content */}
              <div>
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-1.5 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Leaf className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{slide.eyebrow}</span>
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                </div>

                {/* Headline */}
                <h1 className="mt-6 font-serif text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-white">
                  {slide.titleLine1} <br />
                  <span className="relative inline-block text-emerald-400">
                    {slide.titleLine2}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,10 Q50,20 100,5"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-emerald-100/85 sm:text-base">
                  {slide.subtitle}
                </p>

                {/* 3 Feature Items Ribbon */}
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-emerald-500/20 pt-6">
                  {slide.features.map(({ icon: Icon, title, sub }, idx) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400 shadow-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{title}</p>
                        <p className="text-[11px] text-emerald-300/80">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-3 backdrop-blur-md shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.eyebrow}
                    className="h-72 w-full rounded-2xl object-cover shadow-lg"
                  />
                  <div className="absolute bottom-6 right-6 rounded-2xl border border-emerald-400/40 bg-emerald-950/90 px-4 py-2 text-xs font-bold text-emerald-300 shadow-xl backdrop-blur-md">
                    🌱 100% Pure &amp; Organic
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Curved Wave Graphic */}
          <div className="w-full overflow-hidden leading-none relative z-10 -mt-4">
            <svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="relative block w-full h-8 text-[#0a3520] fill-current"
            >
              <path d="M0,0 C300,50 600,-20 1200,30 L1200,60 L0,60 Z"></path>
            </svg>
          </div>

          {/* Slide Navigation Controls */}
          <div className="absolute bottom-6 right-8 z-20 flex items-center gap-3">
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
              aria-label="Previous slide"
              className="grid h-9 w-9 place-items-center rounded-full border border-emerald-400/30 bg-emerald-950/80 text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-1.5">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? "w-6 bg-emerald-400" : "w-2 bg-emerald-800"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % bannerSlides.length)}
              aria-label="Next slide"
              className="grid h-9 w-9 place-items-center rounded-full border border-emerald-400/30 bg-emerald-950/80 text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Catalogue Filters & Grid */}
      <section className="container-x py-8 lg:py-12">
        {/* Search & Categories Bar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-cream p-4 lg:flex-row lg:items-center lg:p-5">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-background px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(event) => {
                setQ(event.target.value);
                updateSearch(event.target.value, category);
              }}
              placeholder="Search ingredients..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {[{ id: "all" as const, name: "All products" }, ...CATEGORIES].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCategory(item.id);
                  updateSearch(q, item.id);
                }}
                className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${
                  category === item.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-secondary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Count & Sort Selector */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{items.length}</strong> naturally good choices
            {q ? <> for “{q}”</> : null}
          </p>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4 text-accent" /> Sort{" "}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-border bg-background px-3 py-2 text-sm font-medium outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        {/* Products Grid */}
        {items.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-border py-20 text-center">
            <Search className="mx-auto h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-2xl font-bold">Nothing matched that search.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a product name or clear the filters.
            </p>
            <button
              onClick={() => {
                setQ("");
                setCategory("all");
                updateSearch("", "all");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              <X className="h-4 w-4" /> Clear filters
            </button>
          </div>
        )}

        {/* Commercial / Bulk Pack Callout */}
        <div className="mt-14 rounded-3xl bg-secondary p-7 text-center">
          <p className="font-display text-xl font-bold">Looking for commercial packs?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us the product, mesh and volume you need—we will make a sensible plan.
          </p>
          <Link
            to="/bulk-orders"
            className="mt-4 inline-block text-sm font-bold text-primary underline underline-offset-4"
          >
            Explore bulk orders
          </Link>
        </div>
      </section>
    </main>
  );
}
