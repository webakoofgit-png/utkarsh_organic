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
    <main className="pt-20 lg:pt-24 bg-background">
      {/* Hero Banner Section (Matching Uploaded Design Image media_1787120055818.png) */}
      <section className="container-x pb-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#072415] via-[#041a0e] to-[#021008] text-white p-8 md:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Leaf Glow */}
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
            {/* Left Content */}
            <Reveal>
              {/* Top Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-1.5 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Leaf className="h-3.5 w-3.5 text-emerald-400" />
                <span>ABOUT US</span>
                <Sparkles className="h-3 w-3 text-emerald-400" />
              </div>

              {/* Headline */}
              <h1 className="mt-6 font-serif text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-white">
                Bringing real, <br />
                uncompromised <br />
                farm goodness to <br />
                <span className="relative inline-block text-emerald-400">
                  modern kitchens.
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

              {/* Subtext */}
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-emerald-100/85 sm:text-base">
                Founded at Wai (Satara, Maharashtra), Utkarsh Organic Farm brings 100% natural, hygienic dehydrated vegetables, fruit powders &amp; ready-to-cook functional foods from soil to spoon.
              </p>

              {/* 4 Feature Items */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-emerald-500/20 pt-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400 shadow-md">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">100% Natural</p>
                    <p className="text-[11px] text-emerald-300/80">No Chemicals</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400 shadow-md">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Pure &amp; Safe</p>
                    <p className="text-[11px] text-emerald-300/80">No Preservatives</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400 shadow-md">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Farm to You</p>
                    <p className="text-[11px] text-emerald-300/80">Direct from Farms</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400 shadow-md">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Trusted by Many</p>
                    <p className="text-[11px] text-emerald-300/80">Happy Customers</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Visual Image */}
            <Reveal delay={0.15} className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-3 backdrop-blur-md shadow-2xl">
                <img
                  src={hero}
                  alt="Utkarsh Organic Farm ingredients"
                  className="h-80 w-full rounded-2xl object-cover shadow-lg"
                />
                <div className="absolute bottom-6 right-6 rounded-2xl border border-emerald-400/40 bg-emerald-950/90 px-4 py-2 text-xs font-bold text-emerald-300 shadow-xl backdrop-blur-md">
                  🌱 Direct from Wai, Satara
                </div>
              </div>
            </Reveal>
          </div>
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
