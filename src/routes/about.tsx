import { Link } from "react-router-dom";
import { ArrowRight, Award, CheckCircle2, Factory, Heart, Leaf, Shield, Sprout, Users } from "lucide-react";
import farm from "@/assets/farm.jpg";
import flatlay from "@/assets/flatlay.jpg";
import hero from "@/assets/hero-onion.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";

export default function AboutPage() {
  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero section */}
      <section className="relative isolate min-h-[480px] overflow-hidden bg-forest pt-16 text-forest-foreground lg:pt-24">
        <img src={hero} alt="Dehydrated organic onions farm" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/80 to-transparent" />
        <div className="container-x py-16 lg:py-24 max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-forest-foreground/25 bg-forest-foreground/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
              <Leaf className="h-3.5 w-3.5 text-accent" /> Our Story &amp; Purpose
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Bringing real, uncompromised soil goodness to modern kitchens.
            </h1>
            <p className="mt-6 text-lg text-forest-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Founded in Nashik, India's onion capital, Utkarsh Organic bridges smallholder farmers with home cooks and food enterprises worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Rooted in honesty"
              title="Why we started Utkarsh Organic"
              sub="Indian cooking relies heavily on fresh aromatics like onion, garlic, and ginger—yet prep time, seasonal price spikes, and food waste challenge households and food businesses alike."
            />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We realized that dehydration, when executed with scientific low-temperature drying, locks in the true volatile oils, taste, and nutrients of produce without needing a single artificial preservative or anti-caking chemical.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "100% Traceable direct farm sourcing",
                "Gentle low-heat solar & hot-air drying",
                "Zero chemical preservatives, additives or dyes",
                "US-FDA and FSSAI certified processing unit",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 font-semibold text-sm">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <img src={farm} alt="Our farm partnerships" className="rounded-3xl shadow-lift h-[460px] w-full object-cover" />
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-cream border border-border p-6 max-w-xs shadow-lift hidden sm:block">
                <p className="font-display text-3xl font-extrabold text-primary">500+</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Partner Farmers Supported</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-cream py-20 lg:py-28 border-y border-border">
        <div className="container-x">
          <SectionHeading eyebrow="What guides us" title="Pillars of Utkarsh Organic" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: "Sustainable Agriculture",
                desc: "We work directly with certified organic farmers who practice regenerative soil care, fair trade pricing, and zero pesticide usage.",
              },
              {
                icon: Factory,
                title: "Advanced Dehydration Tech",
                desc: "Our state-of-the-art facility uses precise heat-controlled drying technology that locks in 95%+ of natural aroma and micro-nutrients.",
              },
              {
                icon: Shield,
                title: "Uncompromising Quality",
                desc: "Every single batch undergoes rigorous lab testing for moisture, purity, mesh consistency, and microbial safety before packaging.",
              },
            ].map(({ icon: Icon, title, desc }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <div className="surface-card p-8 h-full">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="container-x py-20 lg:py-24 text-center">
        <div className="rounded-[2.5rem] bg-forest p-10 lg:p-16 text-forest-foreground">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Taste the difference in your kitchen.</h2>
          <p className="mt-4 text-forest-foreground/80 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of satisfied home cooks, cloud kitchens, and food manufacturers who rely on Utkarsh Organic daily.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="rounded-full bg-accent px-8 py-4 text-sm font-bold text-accent-foreground transition hover:scale-105">
              Explore Our Powders
            </Link>
            <Link to="/contact" className="rounded-full border border-forest-foreground/30 px-8 py-4 text-sm font-bold transition hover:bg-forest-foreground/10">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
