import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Factory,
  Heart,
  Home,
  Leaf,
  Shield,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
  Users,
  Wheat,
} from "lucide-react";
import farm from "@/assets/farm.jpg";
import flatlay from "@/assets/flatlay.jpg";
import hero from "@/assets/hero-onion.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { COMPANY_INFO } from "@/lib/products";

export default function AboutPage() {
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
            <span className="font-bold text-emerald-400">About Us</span>
            <ChevronRight className="h-4 w-4 text-emerald-500/60" />
            <span className="text-emerald-200/90 font-medium">About Utkarsh Organic Farm</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400">
            <Leaf className="h-4.5 w-4.5 fill-emerald-400/30 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Hero Banner Section (Matching Uploaded Design Image media_1787120746684.png) */}
      {/* Desktop (1920): 200px | Laptop (1440): 180px | Tablet (768): 150px | Mobile (390): 115-140px */}
      <section className="relative w-full overflow-hidden min-h-[110px] h-[115px] sm:h-[140px] md:h-[150px] lg:h-[180px] xl:h-[200px] flex items-center bg-gradient-to-r from-[#051f12] via-[#04170d] to-[#020e07] text-white border-b border-emerald-500/20 shadow-md">
        {/* Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x w-full relative z-10 flex items-center justify-between gap-4">
          {/* Left Content */}
          <div className="max-w-2xl py-2">
            {/* Top Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-emerald-300 tracking-wider">
              <Leaf className="h-3 w-3 text-emerald-400" />
              <span>ABOUT US</span>
              <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
            </div>

            {/* Headline */}
            <h1 className="mt-1 font-serif text-sm sm:text-lg md:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white">
              Rooted in nature.{" "}
              <span className="relative inline-block text-emerald-400">
                Driven by purpose.
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
              Utkarsh Organic Farm was founded in Wai (Satara, Maharashtra) with a simple belief — that real food comes from real farms. We're here to make natural, clean, and honest ingredients accessible to every kitchen.
            </p>

            {/* 4 Feature Items Ribbon */}
            <div className="mt-2.5 hidden md:flex items-center gap-5 border-t border-emerald-500/20 pt-2">
              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <Leaf className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">Farm to You</p>
                  <p className="text-[9px] text-emerald-300/80">Direct from own farms</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">Pure &amp; Safe</p>
                  <p className="text-[9px] text-emerald-300/80">No preservatives</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <Sprout className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">Sustainable</p>
                  <p className="text-[9px] text-emerald-300/80">Good for nature</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">Trusted by Many</p>
                  <p className="text-[9px] text-emerald-300/80">Loved by thousands</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative shrink-0 flex items-center justify-end">
            <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-1.5 backdrop-blur-md shadow-xl">
              <img
                src={hero}
                alt="Utkarsh Organic Farm"
                className="h-20 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-32 sm:w-44 md:w-52 lg:w-60 xl:w-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-2 right-2 rounded-lg border border-emerald-400/40 bg-emerald-950/90 px-2 py-0.5 text-[9px] font-bold text-emerald-300 shadow-md backdrop-blur-md hidden sm:block">
                🌱 Wai (Satara) Farm
              </div>
            </div>
          </div>
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
      </section>

      {/* Leadership & Founders Section */}
      <section className="container-x py-20 lg:py-24">
        <SectionHeading
          eyebrow="Guided by Expertise"
          title="Meet Our Leadership Team"
          sub="Combining agricultural excellence with scientific nutrition for your family's health."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Founder 1 */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-border bg-cream p-8 text-center shadow-soft h-full flex flex-col items-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-forest text-accent">
                <Wheat className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-foreground">
                Prafulla Pradeep Chorge
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-accent mt-1">
                प्रफुल्ल प्रदीप चोरगे (कृषी तज्ञ - Agricultural Expert)
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Co-Founder leading organic farm cultivation, sustainable crop selection, and advanced low-temperature dehydration protocols at Wai (Satara).
              </p>
            </div>
          </Reveal>

          {/* Founder 2 */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-border bg-cream p-8 text-center shadow-soft h-full flex flex-col items-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-forest text-accent">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-foreground">
                Dr. Padmashree Prafulla Chorge
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-accent mt-1">
                डॉ. पद्मश्री प्रफुल्ल चोरगे (पोषण तज्ञ - Nutrition Expert)
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Co-Founder &amp; Nutritionist formulating our functional wellness line including Moringa Lemon Tea, Moringa Soup, Amla Powder, and nutrient-dense fruit powders.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product Philosophy */}
      <section className="bg-beige/40 py-20 lg:py-28 border-y border-border">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our Product Range"
              title="Fresh + Dehydrated Foods"
              sub="वापरायला अत्यंत सोपे: रेडी टू कूक (Ready to Cook) &amp; रेडी टू युज (Ready to Use)!"
            />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              At Utkarsh Organic Farm, we bridge fresh produce with modern daily convenience. Our zero-preservative processing preserves natural flavor, aroma, and essential vitamins for up to 18 months.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "ताजी फळे व भाजीपाला आणि Dehydrated प्रोसेसिंग प्रॉडक्ट (Fresh & Dehydrated Range)",
                "प्रीमियम दर्जाची सुकवलेली फळे आणि भाजीपाला (Premium Dried Veggies)",
                "विविध प्रकारची पोषण-युक्त फळ व भाजी पावडर (Fruit & Veg Powders)",
                "विशेष निवडक सुका मेवा आणि सुके मसाले (Dry Fruits & Whole Spices)",
                "रेडी टू कूक (Ready to Cook) Moringa Soup, Noodles & Mixed Veggies",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 font-semibold text-sm">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <img
              src={farm}
              alt="Utkarsh Organic Farm in Wai Satara"
              className="h-[420px] w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      {/* Enterprise Registration Info */}
      <section className="container-x py-20 lg:py-24">
        <SectionHeading
          eyebrow="Certified & Registered"
          title="Enterprise Registration & Licensing"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-6 shadow-soft text-center">
            <Award className="mx-auto h-8 w-8 text-accent" />
            <h4 className="mt-3 font-display text-lg font-bold">FSSAI License</h4>
            <p className="mt-1 text-xs font-extrabold text-primary">{COMPANY_INFO.fssaiRegNo}</p>
            <p className="mt-2 text-xs text-muted-foreground">Certified for food safety &amp; hygienic handling.</p>
          </div>

          <div className="rounded-3xl border border-border bg-background p-6 shadow-soft text-center">
            <Shield className="mx-auto h-8 w-8 text-accent" />
            <h4 className="mt-3 font-display text-lg font-bold">GSTIN Registration</h4>
            <p className="mt-1 text-xs font-extrabold text-primary">{COMPANY_INFO.gstin}</p>
            <p className="mt-2 text-xs text-muted-foreground">Issued by Govt of Maharashtra on 14/07/2026.</p>
          </div>

          <div className="rounded-3xl border border-border bg-background p-6 shadow-soft text-center">
            <Factory className="mx-auto h-8 w-8 text-accent" />
            <h4 className="mt-3 font-display text-lg font-bold">MSME Udyam Reg</h4>
            <p className="mt-1 text-xs font-extrabold text-primary">{COMPANY_INFO.udyamRegNo}</p>
            <p className="mt-2 text-xs text-muted-foreground">Registered agri-processing farm enterprise.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
