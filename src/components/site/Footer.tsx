import { Link } from "react-router-dom";
import {
  ArrowUp,
  Award,
  CheckCircle2,
  ChevronRight,
  Facebook,
  FileText,
  FlaskConical,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Home,
  Instagram,
  Leaf,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Sprout,
  Truck,
  User,
  Users,
  Youtube,
} from "lucide-react";
import logo from "@/assets/logo-mark.png";
import { COMPANY_INFO } from "@/lib/products";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    toast.success("Thank you for subscribing to Utkarsh Organic Farm updates!");
    setEmailInput("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#051f12] via-[#04170d] to-[#020e07] text-emerald-100 font-sans border-t border-emerald-500/20">
      {/* Top Decorative Organic Wave Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      {/* Main Footer Container */}
      <div className="container-x relative pt-16 pb-12 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Features */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-950/80 border border-emerald-500/40 p-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <img src={logo} alt="Utkarsh Organic logo" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black tracking-tight text-white uppercase leading-none">
                  UTKARSH
                </h2>
                <p className="font-display text-xs font-extrabold tracking-widest text-emerald-400 uppercase mt-0.5">
                  ORGANIC FARM
                </p>
              </div>
            </div>

            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 leading-snug">
              🌱 शेतापासून थेट तुमच्या स्वयंपाकघरापर्यंत! 🌱
            </p>

            <p className="text-xs leading-relaxed text-emerald-200/80 max-w-xs">
              ताजा, सकस, नैसर्गिक – विषमुक्त आणि आरोग्याची Dehydrated Vegetables &amp; Powders आता उपलब्ध. १००% नैसर्गिक, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने!
            </p>

            {/* 3 Circular Feature Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                  <Leaf className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-200 leading-tight">100%<br />Organic</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                  <FlaskConical className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-200 leading-tight">No<br />Preservatives</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                  <Sprout className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-200 leading-tight">Farm<br />to Home</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-emerald-500/20">
              <Leaf className="h-4 w-4 text-emerald-400" /> QUICK LINKS
            </h3>
            <ul className="mt-5 space-y-3 text-xs text-emerald-200/90">
              {[
                { icon: Home, label: "Home", to: "/" },
                { icon: Users, label: "About Us", to: "/about" },
                { icon: ShoppingCart, label: "Shop Catalogue", to: "/shop" },
                { icon: ShoppingBag, label: "Bulk / Commercial Packs", to: "/bulk-orders" },
                { icon: FileText, label: "Field Notes & Blog", to: "/blog" },
                { icon: Phone, label: "Contact Us", to: "/contact" },
              ].map(({ icon: Icon, label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-2.5 transition-colors hover:text-emerald-400 hover:translate-x-1 duration-200"
                  >
                    <Icon className="h-4 w-4 text-emerald-400/70" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-emerald-500/20">
              <Leaf className="h-4 w-4 text-emerald-400" /> CUSTOMER SUPPORT
            </h3>
            <ul className="mt-5 space-y-3 text-xs text-emerald-200/90">
              {[
                { icon: User, label: "My Account", to: "/account" },
                { icon: Package, label: "Track Order", to: "/track-order" },
                { icon: Truck, label: "Shipping Policy", to: "/contact" },
                { icon: RotateCcw, label: "Return Policy", to: "/contact" },
                { icon: HelpCircle, label: "Why Organic & FAQ", to: "/why-organic" },
                { icon: ShieldCheck, label: "Privacy Policy", to: "/contact" },
              ].map(({ icon: Icon, label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-2.5 transition-colors hover:text-emerald-400 hover:translate-x-1 duration-200"
                  >
                    <Icon className="h-4 w-4 text-emerald-400/70" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Farm Unit */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-emerald-500/20">
              <Leaf className="h-4 w-4 text-emerald-400" /> CONTACT &amp; FARM UNIT
            </h3>
            <div className="mt-5 space-y-3 text-xs text-emerald-200/90">
              <div className="leading-snug">
                <p className="font-semibold text-emerald-300">Prafulla Pradeep Chorge (Agri Expert)</p>
                <p className="font-bold text-emerald-400 mt-0.5">Dr. Padmashree P. Chorge (Nutritionist)</p>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-emerald-200">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+91 7507379018 / +91 8830150923</span>
              </div>

              <div className="flex items-center gap-2.5 text-emerald-200">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>hello@utkarshorganic.com</span>
              </div>

              <div className="flex items-start gap-2.5 text-emerald-200">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  House No. 262, Lohare, Menwali Road, Gangapuri, Wai, District Satara, Maharashtra 412803
                </span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/917507379018`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                  <span>WhatsApp: +91 7507379018</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Feature Highlights Bar (Glassmorphism Card) */}
        <div className="mt-12 rounded-2xl border border-emerald-500/25 bg-emerald-950/40 p-4 md:p-5 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:divide-x md:divide-emerald-500/20">
            {[
              { icon: Truck, title: "Fast & Safe", sub: "Delivery" },
              { icon: Lock, title: "Secure", sub: "Payments" },
              { icon: Award, title: "Premium", sub: "Quality" },
              { icon: RotateCcw, title: "Easy", sub: "Returns" },
              { icon: Headphones, title: "Dedicated", sub: "Support" },
            ].map(({ icon: Icon, title, sub }, idx) => (
              <div
                key={title}
                className={`flex items-center justify-center gap-3 ${idx !== 0 ? "md:pl-4" : ""}`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-900/40 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-white">{title}</p>
                  <p className="text-[11px] text-emerald-300/80">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter & Follow Bar */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-center">
          {/* Social Follow Icons */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Follow Us
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Youtube, href: "https://youtube.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-300 transition-all hover:scale-110 hover:border-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/50 p-5 md:p-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-base font-extrabold text-white flex items-center gap-2">
                Stay Healthy, Stay Updated! 🌱
              </p>
              <p className="text-xs text-emerald-200/80 mt-1">
                Subscribe to get special offers, new product updates &amp; farming tips.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="h-11 w-full md:w-64 rounded-xl border border-emerald-500/30 bg-black/40 px-4 text-xs text-white placeholder-emerald-400/50 outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="h-11 shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 text-xs font-bold text-black shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 transition"
              >
                <span>Subscribe</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Copyright, FSSAI, Back to Top) */}
      <div className="border-t border-emerald-500/20 bg-black/40 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-xs text-emerald-300/70 md:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-400 shrink-0" />
            <p>© 2026 UTKARSH ORGANIC FARM. All Rights Reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-emerald-300/90 font-medium">
            <span>FSSAI License # 21526039003217</span>
            <span className="text-emerald-500/40">|</span>
            <span>GSTIN 27CKXPB5409F1ZZ</span>
            <span className="text-emerald-500/40">|</span>
            <span>Udyam UDYAM-MH-30-0197446</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition duration-200"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
