import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Carrot,
  CheckCircle2,
  CookingPot,
  Factory,
  Flame,
  GalleryHorizontal,
  HeartHandshake,
  Leaf,
  MapPin,
  PackageCheck,
  PackageOpen,
  Play,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Tractor,
  Truck,
  Users,
  Vegan,
} from "lucide-react";
import farm from "@/assets/farm.jpg";
import { ProductCard } from "@/components/site/ProductCard";
import { Counter, Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { useCatalog } from "@/lib/catalog";
import { COMPANY_INFO, MARATHI_PROMO } from "@/lib/products";
import { GALLERY_ITEMS } from "@/lib/gallery";
import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";
import flatlay from "@/assets/flatlay.jpg";
import heroOnion from "@/assets/hero-onion.jpg";
import flipCardFarmFresh from "@/assets/flip-card-farm-fresh.png";
import flipCardMoringaWellness from "@/assets/flip-card-moringa-wellness.png";
import flipBulkPowders from "@/assets/flip-bulk-powders.png";
import heroFarmFamily from "@/assets/hero-farm-family.png";
import farmStoryOnionProductLineup from "@/assets/farm-story-onion-product-lineup.png";
import heroVideo from "../../utkarsh.mp4";
import storyVideo from "../../Prompt__Use_the_uploaded_image.mp4";

const heroTrustPoints = [
  MARATHI_PROMO.farmText,
  MARATHI_PROMO.processingText,
  MARATHI_PROMO.naturalText,
];

const uspCards = [
  {
    icon: Sprout,
    title: MARATHI_PROMO.farmTitle,
    text: MARATHI_PROMO.farmText,
    image: flipCardFarmFresh,
    imageAlt: "Utkarsh Farm fresh and vibrant naturally grown vegetable field",
    imagePosition: "20% center",
  },
  {
    icon: Factory,
    title: MARATHI_PROMO.processingTitle,
    text: MARATHI_PROMO.processingText,
    image: flatlay,
    imageAlt: "Dehydrated ingredients and powders arranged for processing",
  },
  {
    icon: ShieldCheck,
    title: MARATHI_PROMO.productsTitle,
    text: `${MARATHI_PROMO.productsText} ${MARATHI_PROMO.examples}`,
    image: flipCardMoringaWellness,
    imageAlt: "Utkarsh Farm moringa leaf powder natural wellness product display",
  },
  {
    icon: Truck,
    title: "थेट संपर्क आणि ऑर्डर",
    text: MARATHI_PROMO.contactLine,
    image: flipBulkPowders,
    imageAlt: "Bulk organic ingredient order and supply support",
  },
];

const processSteps = [
  {
    title: "Our Farm",
    text: MARATHI_PROMO.farmText,
  },
  {
    title: "Processing",
    text: MARATHI_PROMO.processingText,
  },
  {
    title: "Products",
    text: `${MARATHI_PROMO.productsText} ${MARATHI_PROMO.examples}`,
  },
  {
    title: "Contact",
    text: MARATHI_PROMO.contactLine,
  },
];

const trustStrip = [
  { label: "GSTIN", value: COMPANY_INFO.gstin },
  { label: "FSSAI", value: COMPANY_INFO.fssaiRegNo },
  { label: "Udyam", value: COMPANY_INFO.udyamRegNo },
  { label: "Market", value: COMPANY_INFO.marketCovered },
];

const categoryIconMap = {
  "dehydrated-flakes": {
    icon: Carrot,
    shell: "bg-green-50 text-green-700 ring-green-100",
  },
  "dehydrated-powders": {
    icon: CookingPot,
    shell: "bg-secondary text-earth ring-earth/20",
  },
  "organic-powders": {
    icon: Vegan,
    shell: "bg-secondary text-accent ring-earth/20",
  },
  spices: {
    icon: Flame,
    shell: "bg-secondary text-earth ring-earth/20",
  },
  "dried-specialty": {
    icon: PackageOpen,
    shell: "bg-stone-100 text-forest ring-stone-200",
  },
} as const;

export default function HomePage() {
  const { products, categories } = useCatalog();
  const bestSellerProducts = products.filter((product) => product.bestSeller).slice(0, 6);
  const featuredProducts =
    bestSellerProducts.length >= 4 ? bestSellerProducts : products.slice(0, 6);
  const galleryPreview = GALLERY_ITEMS.slice(0, 5);
  const featuredGalleryItem = galleryPreview[0];
  const galleryCardItems = galleryPreview.slice(1, 5);

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: COMPANY_INFO.name,
            url: COMPANY_INFO.website,
            email: COMPANY_INFO.email,
            telephone: COMPANY_INFO.phonePrimary,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${COMPANY_INFO.address.doorNo} ${COMPANY_INFO.address.locality}`,
              addressLocality: COMPANY_INFO.address.city,
              addressRegion: COMPANY_INFO.address.state,
              postalCode: COMPANY_INFO.address.pincode,
              addressCountry: "IN",
            },
            description: COMPANY_INFO.marathiDescription,
          }),
        }}
      />

      <section className="relative min-h-[100svh] overflow-hidden bg-forest pb-12 pt-24 text-white sm:pt-32 lg:pb-24 lg:pt-36">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-85"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/65 via-primary/38 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-transparent" />
        <HomeBackgroundAnimation />

        <div className="container-x relative z-10 grid min-h-[calc(100svh-7rem)] items-center gap-8 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <Reveal y={28} className="max-w-4xl">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-earth/35 bg-green-950/60 px-3 py-2 text-xs font-bold text-cream shadow-[0_0_24px_rgba(122,82,52,0.22)] backdrop-blur-md sm:px-4">
              <Leaf className="h-3.5 w-3.5 text-beige" />
              <span>उत्कर्ष फार्म</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance font-display text-3xl font-black leading-[1.08] text-white min-[390px]:text-4xl sm:text-6xl lg:text-7xl">
              उत्कर्ष फार्म
              <span className="block text-beige">{MARATHI_PROMO.heroTitle}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-green-50/86 sm:text-lg">
              {MARATHI_PROMO.campaignText} {MARATHI_PROMO.naturalText}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/products"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-saffron px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_16px_42px_rgba(122,82,52,0.28)] transition hover:-translate-y-0.5 hover:bg-white hover:text-primary min-[420px]:w-auto sm:px-7"
              >
                <ShoppingBag className="h-4 w-4" />
                उत्पादने पाहा
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#farm-story"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/28 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16 min-[420px]:w-auto sm:px-7"
              >
                <Play className="h-3.5 w-3.5 fill-current text-beige" />
                आमची प्रक्रिया
              </a>
            </div>

            <ul className="mt-8 grid gap-3 text-sm font-semibold text-green-50/86 sm:grid-cols-3">
              {heroTrustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-md lg:justify-self-end">
            <div className="rounded-[1.5rem] border border-white/16 bg-white/12 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:rounded-[1.75rem] sm:p-5">
              <div className="rounded-[1.25rem] bg-white p-3 text-foreground sm:rounded-[1.35rem] sm:p-4">
                <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-cream p-3">
                  <img
                    src={heroFarmFamily}
                    alt="Indian farming family harvesting onions at Utkarsh Organic Farm"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-extrabold uppercase text-accent">
                    Satara, Maharashtra
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-black">
                    {MARATHI_PROMO.campaignTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {MARATHI_PROMO.naturalText}
                  </p>
                  <p className="mt-3 text-xs font-bold text-primary">{MARATHI_PROMO.contactLine}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-background pb-10">
        <div className="w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-10 w-full fill-background"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
        <div className="container-x -mt-1">
          <div className="grid gap-3 rounded-[1.75rem] border border-green-500/16 bg-white p-4 shadow-lift sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Official Products"
              value={<Counter to={products.length || 23} suffix="+" />}
              icon={PackageCheck}
            />
            <StatCard
              label="Minimum Order Quantity"
              value={
                <>
                  <Counter to={100} /> kg
                </>
              }
              icon={ShoppingBag}
            />
            <StatCard
              label="Team Members"
              value={<Counter to={15} suffix=" people" />}
              icon={Users}
            />
            <StatCard label="Market Coverage" value="Pan India" icon={Truck} />
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <SectionHeading
          eyebrow="उत्कर्ष फार्म"
          title={MARATHI_PROMO.campaignTitle}
          sub={`${MARATHI_PROMO.campaignText} ${MARATHI_PROMO.naturalText}`}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {uspCards.map(({ icon: Icon, title, text, image, imageAlt, imagePosition }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <article
                tabIndex={0}
                aria-label={title}
                className="group h-full min-h-[18rem] rounded-[1.5rem] outline-none [perspective:1200px] sm:min-h-[20rem]"
              >
                <div className="relative h-full min-h-[18rem] transition duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] sm:min-h-[20rem]">
                  <div className="surface-card absolute inset-0 overflow-hidden [backface-visibility:hidden]">
                    <img
                      src={image}
                      alt={imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-focus:scale-105"
                      style={imagePosition ? { objectPosition: imagePosition } : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/18 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/92 text-primary shadow-soft backdrop-blur">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="surface-card absolute inset-0 flex flex-col p-6 transition duration-300 [backface-visibility:hidden] [transform:rotateY(180deg)] group-hover:shadow-lift group-focus:shadow-lift">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent transition duration-300 animate-gentle-float group-hover:bg-primary group-hover:text-primary-foreground group-hover:[animation-play-state:paused]"
                      style={{ animationDelay: `${index * 0.16}s` }}
                    >
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-beige/45 py-16 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Best sellers"
              title="Products customers discover first."
              sub="Real catalog items with the same product detail routes, cart handlers, wishlist state and MOQ data."
            />
            <Link
              to="/products"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary hover:text-accent"
            >
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative mt-11 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-beige/80 to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-beige/80 to-transparent sm:w-20" />
            <div className="flex w-max animate-marquee [animation-duration:34s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
              <div className="flex gap-5 pr-5">
                {featuredProducts.map((product, index) => (
                  <Reveal
                    key={product.slug}
                    delay={index * 0.05}
                    className="w-[min(78vw,18rem)] shrink-0 sm:w-[18.5rem] lg:w-[19rem]"
                  >
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
              <div aria-hidden="true" inert className="flex gap-5 pr-5">
                {featuredProducts.map((product) => (
                  <div
                    key={`carousel-copy-${product.slug}`}
                    className="w-[min(78vw,18rem)] shrink-0 sm:w-[18.5rem] lg:w-[19rem]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.slice(0, 5).map((category, index) => {
            const iconMeta =
              categoryIconMap[category.id as keyof typeof categoryIconMap] ||
              categoryIconMap["dehydrated-flakes"];
            const CategoryIcon = iconMeta.icon;

            return (
              <Reveal key={category.id} delay={index * 0.05}>
                <Link
                  to={`/products?category=${category.id}`}
                  className="group flex h-full min-h-44 flex-col justify-between rounded-[1.5rem] border border-border bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-earth hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div>
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl ring-1 transition duration-300 animate-gentle-float group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-3 ${iconMeta.shell}`}
                      style={{ animationDelay: `${index * 0.18}s` }}
                    >
                      <CategoryIcon
                        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-black">{category.name}</h3>
                    {category.blurb ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {category.blurb}
                      </p>
                    ) : null}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Explore{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="farm-story" className="bg-gradient-cream py-16 lg:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="eyebrow mb-3">Our Farm</p>
            <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              {COMPANY_INFO.marathiHeader}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {MARATHI_PROMO.campaignText} {MARATHI_PROMO.naturalText}
            </p>
            <div className="mt-8 grid gap-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-border bg-white p-3 shadow-lift">
              <div className="grid aspect-[5/4] place-items-center overflow-hidden rounded-[1.55rem] bg-cream">
                <img
                  src={farmStoryOnionProductLineup}
                  alt="Utkarsh Organic Farm product packaging and dehydrated ingredients"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Farm gallery"
            title="A closer look at the farm, products and pantry-ready formats."
            sub="The gallery uses existing site assets and product photos, framed so images stay visible instead of cropped."
          />
          <Link
            to="/gallery"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary hover:text-accent"
          >
            Open gallery <GalleryHorizontal className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          {featuredGalleryItem ? (
            <Reveal delay={0.05}>
              <Link to="/gallery" className="group surface-card block h-full overflow-hidden p-3">
                <div
                  className={`grid place-items-center overflow-hidden rounded-[1.25rem] bg-cream ${featuredGalleryItem.fit === "contain" ? "p-4" : "p-0"} ${featuredGalleryItem.frameClass || "aspect-[4/3]"}`}
                >
                  <img
                    src={featuredGalleryItem.image}
                    alt={featuredGalleryItem.title}
                    className={`h-full w-full object-center transition duration-500 group-hover:scale-[1.03] ${featuredGalleryItem.fit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-extrabold uppercase text-accent">
                    {featuredGalleryItem.label}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold">
                    {featuredGalleryItem.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {featuredGalleryItem.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["विषमुक्त शेती", "हायजीनिक प्रक्रिया", "शुद्ध पावडर्स"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            {galleryCardItems.map((item, index) => (
              <Reveal key={item.title} delay={(index + 1) * 0.05}>
                <Link to="/gallery" className="group surface-card block h-full overflow-hidden p-3">
                  <div
                    className={`grid place-items-center overflow-hidden rounded-[1.25rem] bg-cream ${item.fit === "contain" ? "p-3" : "p-0"} ${item.frameClass || "aspect-[4/3]"}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`h-full w-full object-center transition duration-500 group-hover:scale-[1.03] ${item.fit === "contain" ? "object-contain" : "object-cover"}`}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-extrabold uppercase text-accent">{item.label}</p>
                    <h3 className="mt-1 font-display text-base font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-16 text-white lg:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow mb-3 text-beige">Processing</p>
            <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              आधुनिक तंत्रज्ञानाने हायजीनिक प्रक्रिया.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/72">
              {MARATHI_PROMO.processingText} {MARATHI_PROMO.productsText}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-earth/24 bg-earth/10 px-4 py-2 text-xs font-bold text-cream">
                <Play className="h-3.5 w-3.5" />
                Dehydrated Vegetables
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-earth/24 bg-earth/10 px-4 py-2 text-xs font-bold text-cream">
                <Leaf className="h-3.5 w-3.5" />
                १००% नॅचरल
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-white/14 bg-white/8 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              <video
                className="aspect-video w-full rounded-[1.5rem] bg-black object-contain"
                src={storyVideo}
                poster={farm}
                controls
                preload="metadata"
                playsInline
                aria-label="Utkarsh Organic Farm video story"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Loved by our customers"
            title="Customer stories from kitchens and bulk buyers."
            sub="A moving wall of feedback from people exploring Utkarsh Organic products for everyday cooking and commercial use."
          />
        </div>

        <div className="relative mt-11 w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]">
            {[...CUSTOMER_TESTIMONIALS, ...CUSTOMER_TESTIMONIALS, ...CUSTOMER_TESTIMONIALS].map(
              (testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  className="surface-card flex w-[min(360px,calc(100vw-2rem))] shrink-0 flex-col justify-between p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <Quote className="h-8 w-8 fill-green-500/10 text-green-500" />
                    </div>
                    <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="mt-7 border-t border-border pt-4">
                    <p className="font-display font-bold text-foreground">{testimonial.name}</p>
                    <p className="mt-1 text-xs font-semibold text-accent">{testimonial.place}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-forest py-10 text-forest-foreground">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustStrip.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.04}>
              <div className="rounded-[1.25rem] border border-white/12 bg-white/8 p-5">
                <p className="text-xs font-bold uppercase text-beige">{item.label}</p>
                <p className="mt-2 break-words font-display text-lg font-extrabold text-white">
                  {item.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-8 rounded-[2rem] bg-secondary p-5 sm:p-7 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Visit or order</p>
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              {MARATHI_PROMO.contactLine}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {MARATHI_PROMO.campaignText} {COMPANY_INFO.address.full}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              to="/bulk-orders"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-forest"
            >
              <PackageCheck className="h-4 w-4" />
              Bulk Order
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-white px-6 py-3 text-sm font-extrabold text-primary transition hover:-translate-y-0.5"
            >
              <MapPin className="h-4 w-4" />
              WhatsApp संपर्क
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: ReactNode;
  icon: typeof BadgeCheck;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[1.25rem] bg-cream p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-xl font-black text-foreground">{value}</p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function HomeBackgroundAnimation() {
  const leaves = [
    "left-[7%] top-[18%] h-8 w-8 opacity-35 [animation-delay:0s] [animation-duration:15s]",
    "left-[18%] top-[68%] h-6 w-6 opacity-25 [animation-delay:2s] [animation-duration:18s]",
    "left-[52%] top-[16%] h-7 w-7 opacity-30 [animation-delay:4s] [animation-duration:17s]",
    "left-[70%] top-[58%] h-9 w-9 opacity-25 [animation-delay:1s] [animation-duration:20s]",
    "left-[86%] top-[28%] h-6 w-6 opacity-30 [animation-delay:6s] [animation-duration:16s]",
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="home-vine-lines absolute inset-x-0 bottom-0 h-40 opacity-50" />
      {leaves.map((className, index) => (
        <Leaf
          key={index}
          className={`home-drifting-leaf absolute text-green-300/60 ${className}`}
          strokeWidth={1.6}
        />
      ))}
    </div>
  );
}
