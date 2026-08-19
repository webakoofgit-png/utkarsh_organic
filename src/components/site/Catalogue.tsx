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
    <main className="pt-16 lg:pt-20 bg-background">
      {/* 100% Full Viewport Width Hero Banner (Edge-to-Edge matching /bulk-orders) */}
      {/* Desktop (1920): 180-220px | Laptop (1440): 160-190px | Tablet (768): 130-160px | Mobile (390): 100-130px */}
      <section
        className="relative w-full overflow-hidden min-h-[110px] h-[115px] sm:h-[140px] md:h-[150px] lg:h-[180px] xl:h-[200px] flex items-center bg-gradient-to-r from-[#051f12] via-[#04170d] to-[#020e07] text-white border-b border-emerald-500/20 shadow-md"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Subtle Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x w-full relative z-10 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex w-full items-center justify-between gap-4"
            >
              {/* Left Content */}
              <div className="max-w-2xl py-2">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-emerald-300 tracking-wider">
                  <Leaf className="h-3 w-3 text-emerald-400" />
                  <span>{slide.eyebrow}</span>
                  <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                </div>

                {/* Headline */}
                <h1 className="mt-1 font-serif text-sm sm:text-lg md:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white">
                  {slide.titleLine1}{" "}
                  <span className="relative inline-block text-emerald-400">
                    {slide.titleLine2}
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2 text-emerald-400"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,10 Q50,20 100,5"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-1 text-[10px] sm:text-xs leading-snug text-emerald-100/85 line-clamp-1 sm:line-clamp-2 max-w-lg hidden sm:block">
                  {slide.subtitle}
                </p>

                {/* 3 Feature Items Ribbon */}
                <div className="mt-2.5 hidden md:flex items-center gap-5 border-t border-emerald-500/20 pt-2">
                  {slide.features.map(({ icon: Icon, title, sub }) => (
                    <div key={title} className="flex items-center gap-2">
                      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-[10px] font-bold text-white">{title}</p>
                        <p className="text-[9px] text-emerald-300/80">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="relative shrink-0 flex items-center justify-end">
                <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-1.5 backdrop-blur-md shadow-xl">
                  <img
                    src={slide.image}
                    alt={slide.eyebrow}
                    className="h-20 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-32 sm:w-44 md:w-52 lg:w-60 xl:w-64 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 rounded-lg border border-emerald-400/40 bg-emerald-950/90 px-2 py-0.5 text-[9px] font-bold text-emerald-300 shadow-md backdrop-blur-md hidden sm:block">
                    🌱 100% Pure
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
