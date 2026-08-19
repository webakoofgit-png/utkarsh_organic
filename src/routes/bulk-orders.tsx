import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  Globe,
  Home,
  Leaf,
  PackageCheck,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tractor,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import farm from "@/assets/farm.jpg";
import heroBulkOrders from "@/assets/hero-bulk-orders.jpg";
import flatlay from "@/assets/flatlay.jpg";
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
            <span className="font-bold text-emerald-400">Bulk Order</span>
            <ChevronRight className="h-4 w-4 text-emerald-500/60" />
            <span className="text-emerald-200/90 font-medium">B2B &amp; Commercial Supply</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400">
            <Leaf className="h-4.5 w-4.5 fill-emerald-400/30 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Hero Banner Section (Matching Uploaded Design Image media_1787121104332.png) */}
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
              <Building2 className="h-3 w-3 text-emerald-400" />
              <span>B2B &amp; COMMERCIAL SUPPLY</span>
              <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
            </div>

            {/* Headline */}
            <h1 className="mt-1 font-serif text-sm sm:text-lg md:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white">
              Reliable{" "}
              <span className="relative inline-block text-emerald-400">
                Bulk Dehydrated
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
              </span>{" "}
              Powders for Food Enterprises
            </h1>

            {/* Subtitle */}
            <p className="mt-1 text-[10px] sm:text-xs leading-snug text-emerald-100/85 line-clamp-1 sm:line-clamp-2 max-w-lg hidden sm:block">
              From 5kg catering buckets to multi-ton export shipments. Custom mesh sizes, moisture specs, and contract farming agreements.
            </p>

            {/* 3 Mini Feature Badges Ribbon */}
            <div className="mt-2.5 hidden md:flex items-center gap-5 border-t border-emerald-500/20 pt-2">
              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <Building2 className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">HoReCa &amp; Kitchens</p>
                  <p className="text-[9px] text-emerald-300/80">Catering Buckets</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <Factory className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">Food Manufacturers</p>
                  <p className="text-[9px] text-emerald-300/80">Industrial Mesh Specs</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-emerald-400">
                  <Globe className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold text-white">Exporters &amp; Wholesalers</p>
                  <p className="text-[9px] text-emerald-300/80">FSSAI &amp; Export Ready</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative shrink-0 flex items-center justify-end">
            <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-1.5 backdrop-blur-md shadow-xl">
              <img
                src={heroBulkOrders}
                alt="Bulk Organic Powders"
                className="h-20 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-32 sm:w-44 md:w-52 lg:w-60 xl:w-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-2 right-2 rounded-lg border border-emerald-400/40 bg-emerald-950/90 px-2 py-0.5 text-[9px] font-bold text-emerald-300 shadow-md backdrop-blur-md hidden sm:block">
                📦 Bulk 5kg - 500kg+
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

      {/* Target Industries */}
      <section className="container-x py-16 lg:py-24">
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
              <div className="mt-8 rounded-2xl bg-secondary/50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h4 className="mt-4 font-display text-xl font-bold">Inquiry Sent Successfully!</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Thank you! Our B2B commercial supply team will contact you shortly with custom volume pricing.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-foreground">Company / Brand Name</label>
                    <input
                      required
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Spice Craft Foods"
                      className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground">Contact Person</label>
                    <input
                      required
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-foreground">Work Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@brand.com"
                      className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98220 00000"
                      className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-foreground">Industry Type</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                    >
                      <option>Restaurant / Cloud Kitchen</option>
                      <option>Food Manufacturing Plant</option>
                      <option>Wholesale &amp; Spice Trader</option>
                      <option>Exporter</option>
                      <option>Private Label Brand</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground">Monthly Requirement Volume</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                    >
                      <option>25kg - 100kg</option>
                      <option>100kg - 500kg</option>
                      <option>500kg - 2 Tons</option>
                      <option>2 Tons+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground">Specific Products &amp; Specs</label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="e.g. Require 200kg Onion Powder (80 mesh) + 50kg Moringa Powder..."
                    className="mt-1.5 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-xs outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                >
                  <Send className="h-4 w-4" /> Submit Commercial Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
