import { Link } from "react-router-dom";
import {
  Facebook,
  FileText,
  HelpCircle,
  Home,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  Users,
  Youtube,
} from "lucide-react";
import logo from "@/assets/logo-mark.png";
import { COMPANY_INFO } from "@/lib/products";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#051f12] via-[#04170d] to-[#020e07] text-emerald-100 font-sans border-t border-emerald-500/20">
      {/* Top Decorative Organic Wave Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      {/* Main Footer Container */}
      <div className="container-x relative pt-16 pb-12 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Overview */}
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

            {/* Social Follow Icons */}
            <div className="flex gap-3 pt-2">
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
                  className="grid h-9 w-9 place-items-center rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-300 transition-all hover:scale-110 hover:border-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
      </div>

      {/* Bottom Bar (Copyright, Webakoof Credit, FSSAI) */}
      <div className="border-t border-emerald-500/20 bg-black/40 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-xs text-emerald-300/70 md:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-400 shrink-0" />
            <p>
              © 2026 UTKARSH ORGANIC FARM. All Rights Reserved. | Developed by{" "}
              <a
                href="https://webakoof.com"
                target="_blank"
                rel="noreferrer"
                className="font-extrabold text-emerald-400 hover:underline hover:text-emerald-300 transition"
              >
                webakoof.com
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-emerald-300/90 font-medium">
            <span>FSSAI License # 21526039003217</span>
            <span className="text-emerald-500/40">|</span>
            <span>GSTIN 27CKXPB5409F1ZZ</span>
            <span className="text-emerald-500/40">|</span>
            <span>Udyam UDYAM-MH-30-0197446</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
