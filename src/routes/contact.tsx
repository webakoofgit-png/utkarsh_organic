import { Link } from "react-router-dom";
import {
  Award,
  ChevronRight,
  Clock,
  Home,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import heroContact from "@/assets/hero-contact.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { COMPANY_INFO } from "@/lib/products";
import { storeApi } from "@/lib/api";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await storeApi.contact(formData);
      setSubmitted(true);
      toast.success("Message sent! Utkarsh Organic Farm will respond shortly.");
    } catch (error: any) {
      toast.error(error.message || "Message could not be sent.");
    }
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
            <span className="font-bold text-emerald-400">Contact Us</span>
            <ChevronRight className="h-4 w-4 text-emerald-500/60" />
            <span className="text-emerald-200/90 font-medium">Get in Touch with Utkarsh Farm</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400">
            <Leaf className="h-4.5 w-4.5 fill-emerald-400/30 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 100% Full Viewport Width Professional Animated Hero Banner Section */}
      {/* Desktop (1920): 300px | Laptop (1440): 250px | Tablet (768): 210px | Mobile (390): 160px */}
      <section className="relative w-full overflow-hidden min-h-[140px] h-[160px] sm:h-[180px] md:h-[210px] lg:h-[250px] xl:h-[300px] flex items-center bg-gradient-to-r from-[#051f12] via-[#04170d] to-[#020e07] text-white border-b border-emerald-500/20 shadow-md">
        {/* Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Content Centered inside container-x */}
        <div className="container-x w-full relative z-10 flex items-center justify-between gap-6">
          {/* Left Content */}
          <div className="max-w-2xl py-2">
            {/* Top Eyebrow Marathi Banner */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold text-emerald-300 tracking-wider"
            >
              <Sprout className="h-3.5 w-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.marathiHeader}</span>
              <Sparkles className="h-3 w-3 text-emerald-400" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white"
            >
              Get in{" "}
              <span className="relative inline-block text-emerald-400">
                Touch with Us
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-emerald-400"
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
              </span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-emerald-100/90 max-w-xl hidden sm:block"
            >
              {COMPANY_INFO.marathiDescription}
            </motion.p>
          </div>

          {/* Right Visual Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative shrink-0 flex items-center justify-end"
          >
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-2 backdrop-blur-md shadow-2xl">
              <img
                src={heroContact}
                alt="Utkarsh Organic Farm Satara Unit"
                className="h-28 sm:h-36 md:h-44 lg:h-52 xl:h-60 w-40 sm:w-56 md:w-64 lg:w-80 xl:w-96 object-cover rounded-xl"
              />
              <div className="absolute bottom-3 right-3 rounded-xl border border-emerald-400/40 bg-emerald-950/90 px-3 py-1 text-xs font-bold text-emerald-300 shadow-lg backdrop-blur-md hidden sm:block">
                MIDC Satara Unit
              </div>
            </div>
          </motion.div>
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

      {/* Main Contact Grid & Form */}
      <div className="container-x py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact Details Card */}
          <Reveal className="space-y-8">
            <div className="rounded-3xl border border-border bg-forest p-8 text-forest-foreground shadow-lift">
              <span className="rounded-full bg-accent/20 px-3.5 py-1 text-[11px] font-bold text-accent uppercase tracking-wider">
                Direct Farm Unit
              </span>
              <h3 className="font-display text-2xl font-extrabold mt-3">{COMPANY_INFO.name}</h3>
              <p className="text-xs text-forest-foreground/80 mt-1">
                Contact Person: <strong className="text-accent">{COMPANY_INFO.contactPerson}</strong>
              </p>

              <div className="mt-8 space-y-5 text-sm">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Farm &amp; Factory Address</p>
                    <p className="text-xs text-forest-foreground/80 mt-1 leading-relaxed">
                      {COMPANY_INFO.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Direct Call &amp; Support</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">
                      {COMPANY_INFO.phoneSecondary ? `${COMPANY_INFO.phonePrimary} / ${COMPANY_INFO.phoneSecondary}` : COMPANY_INFO.phonePrimary}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Email Addresses</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">
                      {COMPANY_INFO.officialEmail ? `${COMPANY_INFO.email} / ${COMPANY_INFO.officialEmail}` : COMPANY_INFO.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">WhatsApp Direct Order</p>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.phonePrimary.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-accent hover:underline mt-1 block font-bold"
                    >
                      Click to Chat on WhatsApp ({COMPANY_INFO.phonePrimary}) &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Official Badges */}
              <div className="mt-8 pt-6 border-t border-forest-foreground/15 grid gap-2 text-xs text-forest-foreground/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                  <span>
                    <strong>FSSAI Reg. No:</strong> {COMPANY_INFO.fssaiRegNo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent shrink-0" />
                  <span>
                    <strong>GSTIN:</strong> {COMPANY_INFO.gstin}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent shrink-0" />
                  <span>
                    <strong>MSME Udyam:</strong> {COMPANY_INFO.udyamRegNo}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-border bg-cream p-8 shadow-soft">
              <h3 className="font-display text-2xl font-extrabold text-foreground">Send Us a Message</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Whether you have a product query, feedback, or retail bulk requirement, send us your message!
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl bg-secondary/60 p-6 text-center">
                  <ShieldCheck className="mx-auto h-12 w-12 text-accent" />
                  <h4 className="mt-4 font-display text-xl font-bold">Message Received!</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Thank you! Utkarsh Organic Farm will reply to your message shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aniket Patil"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-foreground">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aniket@example.com"
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98220 00000"
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-accent"
                    >
                      <option>General Inquiry</option>
                      <option>Product &amp; Usage Guidance</option>
                      <option>Retail Order Support</option>
                      <option>Bulk &amp; Commercial Supply</option>
                      <option>Distributor Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your query or message here..."
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
