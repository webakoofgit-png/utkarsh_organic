import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Factory,
  FlaskConical,
  HeartHandshake,
  Home,
  Leaf,
  Play,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Soup,
  Sparkles,
  Sprout,
  Star,
  Tractor,
  Truck,
  Users,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import farm from "@/assets/farm.jpg";
import flatlay from "@/assets/flatlay.jpg";
import hero from "@/assets/hero-onion.jpg";
import carrot from "@/assets/p-carrot.jpg";
import onion from "@/assets/p-onion.jpg";
import spinach from "@/assets/p-spinach.jpg";
import turmeric from "@/assets/p-turmeric.jpg";
import { ProductCard } from "@/components/site/ProductCard";
import { Counter, Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { BLOG_POSTS, CATEGORIES, PRODUCTS, RECIPES, COMPANY_INFO } from "@/lib/products";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const customCategories = [
  {
    id: "vegetable",
    name: "Vegetable & Fruit Powders",
    items: "Onion, Tomato, Beetroot, Spinach, Carrot, Moringa, Amla, Mango, Banana",
    image: spinach,
    badgeBg: "bg-[#7ca938]",
    cardBg: "bg-[#f0f7ef] border-[#d6ebd3]",
    btnBg: "bg-[#7ca938] hover:bg-[#69922c]",
    icon: Leaf,
  },
  {
    id: "spice",
    name: "Spice Powders & Dry Spices",
    items: "Turmeric, Chilli, Coriander, Garlic, Ginger",
    image: turmeric,
    badgeBg: "bg-[#e6a119]",
    cardBg: "bg-[#fdf7e7] border-[#f5e4b8]",
    btnBg: "bg-[#e6a119] hover:bg-[#cc8e12]",
    icon: UtensilsCrossed,
  },
  {
    id: "wellness",
    name: "Wellness & Herbal Teas",
    items: "Moringa Lemon Tea, Moringa Leaf Powder, Immunity Powders",
    image: onion,
    badgeBg: "bg-[#1b5e2b]",
    cardBg: "bg-[#edf6ef] border-[#ceebd4]",
    btnBg: "bg-[#1b5e2b] hover:bg-[#134720]",
    icon: Coffee,
  },
  {
    id: "ready-to-cook",
    name: "Ready to Cook & Functional Foods",
    items: "Moringa Soup, Moringa Noodles, Dehydrated Mixed Veggies",
    image: carrot,
    badgeBg: "bg-[#c24e27]",
    cardBg: "bg-[#fdf2ec] border-[#f7d6c4]",
    btnBg: "bg-[#c24e27] hover:bg-[#a53f1d]",
    icon: Soup,
  },
];

const testimonials = [
  {
    quote: "I make gravies for 120 guests at a time. The onion powder is consistently fragrant, which makes a real difference to my prep.",
    name: "Chef Rohan Mehta",
    place: "Nashik",
  },
  {
    quote: "The beetroot and spinach powders have become the easiest way to add colour to our weekend breakfast experiments.",
    name: "Ayesha Kulkarni",
    place: "Pune",
  },
  {
    quote: "I appreciate being able to read exactly what is in every pack. The garlic powder is a permanent pantry item now.",
    name: "Nisha Shah",
    place: "Mumbai",
  },
  {
    quote: "Moringa Lemon Tea has replaced my morning coffee! Pure, refreshing, and clean energy without any stomach acidity.",
    name: "Dr. Vikram Joshi",
    place: "Kolhapur",
  },
  {
    quote: "As a mother of two picky eaters, mixing Shevga Leaf and Carrot powder into roti dough is my secret nutrition hack.",
    name: "Sunita Deshmukh",
    place: "Satara",
  },
  {
    quote: "The dehydrated mixed vegetables rehydrate in 5 minutes! Essential for our resort kitchen's high-volume daily service.",
    name: "Chef Sameer Patil",
    place: "Goa",
  },
];

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((product) => product.bestSeller).slice(0, 4);

  // Testimonial Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const totalPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, totalPages]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalPages);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <main className="pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: COMPANY_INFO.name,
            url: "https://utkarshorganic.com",
            description: "Organic dehydrated food powders for home and professional kitchens.",
          }),
        }}
      />

      {/* Custom Hero Section */}
      <section className="relative bg-gradient-to-b from-[#051f12] via-[#04170d] to-[#020e07] text-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Ambient Background Leaf Glow */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
          {/* Left Hero Content */}
          <Reveal y={24} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-2 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Leaf className="h-3.5 w-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.marathiHeader}</span>
            </div>

            <h1 className="mt-6 font-serif text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-white">
              Real Ingredients. <br />
              <span className="text-emerald-400">Real Taste.</span> <br />
              Real You.
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-emerald-400" />
              <Leaf className="h-4 w-4 text-emerald-400 shrink-0" />
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-emerald-100/90 sm:text-base">
              {COMPANY_INFO.marathiDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-extrabold text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 hover:bg-emerald-400 transition duration-200"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop Now</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/why-organic"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/40 px-7 py-3.5 text-sm font-bold text-white hover:bg-emerald-500/20 transition duration-200"
              >
                <span>Explore More</span>
                <Play className="h-3.5 w-3.5 fill-current text-emerald-400" />
              </Link>
            </div>
          </Reveal>

          {/* Right Product Showcase & Orbiting Nodes */}
          <Reveal delay={0.15} className="relative flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] pointer-events-none sm:h-[400px] sm:w-[400px]" />

              <div className="relative z-10 mx-auto w-72 sm:w-80 rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-6 backdrop-blur-md shadow-2xl text-center">
                <img
                  src={onion}
                  alt="Utkarsh Organic Farm Onion Powder Pouch"
                  className="mx-auto h-64 w-full rounded-2xl object-cover shadow-lg"
                />
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase">
                    100% PURE &amp; NATURAL
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mt-0.5">
                    UTKARSH ORGANIC ONION POWDER
                  </h3>
                  <p className="text-xs text-emerald-200/80 mt-1">Direct from Satara Farm</p>
                </div>
              </div>

              {/* Orbiting Badge Nodes */}
              <div className="absolute top-2 left-2 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <FlaskConical className="h-3.5 w-3.5" />
                </div>
                <span>No Preservatives</span>
              </div>

              <div className="absolute top-1/2 -left-4 z-20 -translate-y-1/2 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Home className="h-3.5 w-3.5" />
                </div>
                <span>Farm to Home</span>
              </div>

              <div className="absolute bottom-2 left-4 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span>Rich in Nutrients</span>
              </div>

              <div className="absolute top-0 right-2 z-20 grid h-14 w-14 place-items-center rounded-full border border-emerald-400/50 bg-emerald-950/90 text-center shadow-lg backdrop-blur-md">
                <div className="text-[9px] font-extrabold leading-tight text-emerald-400">
                  100%<br />NATURAL
                </div>
              </div>

              <div className="absolute top-1/3 -right-4 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Utensils className="h-3.5 w-3.5" />
                </div>
                <span>Ready to Cook</span>
              </div>

              <div className="absolute bottom-6 right-0 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Soup className="h-3.5 w-3.5" />
                </div>
                <span>Ready to Use</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Wave Divider */}
        <div className="w-full overflow-hidden leading-none mt-14">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 text-white fill-current">
            <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Counter Cards */}
      <section className="container-x py-8">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-[#051f12] to-[#03130a] p-6 shadow-xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-emerald-500/20">
            <div>
              <p className="font-serif text-3xl font-extrabold text-emerald-400">
                <Counter to={50} suffix="+" />
              </p>
              <p className="mt-1 text-xs font-semibold text-emerald-200">Products</p>
            </div>

            <div>
              <p className="font-serif text-3xl font-extrabold text-emerald-400">
                <Counter to={1000} suffix="+" />
              </p>
              <p className="mt-1 text-xs font-semibold text-emerald-200">Happy Customers</p>
            </div>

            <div>
              <p className="font-serif text-3xl font-extrabold text-emerald-400">
                <Counter to={10} suffix="+" />
              </p>
              <p className="mt-1 text-xs font-semibold text-emerald-200">Farm Partners</p>
            </div>

            <div>
              <p className="font-serif text-3xl font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                <Counter to={5} suffix="" />
                <Star className="h-5 w-5 fill-emerald-400 text-emerald-400" />
              </p>
              <p className="mt-1 text-xs font-semibold text-emerald-200">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="container-x py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-extrabold tracking-[0.25em] text-[#6b9d28] uppercase flex items-center justify-center gap-2">
            <span>➔</span> FIND YOUR FLAVOUR <span>➔</span>
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Naturally good, in{" "}
            <span className="relative inline-block text-[#1b5e2b]">
              every category
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#7ca938]" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Every pack starts with carefully sourced produce from our Wai (Satara) farms, then takes the shortest, cleanest path to your pantry.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={index * 0.08}>
                <div
                  className={`relative flex flex-col justify-between rounded-[2rem] border ${cat.cardBg} p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full text-center`}
                >
                  <div
                    className={`absolute -top-5 left-6 grid h-11 w-11 place-items-center rounded-full ${cat.badgeBg} text-white shadow-md`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="mt-4 relative h-48 w-full overflow-hidden rounded-2xl bg-white/60 p-3 shadow-inner flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-40 w-full object-cover rounded-xl transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="mt-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-black text-foreground">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90">
                        {cat.items}
                      </p>
                    </div>

                    <div className="mt-6">
                      <Link
                        to={`/shop?category=${cat.id}`}
                        className={`inline-flex items-center gap-1.5 rounded-full ${cat.btnBg} px-6 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:scale-105`}
                      >
                        <span>Explore</span>
                        <span>➔</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 rounded-full border border-[#d6ebd3] bg-[#f0f7ef] p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:divide-x divide-[#d6ebd3]">
            <div className="flex items-center gap-3 justify-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7ca938]/20 text-[#7ca938]">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-foreground">100% Natural</p>
                <p className="text-[11px] text-muted-foreground">No Chemicals</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:pl-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7ca938]/20 text-[#7ca938]">
                <Tractor className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-foreground">Farm Fresh</p>
                <p className="text-[11px] text-muted-foreground">Directly from Farms</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:pl-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7ca938]/20 text-[#7ca938]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-foreground">Premium Quality</p>
                <p className="text-[11px] text-muted-foreground">Carefully Selected</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:pl-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7ca938]/20 text-[#7ca938]">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-foreground">No Preservatives</p>
                <p className="text-[11px] text-muted-foreground">Pure &amp; Safe</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:pl-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7ca938]/20 text-[#7ca938]">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-foreground">Trusted by Thousands</p>
                <p className="text-[11px] text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-[#051f12] via-[#04170d] to-[#020e07] px-6 py-2.5 text-xs font-extrabold text-white shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Pure by <strong className="text-emerald-400">Nature.</strong> ✦ Trusted by <strong className="text-emerald-400">You.</strong></span>
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-beige/45 py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Loved in real kitchens"
              title="Our Best Sellers"
              sub="The pantry staples cooks keep coming back for."
            />
            <Link
              to="/shop"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary hover:text-accent"
            >
              Shop all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Everyday Hero Section */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-forest p-7 text-forest-foreground md:p-10 lg:grid-cols-2 lg:p-14">
          <Reveal>
            <p className="eyebrow text-accent">The everyday hero</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              One spoonful. <br />A world of flavour.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-forest-foreground/75">
              Our signature Organic Onion Powder brings deep, savoury flavour to gravies, marinades, snacks and more—without the peeling or the prep.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "100% dehydrated onion",
                "No preservatives",
                "Fine, free-flowing texture",
                "Made for daily cooking",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                  <Check className="h-4 w-4 text-accent" /> {item}
                </li>
              ))}
            </ul>
            <Link
              to="/product/organic-onion-powder"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground"
            >
              Meet our onion powder <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <img
              src={flatlay}
              alt="Organic vegetable powder ingredients flat lay"
              className="h-[400px] w-full rounded-3xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Promise & Farm Journey */}
      <section className="bg-gradient-cream py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our promise" title="Good for your plate. Better by nature." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: "Thoughtfully sourced",
                text: "We begin with produce grown with care at Lohare / Gangapuri farms in Wai, Satara.",
              },
              {
                icon: Factory,
                title: "Gently processed",
                text: "Low-temperature dehydration keeps colour, aroma and everyday ease intact.",
              },
              {
                icon: HeartHandshake,
                title: "Honestly packed",
                text: "No fillers, artificial colour or shortcuts—just a clear ingredient list.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <div className="surface-card h-full p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community Words - Interactive Auto-Rotating Testimonials Carousel */}
      <section
        className="container-x py-20 lg:py-28"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <SectionHeading eyebrow="From our community" title="Kind words from well-fed kitchens" />

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Track */}
        <div className="mt-11 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials
                .slice(currentSlide * 3, currentSlide * 3 + 3)
                .map(({ quote, name, place }, idx) => (
                  <div
                    key={name + idx}
                    className="surface-card flex h-full flex-col justify-between p-8 shadow-lift border border-border/80 rounded-3xl bg-background transition hover:-translate-y-1"
                  >
                    <div>
                      <Quote className="h-8 w-8 text-emerald-500 fill-emerald-500/10" />
                      <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        “{quote}”
                      </blockquote>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/50">
                      <p className="font-display font-bold text-foreground">{name}</p>
                      <p className="text-xs text-emerald-600 font-semibold">{place}</p>
                    </div>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-8 bg-emerald-600" : "w-2.5 bg-emerald-200 hover:bg-emerald-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section className="bg-beige/45 py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Simple ideas"
              title="Make something nourishing"
              sub="Easy recipes with little shortcuts and plenty of flavour."
            />
            <Link
              to="/recipes"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary hover:text-accent"
            >
              See all recipes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {RECIPES.slice(0, 3).map((recipe, index) => (
              <Reveal key={recipe.slug} delay={index * 0.08}>
                <Link to="/recipes" className="group surface-card block overflow-hidden">
                  <img
                    src={[flatlay, carrot, turmeric][index]}
                    alt=""
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">
                      {recipe.time} &middot; {recipe.level}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold">{recipe.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Made with {recipe.uses.join(" and ")}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Journal */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading eyebrow="Field notes" title="A little more to savour" />
        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-3xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Journal &middot; {post.read}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Read story <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="container-x py-20 lg:py-24">
        <div className="rounded-[2rem] bg-secondary px-7 py-12 text-center md:px-12">
          <Leaf className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            A better pantry starts here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Get simple recipe ideas, new product news and a gentle nudge to cook something good.
          </p>
          <form
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value = "";
            }}
          >
            <input
              name="email"
              required
              type="email"
              placeholder="Your email address"
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none ring-ring focus:ring-2"
            />
            <button className="h-12 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground">
              Join the good list
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            No noise. Just useful things for your kitchen.
          </p>
        </div>
      </section>
    </main>
  );
}
