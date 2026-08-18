import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Leaf, ShieldAlert, Sparkles, Sprout, X } from "lucide-react";
import { useState } from "react";
import flatlay from "@/assets/flatlay.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";

export default function WhyOrganicPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does dehydration lose the nutritional value of onions or vegetables?",
      a: "No! Our gentle low-temperature drying process removes water content while conserving up to 95% of essential vitamins, minerals, dietary fiber, and natural aromatic oils.",
    },
    {
      q: "Are there any anti-caking agents or chemical preservatives added?",
      a: "Zero. Utkarsh Organic powders contain 100% single-ingredient dehydrated vegetables or spices. We rely on airtight foil packaging and moisture-controlled facilities to keep them free-flowing.",
    },
    {
      q: "How long is the shelf life of these powders?",
      a: "When stored in an airtight jar in a cool, dry pantry away from steam, our powders maintain prime freshness for 12 to 18 months without refrigeration.",
    },
    {
      q: "How does 1 tsp of onion powder compare to a fresh onion?",
      a: "Approximately 1 teaspoon (approx 5g) of Utkarsh Organic Onion Powder replaces one medium fresh onion (~80g fresh) in terms of flavor and aroma.",
    },
    {
      q: "Are your products certified organic?",
      a: "Yes, our partner farms and processing facilities follow strict organic standards with complete batch test reports available upon request.",
    },
  ];

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">The Pure Choice</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Why Switch to Dehydrated Organic Powders?
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Eliminate food waste, cut prep work in half, and nourish your family with 100% natural, chemical-free food powders.
          </p>
        </div>

        {/* Comparison Table */}
        <section className="mt-16">
          <SectionHeading eyebrow="Head to Head" title="How Utkarsh Organic Compares" />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-3xl overflow-hidden border border-border bg-background shadow-soft">
              <thead>
                <tr className="bg-forest text-forest-foreground text-sm font-display font-bold">
                  <th className="p-5 sm:p-6">Feature</th>
                  <th className="p-5 sm:p-6 bg-accent text-accent-foreground">Utkarsh Organic Powders</th>
                  <th className="p-5 sm:p-6">Conventional Spice Powders</th>
                  <th className="p-5 sm:p-6">Raw Fresh Produce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {[
                  ["Preservatives & Additives", "ZERO Chemicals / 100% Pure", "Often contains anti-caking agents", "None (may contain pesticides)"],
                  ["Prep Time & Waste", "Instant spoonful, ZERO waste", "Instant", "15-20 min peeling/chopping + 25% waste"],
                  ["Shelf Life", "12 - 18 Months", "6 - 12 Months", "5 - 10 Days before spoiling"],
                  ["Flavour Consistency", "100% Consistent year-round", "Varies by batch", "Fluctuates by season & water content"],
                  ["Storage Requirement", "Compact dry pantry shelf", "Dry pantry", "Bulky refrigerator storage needed"],
                ].map(([feature, organic, conv, raw], i) => (
                  <tr key={i} className="hover:bg-cream/50 transition">
                    <td className="p-5 font-bold font-display text-foreground">{feature}</td>
                    <td className="p-5 font-semibold text-primary bg-secondary/30 flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent shrink-0" /> {organic}
                    </td>
                    <td className="p-5 text-muted-foreground">{conv}</td>
                    <td className="p-5 text-muted-foreground">{raw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Highlight Grid */}
        <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "No Tears, No Prep", desc: "No more weeping while chopping onions. Get real onion aroma in seconds." },
            { title: "100% Pure Ingredients", desc: "Just single-origin organic vegetables dried and stone ground cleanly." },
            { title: "Saves Kitchen Budget", desc: "Zero spoilage loss. Pay only for edible concentrate, not water weight." },
            { title: "Vibrant Natural Tone", desc: "Retains deep natural colours of beetroots, carrots, and turmeric naturally." },
          ].map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="rounded-3xl border border-border bg-cream p-7 h-full">
                <Sparkles className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* FAQ Accordion */}
        <section className="mt-24 max-w-3xl mx-auto">
          <SectionHeading eyebrow="Got Questions?" title="Frequently Asked Questions" />

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="rounded-2xl border border-border bg-background overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left font-display text-base font-bold text-foreground hover:text-accent"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-accent" : "text-muted-foreground"}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:bg-forest transition"
          >
            Try Our Organic Powders Today <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
