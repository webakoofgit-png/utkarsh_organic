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
import { type Category } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import flatlay from "@/assets/flatlay.jpg";
import onion from "@/assets/p-onion.jpg";
import spinach from "@/assets/p-spinach.jpg";

const bannerSlides = [
  {
    id: "whole-collection",
    eyebrow: "OFFICIAL UTKARSH CATALOG",
    titleLine1: "Wholesale ingredients,",
    titleLine2: "source-ready.",
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
    titleLine1: "Official per-kg quotes,",
    titleLine2: "with MOQ.",
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
    eyebrow: "ORGANIC & AYURVEDIC POWDERS",
    titleLine1: "Amla, beetroot,",
    titleLine2: "ginger & moringa.",
    subtitle: "Organic and ayurvedic powders for ingredient buyers and commercial kitchens.",
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
  const { products, categories, categoryLabel } = useCatalog();

  const initialQ = searchParams.get("q") || "";
  const initialCat = (searchParams.get("category") as Category) || "all";

  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState<string | "all">(initialCat);
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
    if (c && categories.some((item) => item.id === c)) {
      setCategory(c);
    } else {
      setCategory("all");
    }
  }, [searchParams, categories]);

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    const selected = products.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        (!term || `${product.name} ${product.short} ${categoryLabel(product.category)}`.toLowerCase().includes(term))
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
  }, [category, q, sort, products, categoryLabel]);

  const updateSearch = (nextQ: string, nextCategory: string | "all") => {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextCategory !== "all") params.set("category", nextCategory);
    const queryString = params.toString();
    navigate(queryString ? `/products?${queryString}` : "/products");
  };

  const slide = (bannerSlides[activeSlide % bannerSlides.length] || bannerSlides[0])!;

  return (
    <main className="pt-16 lg:pt-20 bg-background">
      {/* Top Full Viewport Width Dark Green Breadcrumb Bar */}
      <div className="w-full bg-[#041a0e] border-b border-emerald-500/20 py-3">
        <div className="container-x flex items-center justify-between text-xs sm:text-sm text-emerald-100 font-medium">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-4 w-4 text-emerald-500/60" />
            <Link to="/" className="text-emerald-100 hover:text-emerald-400 transition font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-emerald-500/60" />
            <span className="font-bold text-emerald-400">Products</span>
            <ChevronRight className="h-4 w-4 text-emerald-500/60" />
            <span className="text-emerald-200/90 font-medium">The Whole Collection</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400">
            <Leaf className="h-4.5 w-4.5 fill-emerald-400/30 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Hero Banner Header */}
      {/* Desktop (1920): 300px | Laptop (1440): 250px | Tablet (768): 210px | Mobile (390): 160px */}
      <section
        className="relative w-full overflow-hidden min-h-[140px] h-[160px] sm:h-[180px] md:h-[210px] lg:h-[250px] xl:h-[300px] flex items-center bg-gradient-to-r from-[#051f12] via-[#04170d] to-[#020e07] text-white border-b border-emerald-500/20 shadow-md"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Subtle Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x w-full relative z-10 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex w-full items-center justify-between gap-6"
            >
              {/* Left Content */}
              <div className="max-w-2xl py-2">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold text-emerald-300 tracking-wider">
                  <Leaf className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{slide.eyebrow}</span>
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                </div>

                {/* Headline */}
                <h1 className="mt-2 font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white">
                  {slide.titleLine1}{" "}
                  <span className="relative inline-block text-emerald-400">
                    {slide.titleLine2}
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2.5 text-emerald-400"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,10 Q50,20 100,5"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-emerald-100/90 max-w-xl hidden sm:block">
                  {slide.subtitle}
                </p>
              </div>

              {/* Right Visual Image */}
              <div className="relative shrink-0 flex items-center justify-end">
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-2 backdrop-blur-md shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.eyebrow}
                    className="h-28 sm:h-36 md:h-44 lg:h-52 xl:h-60 w-40 sm:w-56 md:w-64 lg:w-80 xl:w-96 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-3 right-3 rounded-xl border border-emerald-400/40 bg-emerald-950/90 px-3 py-1 text-xs font-bold text-emerald-300 shadow-lg backdrop-blur-md hidden sm:block">
                    🌱 100% Pure &amp; Natural
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Curved Wave Graphic */}
        <div className="w-full overflow-hidden leading-none absolute bottom-0 inset-x-0 z-10 pointer-events-none">
          <svg
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="relative block w-full h-4 text-[#0a3520] fill-current opacity-80"
          >
            <path d="M0,0 C300,30 600,-10 1200,20 L1200,40 L0,40 Z"></path>
          </svg>
        </div>

        {/* Slide Navigation Controls */}
        <div className="container-x absolute bottom-2.5 inset-x-0 z-20 flex justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
              aria-label="Previous slide"
              className="grid h-7 w-7 place-items-center rounded-full border border-emerald-400/30 bg-emerald-950/90 text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex gap-1">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === idx ? "w-4 bg-emerald-400" : "w-1.5 bg-emerald-800"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % bannerSlides.length)}
              aria-label="Next slide"
              className="grid h-7 w-7 place-items-center rounded-full border border-emerald-400/30 bg-emerald-950/90 text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Catalogue Filters & Grid */}
      <section className="container-x py-6 lg:py-10">
        {/* Search & Categories Bar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-emerald-900/10 bg-[#faf8f5] p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5 shadow-sm">
          {/* Search Input Container */}
          <div className="relative flex-1 min-w-[260px] lg:max-w-md">
            <div className="relative flex items-center w-full rounded-full border border-emerald-900/15 bg-white px-4 py-3 shadow-inner focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all">
              <Search className="h-4.5 w-4.5 shrink-0 text-emerald-800/70" />
              <input
                type="text"
                value={q}
                onChange={(event) => {
                  setQ(event.target.value);
                  updateSearch(event.target.value, category);
                }}
                placeholder="Search organic powders & spices..."
                className="w-full bg-transparent pl-3 pr-7 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
              />
              {q && (
                <button
                  onClick={() => {
                    setQ("");
                    updateSearch("", category);
                  }}
                  className="absolute right-3.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {[{ id: "all" as const, name: "All Products" }, ...categories].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCategory(item.id);
                  updateSearch(q, item.id);
                }}
                className={`rounded-full px-4 py-2.5 text-xs font-bold transition-all shadow-sm ${
                  category === item.id
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-white border border-emerald-900/10 text-foreground/80 hover:bg-emerald-50 hover:text-emerald-900"
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
