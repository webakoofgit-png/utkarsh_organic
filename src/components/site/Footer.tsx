import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/logo-mark.png";

const quick = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Shop", to: "/shop" },
  { label: "Bulk Orders", to: "/bulk-orders" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

const support = [
  { label: "My Account", to: "/account" },
  { label: "Track Order", to: "/track-order" },
  { label: "Shipping", to: "/contact" },
  { label: "Returns", to: "/contact" },
  { label: "FAQ", to: "/why-organic" },
  { label: "Privacy Policy", to: "/contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Utkarsh Organic logo" width={44} height={44} loading="lazy" className="h-10 w-10" />
            <span className="font-display text-xl font-extrabold">Utkarsh Organic</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-forest-foreground/70">
            Naturally grown, carefully crafted organic and dehydrated food powders for home kitchens, restaurants and
            food manufacturers.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Utkarsh Organic social profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/20 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
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
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-forest-foreground/70">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> +91 98765 43210
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> hello@utkarshorganic.com
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Plot 14, Food Park Road, Nashik, Maharashtra 422003, India
            </li>
            <li>
              <a href="#" className="font-medium text-accent hover:underline">
                WhatsApp: +91 98765 43210
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-forest-foreground/60 sm:flex-row">
          <p>© 2026 Utkarsh Organic. All Rights Reserved.</p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span>Privacy Policy</span>
            <span aria-hidden>|</span>
            <span>Terms &amp; Conditions</span>
            <span aria-hidden>|</span>
            <span>Shipping Policy</span>
            <span aria-hidden>|</span>
            <span>Refund Policy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
