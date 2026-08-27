import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Home,
  Leaf,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tractor,
  X,
} from "lucide-react";
import { useState } from "react";
import heroWhyOrganic from "@/assets/hero-why-organic.jpg";
import flatlay from "@/assets/flatlay.jpg";
import hero from "@/assets/hero-onion.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { COMPANY_INFO } from "@/lib/products";

export default function WhyOrganicPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What does the official catalog say about dehydrated ingredients?",
      a: "Most listings describe washed, sliced or peeled produce that is dehydrated, ground or graded, with moisture ranges commonly below 6-8% under proper storage conditions.",
    },
    {
      q: "Are there any anti-caking agents or chemical preservatives added?",
      a: "Zero. Utkarsh Organic Farm powders contain 100% single-ingredient dehydrated vegetables or spices. We rely on moisture-controlled facilities and sealed packaging to keep them free-flowing.",
    },
    {
      q: "What certifications does Utkarsh Organic Farm hold?",
      a: `We are FSSAI Registered (${COMPANY_INFO.fssaiRegNo}), MSME Udyam Certified (${COMPANY_INFO.udyamRegNo}), and GSTIN Registered (${COMPANY_INFO.gstin}).`,
    },
    {
      q: "How long is the shelf life of these products?",
      a: "Official listings commonly mention 12-18 months or 18-24 months shelf life when products are kept in cool, dry and airtight storage conditions.",
    },
    {
      q: "Can I order by product specs?",
      a: "Yes. Product pages include details such as form, color, botanical name, processing method, moisture range, particle size and storage condition.",
    },
  ];

  return (
    <main className="pt-16 lg:pt-20 bg-background">
      {/* Top Full Viewport Width Fresh Teal Breadcrumb Bar */}
      <div className="w-full bg-primary border-b border-green-500/20 py-3">
        <div className="container-x flex items-center justify-between gap-3 text-xs font-medium text-green-100 sm:text-sm">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full bg-green-950/90 border border-green-300/40 text-green-200 hover:bg-earth hover:text-white transition"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <Link to="/" className="text-green-100 hover:text-beige transition font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <span className="font-bold text-beige">Why Organic</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <span className="text-green-200/90 font-medium">
              Why Switch to Utkarsh Organic Powders?
            </span>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 text-beige sm:flex">
            <Leaf className="h-4.5 w-4.5 fill-earth/30 text-beige" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Hero Banner Section (Matching Uploaded Design Image media_1787120970631.png) */}
      {/* Desktop (1920): 300px | Laptop (1440): 250px | Tablet (768): 210px | Mobile (390): 160px */}
      <section className="relative flex min-h-[170px] w-full items-center overflow-hidden bg-gradient-to-r from-primary via-leaf to-earth text-white border-b border-green-500/20 shadow-md sm:h-[210px] md:h-[230px] lg:h-[260px] xl:h-[300px]">
        {/* Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-80 w-80 rounded-full bg-earth/15 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x relative z-10 flex w-full min-w-0 items-center justify-between gap-6 py-6 sm:py-0">
          {/* Left Content */}
          <div className="min-w-0 max-w-2xl py-2 pr-2">
            {/* Top Eyebrow Marathi Banner */}
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-earth/40 bg-green-950/80 px-3 py-1 text-[10px] font-extrabold tracking-wider text-beige sm:px-3.5 sm:text-xs">
              <Sprout className="h-3.5 w-3.5 text-beige" />
              <span className="min-w-0 truncate">{COMPANY_INFO.marathiHeader}</span>
              <Sprout className="h-3.5 w-3.5 text-beige" />
            </div>

            {/* Headline */}
            <h1 className="mt-2 break-words font-serif text-2xl font-black leading-tight text-white min-[390px]:text-3xl md:text-4xl lg:text-5xl">
              Why Switch to{" "}
              <span className="relative inline-block text-beige">
                Utkarsh Organic
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-earth"
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
              </span>{" "}
              Powders?
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-green-100/90 max-w-xl hidden sm:block">
              Eliminate food waste, cut prep work in half, and nourish your family with 100%
              natural, chemical-free dehydrated vegetable &amp; herbal powders.
            </p>
          </div>

          {/* Right Visual Image */}
          <div className="relative hidden shrink-0 items-center justify-end sm:flex">
            <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-green-950/40 p-2 backdrop-blur-md shadow-2xl">
              <img
                src={heroWhyOrganic}
                alt="Utkarsh Organic Farm Powders"
                className="h-32 w-52 rounded-xl bg-white/10 object-contain p-1 md:h-44 md:w-64 lg:h-52 lg:w-80 xl:h-60 xl:w-96"
              />
              <div className="absolute bottom-3 right-3 rounded-xl border border-earth/35 bg-green-950/90 px-3 py-1 text-xs font-bold text-beige shadow-lg backdrop-blur-md hidden sm:block">
                🌱 100% Organic
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curved Wave Graphic */}
        <div className="w-full overflow-hidden leading-none absolute bottom-0 inset-x-0 z-10 pointer-events-none">
          <svg
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="relative block w-full h-4 text-earth fill-current opacity-80"
          >
            <path d="M0,0 C300,30 600,-10 1200,20 L1200,40 L0,40 Z"></path>
          </svg>
        </div>
      </section>

      <div className="container-x py-12 lg:py-16">
        {/* Certifications Banner */}
        <section className="rounded-3xl border border-border bg-cream p-6 shadow-soft">
          <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <ShieldCheck className="h-8 w-8 text-accent shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">FSSAI Certified</p>
                <p className="break-words font-display text-sm font-bold text-foreground">
                  Reg. {COMPANY_INFO.fssaiRegNo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start border-y sm:border-y-0 sm:border-x border-border/60 py-3 sm:py-0 sm:px-6">
              <Award className="h-8 w-8 text-accent shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  GSTIN Registered
                </p>
                <p className="break-words font-display text-sm font-bold text-foreground">
                  {COMPANY_INFO.gstin}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <Award className="h-8 w-8 text-accent shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">MSME Udyam Reg.</p>
                <p className="break-words font-display text-sm font-bold text-foreground">
                  {COMPANY_INFO.udyamRegNo}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mt-16">
          <SectionHeading eyebrow="Head to Head" title="How Utkarsh Organic Compares" />

          <div className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4">
            <table className="w-full min-w-[42rem] overflow-hidden rounded-2xl border border-border bg-background text-left shadow-soft sm:min-w-[720px] sm:rounded-3xl">
              <thead>
                <tr className="bg-forest text-forest-foreground text-sm font-display font-bold">
                  <th className="p-5 sm:p-6">Feature</th>
                  <th className="p-5 sm:p-6 bg-accent text-accent-foreground">
                    Utkarsh Organic Powders
                  </th>
                  <th className="p-5 sm:p-6">Conventional Spice Powders</th>
                  <th className="p-5 sm:p-6">Raw Fresh Produce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {[
                  [
                    "Preservatives & Additives",
                    "ZERO Chemicals / 100% Pure",
                    "Often contains anti-caking agents",
                    "None (may contain pesticides)",
                  ],
                  [
                    "Prep Time & Waste",
                    "Instant spoonful, ZERO waste",
                    "Instant",
                    "15-20 min peeling/chopping + 25% waste",
                  ],
                  ["Shelf Life", "12 - 18 Months", "6 - 12 Months", "5 - 10 Days before spoiling"],
                  [
                    "Flavour Consistency",
                    "100% Consistent year-round",
                    "Varies by batch",
                    "Fluctuates by season & water content",
                  ],
                  [
                    "Storage Requirement",
                    "Compact dry pantry shelf",
                    "Dry pantry",
                    "Bulky refrigerator storage needed",
                  ],
                ].map(([feature, organic, conv, raw], i) => (
                  <tr key={i} className="hover:bg-cream/50 transition">
                    <td className="p-5 font-bold font-display text-foreground">{feature}</td>
                    <td className="bg-secondary/30 p-5 font-semibold text-primary">
                      <span className="flex items-start gap-2">
                        <Check className="h-4 w-4 shrink-0 text-accent" /> {organic}
                      </span>
                    </td>
                    <td className="p-5 text-muted-foreground">{conv}</td>
                    <td className="p-5 text-muted-foreground">{raw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Value Pillars */}
        <section className="mt-20">
          <SectionHeading eyebrow="Core Value Pillars" title="Built for modern everyday cooking" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "100% Pure Produce",
                desc: "No maltodextrin, no starch, no artificial colors or added salt.",
              },
              {
                title: "Gentle Drying Tech",
                desc: "Dehydrated at controlled temperatures preserving 95% vital nutrients.",
              },
              {
                title: "Satara, Maharashtra Supplier",
                desc: "Grown in rich Western Ghats soil known for high essential oil content.",
              },
              {
                title: "Zero Kitchen Prep",
                desc: "No tearing eyes while chopping onions or sticky garlic fingers.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-cream p-6 shadow-soft"
              >
                <Leaf className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-display font-bold text-lg">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mt-20">
          <SectionHeading eyebrow="Got Questions?" title="Frequently Asked Questions" />

          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-background overflow-hidden shadow-soft transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-base text-foreground hover:text-accent transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-accent transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground border-t border-border/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
