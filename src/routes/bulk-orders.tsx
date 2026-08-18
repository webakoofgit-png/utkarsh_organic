import { Building2, CheckCircle2, Factory, Globe, PackageCheck, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import farm from "@/assets/farm.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";

export default function BulkOrdersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "Restaurant / Cloud Kitchen",
    quantity: "25kg - 100kg",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Bulk order inquiry received! Our B2B team will contact you within 4 hours.");
  };

  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative isolate bg-forest py-20 text-forest-foreground lg:py-28">
        <div className="container-x max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-forest-foreground/25 bg-forest-foreground/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            <Building2 className="h-3.5 w-3.5 text-accent" /> B2B &amp; Commercial Supply
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Reliable Bulk Dehydrated Powders for Food Enterprises
          </h1>
          <p className="mt-6 text-lg text-forest-foreground/80 leading-relaxed max-w-2xl mx-auto">
            From 5kg catering buckets to multi-ton export shipments. Custom mesh sizes, moisture specs, and contract farming agreements.
          </p>
        </div>
      </section>

      {/* Target Industries */}
      <section className="container-x py-20 lg:py-24">
        <SectionHeading eyebrow="Who We Serve" title="Tailored Packaging &amp; Volume Pricing" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Building2, title: "HoReCa & Cloud Kitchens", desc: "Standardize gravy bases, save kitchen labor hours, and lower prep waste." },
            { icon: Factory, title: "Food Manufacturers", desc: "Instant noodle masalas, snack seasoning blends, soup premixes & sauces." },
            { icon: Globe, title: "Exporters & Wholesalers", desc: "US-FDA registered facilities with full phytosanitary documentation." },
            { icon: PackageCheck, title: "Private Label Brands", desc: "Custom pouch filling, co-packing, and white label organic solutions." },
          ].map(({ icon: Icon, title, desc }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="surface-card p-7 h-full">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form & Specs Section */}
      <section className="bg-cream py-20 border-y border-border">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          {/* Left information */}
          <div>
            <SectionHeading align="left" eyebrow="B2B Assurance" title="Why Food Captains Trust Utkarsh Organic" />

            <div className="mt-8 space-y-6">
              {[
                { title: "Consistent Mesh & Moisture Control", desc: "80-100 mesh fineness with <5% moisture content ensuring smooth flow without clumping." },
                { title: "Lab Tested Micro-Safety", desc: "COA (Certificate of Analysis) provided for every single lot shipped." },
                { title: "Flexible Commercial Packing", desc: "Available in 5kg foil pouches, 20kg corrugated boxes, and 50kg HDPE drums." },
                { title: "Dedicated Key Account Manager", desc: "Direct phone access to production planners for emergency order dispatches." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display font-bold text-base">{title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-background p-6 border border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Request Sample Kit</p>
              <p className="mt-1 font-display font-bold text-base">Want to test our powders in your R&amp;D lab?</p>
              <p className="mt-1 text-xs text-muted-foreground">We ship 100g sample kits directly to registered food businesses across India.</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
            <h3 className="font-display text-2xl font-extrabold">Request Bulk Price Quote</h3>
            <p className="mt-1 text-xs text-muted-foreground">Fill in your specifications and receive wholesale rates within 4 hours.</p>

            {submitted ? (
              <div className="mt-8 py-12 text-center rounded-2xl bg-cream border border-border">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                <h4 className="mt-4 font-display text-xl font-bold">Inquiry Sent Successfully!</h4>
                <p className="mt-2 text-xs text-muted-foreground max-w-sm mx-auto">
                  Thank you, <span className="font-bold text-foreground">{formData.contactPerson}</span>. Our corporate sales team has received your request for <span className="font-bold text-foreground">{formData.companyName}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-secondary px-6 py-2.5 text-xs font-bold text-foreground"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Spice Kraft Foods Ltd."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Verma"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@spicekraft.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry Category</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                    >
                      <option>Restaurant / Cloud Kitchen</option>
                      <option>Food Manufacturer</option>
                      <option>Seasoning / Spice Blender</option>
                      <option>Exporter / Overseas Buyer</option>
                      <option>Retail &amp; Supermarket Brand</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Requirement</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                    >
                      <option>25kg - 100kg</option>
                      <option>100kg - 500kg</option>
                      <option>500kg - 2 Metric Tons</option>
                      <option>2+ Metric Tons (Export Container)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Specific Products &amp; Mesh Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need 200kg Organic Onion Powder (80 mesh) + 50kg Garlic Powder per month"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-sm outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-forest transition"
                >
                  <Send className="h-4 w-4" /> Submit Quote Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
