import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChefHat,
  ChevronRight,
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

const categories = [
  { ...CATEGORIES[0], image: carrot },
  { ...CATEGORIES[1], image: turmeric },
  { ...CATEGORIES[2], image: spinach },
  { ...CATEGORIES[3], image: onion },
];

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((product) => product.bestSeller).slice(0, 4);

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

      {/* Custom Hero Section matching design image */}
      <section className="relative bg-gradient-to-b from-[#051f12] via-[#04170d] to-[#020e07] text-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle Ambient Background Leaf Glow */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
          {/* Left Hero Content */}
          <Reveal y={24} className="max-w-2xl">
            {/* Top Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-2 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Leaf className="h-3.5 w-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.marathiHeader}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-serif text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-white">
              Real Ingredients. <br />
              <span className="text-emerald-400">Real Taste.</span> <br />
              Real You.
            </h1>

            {/* Leaf Divider + Marathi Sub-text */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-emerald-400" />
              <Leaf className="h-4 w-4 text-emerald-400 shrink-0" />
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-emerald-100/90 sm:text-base">
              {COMPANY_INFO.marathiDescription}
            </p>

            {/* Action Buttons */}
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
              {/* Outer Orbit Arc Circle */}
              <div className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] pointer-events-none sm:h-[400px] sm:w-[400px]" />

              {/* Central Kraft Pouch Display Box */}
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

              {/* Orbiting Nodes (6 Circular Badge Nodes) */}
              {/* Node 1: No Preservatives (Top Left) */}
              <div className="absolute top-2 left-2 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <FlaskConical className="h-3.5 w-3.5" />
                </div>
                <span>No Preservatives</span>
              </div>

              {/* Node 2: Farm to Home (Mid Left) */}
              <div className="absolute top-1/2 -left-4 z-20 -translate-y-1/2 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Home className="h-3.5 w-3.5" />
                </div>
                <span>Farm to Home</span>
              </div>

              {/* Node 3: Rich in Nutrients (Bottom Left) */}
              <div className="absolute bottom-2 left-4 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span>Rich in Nutrients</span>
              </div>

              {/* Node 4: 100% Natural Stamp (Top Right) */}
              <div className="absolute top-0 right-2 z-20 grid h-14 w-14 place-items-center rounded-full border border-emerald-400/50 bg-emerald-950/90 text-center shadow-lg backdrop-blur-md">
                <div className="text-[9px] font-extrabold leading-tight text-emerald-400">
                  100%<br />NATURAL
                </div>
              </div>

              {/* Node 5: Ready to Cook (Mid Right) */}
              <div className="absolute top-1/3 -right-4 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Utensils className="h-3.5 w-3.5" />
                </div>
                <span>Ready to Cook</span>
              </div>

              {/* Node 6: Ready to Use (Bottom Right) */}
              <div className="absolute bottom-6 right-0 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
                  <Soup className="h-3.5 w-3.5" />
                </div>
                <span>Ready to Use</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Organic Wave Transition */}
        <div className="w-full overflow-hidden leading-none mt-14">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 text-white fill-current">
            <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Feature Highlights Bar (5 Columns) */}
      <section className="bg-white py-8 border-b border-border">
        <div className="container-x grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">100% Natural</p>
              <p className="text-[11px] text-muted-foreground">No Chemicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Premium Quality</p>
              <p className="text-[11px] text-muted-foreground">Carefully Selected</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Hygienically Processed</p>
              <p className="text-[11px] text-muted-foreground">Modern Technology</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Tractor className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Farm Fresh</p>
              <p className="text-[11px] text-muted-foreground">Directly from Farm</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Trusted by Thousands</p>
              <p className="text-[11px] text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Counter Card */}
      <section className="container-x py-10">
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

      {/* Categories Grid */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeading
          eyebrow="Find your flavour"
          title="Naturally good, in every category"
          sub="Every pack starts with carefully sourced produce from our Wai (Satara) farms, then takes the shortest, cleanest path to your pantry."
        />
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <Link
                to={`/shop?category=${category.id}`}
                className="group relative block h-72 overflow-hidden rounded-3xl bg-forest"
              >
                <img
                  src={category.image}
                  alt=""
                  className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-forest-foreground">
                  <p className="font-display text-xl font-bold">{category.name}</p>
                  <p className="mt-2 text-sm text-forest-foreground/75">{category.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
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

      {/* Community Words & Recipes */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading eyebrow="From our community" title="Kind words from well-fed kitchens" />
        <div className="mt-11 grid gap-5 lg:grid-cols-3">
          {[
            [
              "I make gravies for 120 guests at a time. The onion powder is consistently fragrant, which makes a real difference to my prep.",
              "Chef Rohan Mehta",
              "Nashik",
            ],
            [
              "The beetroot and spinach powders have become the easiest way to add colour to our weekend breakfast experiments.",
              "Ayesha Kulkarni",
              "Pune",
            ],
            [
              "I appreciate being able to read exactly what is in every pack. The garlic powder is a permanent pantry item now.",
              "Nisha Shah",
              "Mumbai",
            ],
          ].map(([quote, name, place], index) => (
            <Reveal key={name} delay={index * 0.08}>
              <figure className="surface-card h-full p-7">
                <Quote className="h-7 w-7 text-accent" />
                <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display font-bold">{name}</p>
                  <p className="text-xs text-muted-foreground">{place}</p>
                </figcaption>
              </figure>
            </Reveal>
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
