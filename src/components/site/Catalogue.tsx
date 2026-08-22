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
      {/* Top Full Viewport Width Fresh Teal Breadcrumb Bar */}
      <div className="w-full bg-[#083b3f] border-b border-teal-300/25 py-3">
        <div className="container-x flex min-w-0 items-center justify-between text-xs sm:text-sm text-teal-50 font-medium">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto sm:gap-3">
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full bg-teal-950/90 border border-teal-300/45 text-teal-200 hover:bg-lime-300 hover:text-teal-950 transition"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-4 w-4 text-teal-200/60" />
            <Link to="/" className="text-teal-50 hover:text-lime-200 transition font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-teal-200/60" />
            <span className="font-bold text-lime-200">Products</span>
            <ChevronRight className="h-4 w-4 text-teal-200/60" />
            <span className="hidden shrink-0 text-teal-100/90 font-medium sm:inline">The Whole Collection</span>
          </div>

          <div className="flex items-center gap-1.5 text-lime-200">
            <Leaf className="h-4.5 w-4.5 fill-lime-300/30 text-lime-200" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Hero Banner Header */}
      {/* Desktop (1920): 300px | Laptop (1440): 250px | Tablet (768): 210px | Mobile (390): 160px */}
      <section
        className="relative flex min-h-[170px] w-full items-center overflow-hidden bg-gradient-to-r from-[#0a4b4d] via-[#08383e] to-[#051f29] text-white border-b border-teal-300/20 shadow-md sm:h-[210px] md:h-[230px] lg:h-[260px] xl:h-[300px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Subtle Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-80 w-80 rounded-full bg-lime-300/15 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x w-full relative z-10 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex w-full min-w-0 items-center justify-between gap-6"
            >
              {/* Left Content */}
              <div className="min-w-0 max-w-2xl py-2 pr-2">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/45 bg-teal-950/80 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold text-lime-200 tracking-wider">
                  <Leaf className="h-3.5 w-3.5 text-lime-200" />
                  <span>{slide.eyebrow}</span>
                  <Sparkles className="h-3 w-3 text-amber-300" />
                </div>

                {/* Headline */}
                <h1 className="mt-2 break-words font-serif text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  {slide.titleLine1}{" "}
                  <span className="relative inline-block text-lime-300">
                    {slide.titleLine2}
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2.5 text-lime-300"
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
                <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-teal-50/90 max-w-xl hidden sm:block">
                  {slide.subtitle}
                </p>
              </div>

              {/* Right Visual Image */}
              <div className="relative hidden shrink-0 items-center justify-end sm:flex">
                <div className="relative overflow-hidden rounded-2xl border border-teal-200/30 bg-teal-950/40 p-2 backdrop-blur-md shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.eyebrow}
                    className="h-32 w-52 rounded-xl bg-white/10 object-contain p-1 md:h-44 md:w-64 lg:h-52 lg:w-80 xl:h-60 xl:w-96"
                  />
                  <div className="absolute bottom-3 right-3 rounded-xl border border-teal-200/40 bg-teal-950/90 px-3 py-1 text-xs font-bold text-lime-200 shadow-lg backdrop-blur-md hidden sm:block">
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
            className="relative block w-full h-4 text-[#0b4a4d] fill-current opacity-80"
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
              className="grid h-7 w-7 place-items-center rounded-full border border-teal-200/35 bg-teal-950/90 text-teal-100 transition hover:bg-lime-300 hover:text-teal-950"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex gap-1">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === idx ? "w-4 bg-lime-300" : "w-1.5 bg-teal-800"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % bannerSlides.length)}
              aria-label="Next slide"
              className="grid h-7 w-7 place-items-center rounded-full border border-teal-200/35 bg-teal-950/90 text-teal-100 transition hover:bg-lime-300 hover:text-teal-950"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Catalogue Filters & Grid */}
      <section className="container-x py-6 lg:py-10">
        {/* Search & Categories Bar */}
        <div className="flex min-w-0 flex-col gap-4 rounded-3xl border border-teal-900/10 bg-[#f5fbf7] p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:p-5">
          {/* Search Input Container */}
          <div className="relative w-full min-w-0 flex-1 lg:max-w-md">
            <div className="relative flex items-center w-full rounded-full border border-teal-900/15 bg-white px-4 py-3 shadow-inner focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-lime-400/25 transition-all">
              <Search className="h-4.5 w-4.5 shrink-0 text-teal-800/70" />
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
                  className="absolute right-3.5 grid h-5 w-5 place-items-center rounded-full bg-teal-100 text-teal-800 hover:bg-lime-200 transition text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Badges */}
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {[{ id: "all" as const, name: "All Products" }, ...categories].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCategory(item.id);
                  updateSearch(q, item.id);
                }}
                className={`rounded-full px-3.5 py-2.5 text-xs font-bold transition-all shadow-sm sm:px-4 ${
                  category === item.id
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-white border border-teal-900/10 text-foreground/80 hover:bg-teal-50 hover:text-teal-900"
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
          <label className="flex w-full items-center gap-2 text-sm font-semibold sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 text-accent" /> Sort{" "}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium outline-none sm:flex-none"
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
