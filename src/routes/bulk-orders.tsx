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
import { storeApi } from "@/lib/api";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await storeApi.bulkOrder({
        name: formData.contactPerson,
        businessName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        product: formData.requirements,
        quantity: formData.quantity,
        message: `Industry: ${formData.industry}\n${formData.requirements}`,
      });
      setSubmitted(true);
      toast.success("Bulk order inquiry received! Our B2B team will contact you within 4 hours.");
    } catch (error: any) {
      toast.error(error.message || "Bulk order inquiry could not be sent.");
    }
  };

  return (
    <main className="pt-16 lg:pt-20 bg-background">
      {/* Top Full Viewport Width Fresh Teal Breadcrumb Bar */}
      <div className="w-full bg-primary border-b border-green-500/20 py-3">
        <div className="container-x flex items-center justify-between text-xs sm:text-sm text-green-100 font-medium">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full bg-green-950/90 border border-green-300/40 text-green-200 hover:bg-earth hover:text-white transition"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-4 w-4 text-green-500/60" />
            <Link to="/" className="text-green-100 hover:text-beige transition font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-green-500/60" />
            <span className="font-bold text-beige">Bulk Order</span>
            <ChevronRight className="h-4 w-4 text-green-500/60" />
            <span className="text-green-200/90 font-medium">B2B &amp; Commercial Supply</span>
          </div>

          <div className="flex items-center gap-1.5 text-beige">
            <Leaf className="h-4.5 w-4.5 fill-earth/30 text-beige" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Hero Banner Section (Matching Uploaded Design Image media_1787121104332.png) */}
      {/* Desktop (1920): 300px | Laptop (1440): 250px | Tablet (768): 210px | Mobile (390): 160px */}
      <section className="relative flex min-h-[170px] w-full items-center overflow-hidden bg-gradient-to-r from-primary via-leaf to-earth text-white border-b border-green-500/20 shadow-md sm:h-[210px] md:h-[230px] lg:h-[260px] xl:h-[300px]">
        {/* Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-80 w-80 rounded-full bg-earth/15 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x relative z-10 flex w-full min-w-0 items-center justify-between gap-6">
          {/* Left Content */}
          <div className="min-w-0 max-w-2xl py-2 pr-2">
            {/* Top Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-earth/40 bg-green-950/80 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold text-beige tracking-wider">
              <Building2 className="h-3.5 w-3.5 text-beige" />
              <span>B2B &amp; COMMERCIAL SUPPLY</span>
              <Sparkles className="h-3 w-3 text-beige" />
            </div>

            {/* Headline */}
            <h1 className="mt-2 break-words font-serif text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Reliable{" "}
              <span className="relative inline-block text-beige">
                Bulk Dehydrated
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
              Powders for Food Enterprises
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-green-100/90 max-w-xl hidden sm:block">
              From 5kg catering buckets to multi-ton export shipments. Custom mesh sizes, moisture
              specs, and contract farming agreements.
            </p>
          </div>

          {/* Right Visual Image */}
          <div className="relative hidden shrink-0 items-center justify-end sm:flex">
            <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-green-950/40 p-2 backdrop-blur-md shadow-2xl">
              <img
                src={heroBulkOrders}
                alt="Bulk Organic Powders"
                className="h-32 w-52 rounded-xl bg-white/10 object-contain p-1 md:h-44 md:w-64 lg:h-52 lg:w-80 xl:h-60 xl:w-96"
              />
              <div className="absolute bottom-3 right-3 rounded-xl border border-earth/35 bg-green-950/90 px-3 py-1 text-xs font-bold text-beige shadow-lg backdrop-blur-md hidden sm:block">
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
            className="relative block w-full h-4 text-earth fill-current opacity-80"
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
            {
              icon: Building2,
              title: "HoReCa & Cloud Kitchens",
              desc: "Standardize gravy bases, save kitchen labor hours, and lower prep waste.",
            },
            {
              icon: Factory,
              title: "Food Manufacturers",
              desc: "Instant noodle masalas, snack seasoning blends, soup premixes & sauces.",
            },
            {
              icon: Globe,
              title: "Exporters & Wholesalers",
              desc: "US-FDA registered facilities with full phytosanitary documentation.",
            },
            {
              icon: PackageCheck,
              title: "Private Label Brands",
              desc: "Custom pouch filling, co-packing, and white label organic solutions.",
            },
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
            <SectionHeading
              align="left"
              eyebrow="B2B Assurance"
              title="Why Food Captains Trust Utkarsh Organic"
            />

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "Consistent Mesh & Moisture Control",
                  desc: "80-100 mesh fineness with <5% moisture content ensuring smooth flow without clumping.",
                },
                {
                  title: "Lab Tested Micro-Safety",
                  desc: "COA (Certificate of Analysis) provided for every single lot shipped.",
                },
                {
                  title: "Flexible Commercial Packing",
                  desc: "Available in 5kg foil pouches, 20kg corrugated boxes, and 50kg HDPE drums.",
                },
                {
                  title: "Dedicated Key Account Manager",
                  desc: "Direct phone access to production planners for emergency order dispatches.",
                },
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
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Request Sample Kit
              </p>
              <p className="mt-1 font-display font-bold text-base">
                Want to test our powders in your R&amp;D lab?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Official listings use 100 Kilogram MOQ; share your spec needs and volume for a
                current quote.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
            <h3 className="font-display text-2xl font-extrabold">Request Bulk Price Quote</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Fill in your specifications and receive wholesale rates within 4 hours.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-secondary/50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h4 className="mt-4 font-display text-xl font-bold">Inquiry Sent Successfully!</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Thank you! Our B2B commercial supply team will contact you shortly with custom
                  volume pricing.
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
                    <label className="block text-xs font-bold text-foreground">
                      Company / Brand Name
                    </label>
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
                    <label className="block text-xs font-bold text-foreground">
                      Contact Person
                    </label>
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
                    <label className="block text-xs font-bold text-foreground">
                      Monthly Requirement Volume
                    </label>
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
                  <label className="block text-xs font-bold text-foreground">
                    Specific Products &amp; Specs
                  </label>
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
