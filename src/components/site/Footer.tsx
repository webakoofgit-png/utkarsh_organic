import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, Youtube } from "lucide-react";
import logo from "@/assets/logo-mark.png";
import { COMPANY_INFO } from "@/lib/products";

const quick = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Shop Catalogue", to: "/shop" },
  { label: "Bulk / Commercial Packs", to: "/bulk-orders" },
  { label: "Field Notes & Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
] as const;

const support = [
  { label: "My Account", to: "/account" },
  { label: "Track Order", to: "/track-order" },
  { label: "Shipping Policy", to: "/contact" },
  { label: "Return Policy", to: "/contact" },
  { label: "Why Organic & FAQ", to: "/why-organic" },
  { label: "Privacy Policy", to: "/contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Utkarsh Organic logo" width={44} height={44} loading="lazy" className="h-10 w-10" />
            <span className="font-display text-xl font-extrabold">{COMPANY_INFO.name}</span>
          </div>
          <p className="mt-4 text-xs font-semibold text-accent">{COMPANY_INFO.marathiHeader}</p>
          <p className="mt-2 text-xs text-forest-foreground/80 font-bold">{COMPANY_INFO.marathiSlogan}</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-forest-foreground/75">
            {COMPANY_INFO.marathiDescription}
          </p>

          <div className="mt-6 space-y-1.5 text-[11px] text-forest-foreground/70 border-t border-forest-foreground/15 pt-4">
            <p><span className="font-bold text-accent">FSSAI Reg. No:</span> {COMPANY_INFO.fssaiRegNo}</p>
            <p><span className="font-bold text-accent">GSTIN:</span> {COMPANY_INFO.gstin}</p>
            <p><span className="font-bold text-accent">UDYAM Reg:</span> {COMPANY_INFO.udyamRegNo}</p>
          </div>

          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Utkarsh Organic social profile"
                className="grid h-9 w-9 place-items-center rounded-full border border-forest-foreground/20 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-forest-foreground/90">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-forest-foreground/70">
            {quick.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-forest-foreground/90">
            Customer Support
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-forest-foreground/70">
            {support.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-forest-foreground/90">
            Contact &amp; Farm Unit
          </h3>
          <ul className="mt-5 space-y-3 text-xs text-forest-foreground/70">
            <li className="font-bold text-accent text-xs leading-snug">
              Prafulla Pradeep Chorge (Agri Expert)<br />
              Dr. Padmashree P. Chorge (Nutritionist)
            </li>
            <li className="flex gap-2.5 pt-1">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{COMPANY_INFO.phonePrimary} / {COMPANY_INFO.phoneSecondary}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{COMPANY_INFO.email}</span>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{COMPANY_INFO.address.full}</span>
            </li>
            <li className="pt-2">
              <a href={`https://wa.me/${COMPANY_INFO.phonePrimary.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline text-xs">
                WhatsApp: {COMPANY_INFO.phonePrimary}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-forest-foreground/60 sm:flex-row">
          <p>© 2026 {COMPANY_INFO.name}. All Rights Reserved.</p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span>FSSAI License # {COMPANY_INFO.fssaiRegNo}</span>
            <span aria-hidden>|</span>
            <span>GSTIN {COMPANY_INFO.gstin}</span>
            <span aria-hidden>|</span>
            <span>Udyam {COMPANY_INFO.udyamRegNo}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
