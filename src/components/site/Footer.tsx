import { Link } from "react-router-dom";
import {
  BadgeCheck,
  ExternalLink,
  GalleryHorizontal,
  HelpCircle,
  Home,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import logo from "@/assets/logo-mark.png";
import { COMPANY_INFO } from "@/lib/products";
import { WhatsAppIcon } from "./FloatingActions";

const quickLinks = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "About Us", to: "/about" },
  { icon: ShoppingBag, label: "Products", to: "/products" },
  { icon: Leaf, label: "Why Organic", to: "/why-organic" },
  { icon: GalleryHorizontal, label: "Farm Gallery", to: "/gallery" },
  { icon: Package, label: "Bulk Orders", to: "/bulk-orders" },
];

const helpLinks = [
  { icon: User, label: "My Account", to: "/account" },
  { icon: Package, label: "Track Order", to: "/track-order" },
  { icon: HelpCircle, label: "Contact Support", to: "/contact" },
  { icon: ShieldCheck, label: "Quality & Trust", to: "/why-organic" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-emerald-500/20 bg-[#03150b] text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      <div className="home-vine-lines pointer-events-none absolute inset-x-0 top-0 h-36 opacity-20" />

      <div className="container-x relative py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_0.9fr_1.25fr]">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-emerald-500/40 bg-white p-1 shadow-[0_0_18px_rgba(16,185,129,0.18)]">
                <img src={logo} alt="Utkarsh Organic Farm logo" className="h-full w-full object-contain" />
              </div>
              <span>
                <span className="block font-display text-2xl font-black uppercase leading-none">Utkarsh</span>
                <span className="mt-1 block text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-300">
                  Organic Farm
                </span>
              </span>
            </Link>

            <div>
              <p className="text-sm font-bold text-emerald-300">{COMPANY_INFO.marathiSlogan}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/72">
                {COMPANY_INFO.marathiDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-emerald-100">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5">FSSAI {COMPANY_INFO.fssaiRegNo}</span>
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5">GST {COMPANY_INFO.gstin}</span>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase text-emerald-300">
              <Leaf className="h-4 w-4" />
              Quick Links
            </h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/76">
              {quickLinks.map(({ icon: Icon, label, to }) => (
                <li key={label}>
                  <Link to={to} className="flex items-center gap-2.5 transition hover:translate-x-1 hover:text-emerald-300">
                    <Icon className="h-4 w-4 text-emerald-300" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase text-emerald-300">
              <BadgeCheck className="h-4 w-4" />
              Help
            </h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/76">
              {helpLinks.map(({ icon: Icon, label, to }) => (
                <li key={label}>
                  <Link to={to} className="flex items-center gap-2.5 transition hover:translate-x-1 hover:text-emerald-300">
                    <Icon className="h-4 w-4 text-emerald-300" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase text-emerald-300">
              <MessageCircle className="h-4 w-4" />
              Contact
            </h3>
            <div className="mt-5 grid gap-4 text-sm text-white/76">
              <p className="font-semibold text-white">{COMPANY_INFO.contactPerson}</p>
              <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-emerald-300">
                <Phone className="h-4 w-4 shrink-0 text-emerald-300" />
                <span>{COMPANY_INFO.phonePrimary}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2.5 break-all hover:text-emerald-300">
                <Mail className="h-4 w-4 shrink-0 text-emerald-300" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <p className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>{COMPANY_INFO.address.full}</span>
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-extrabold text-[#06230f] transition hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current" />
                  WhatsApp
                </a>
                <a
                  href={COMPANY_INFO.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 px-4 py-2 text-xs font-extrabold text-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-400/10"
                >
                  Website
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-500/20 bg-black/35 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-center text-xs text-white/70 md:flex-row md:text-left">
          <p>
            © {currentYear} UTKARSH ORGANIC FARM. All Rights Reserved. Developed by{" "}
            <a href="https://webakoof.com" target="_blank" rel="noreferrer" className="font-extrabold text-emerald-300 hover:underline">
              Webakoof
            </a>
          </p>
          <p className="font-semibold text-white/72">
            GSTIN {COMPANY_INFO.gstin} · FSSAI {COMPANY_INFO.fssaiRegNo} · Udyam {COMPANY_INFO.udyamRegNo}
          </p>
        </div>
      </div>
    </footer>
  );
}
