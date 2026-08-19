import { Link } from "react-router-dom";
import { ArrowRight, Award, CheckCircle2, Factory, Heart, Leaf, Shield, Sprout, Users, UserCheck, Stethoscope, Wheat } from "lucide-react";
import farm from "@/assets/farm.jpg";
import flatlay from "@/assets/flatlay.jpg";
import hero from "@/assets/hero-onion.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { COMPANY_INFO } from "@/lib/products";

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
              <Leaf className="h-3.5 w-3.5 text-accent" /> {COMPANY_INFO.marathiHeader}
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Bringing real, uncompromised farm goodness to modern kitchens.
            </h1>
            <p className="mt-6 text-lg text-forest-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Founded at Wai (Satara, Maharashtra), Utkarsh Organic Farm brings 100% natural, hygienic dehydrated vegetables, fruit powders &amp; ready-to-cook functional foods from soil to spoon.
            </p>
          </Reveal>
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

          <Reveal delay={0.15}>
            <div className="relative">
              <img src={farm} alt="Our farm partnerships in Wai Satara" className="rounded-3xl shadow-lift h-[460px] w-full object-cover" />
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-cream border border-border p-6 max-w-xs shadow-lift hidden sm:block">
                <p className="font-display text-2xl font-extrabold text-primary">Wai, Satara</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">ताजा, सकस, नैसर्गिक</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What guides us" title="Pillars of Utkarsh Organic Farm" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: "Naturally Cultivated",
                desc: "Pesticide-free vegetables harvested fresh at Lohare / Gangapuri farms in Wai, Satara district.",
              },
              {
                icon: Factory,
                title: "Hygienic Dehydration",
                desc: "Low-temperature processing preserves 95%+ of natural nutrients, taste, and vibrant natural colours.",
              },
              {
                icon: Shield,
                title: "Certified & Lab Tested",
                desc: `Compliant with FSSAI (Reg. ${COMPANY_INFO.fssaiRegNo}) and Udyam standards with zero chemical additives.`,
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
            Join thousands of satisfied home cooks, cloud kitchens, and health-conscious families who rely on Utkarsh Organic Farm daily.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="rounded-full bg-accent px-8 py-4 text-sm font-bold text-accent-foreground transition hover:scale-105">
              Explore Our Powders
            </Link>
            <Link to="/contact" className="rounded-full border border-forest-foreground/30 px-8 py-4 text-sm font-bold transition hover:bg-forest-foreground/10">
              Get in Touch ({COMPANY_INFO.phonePrimary})
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
