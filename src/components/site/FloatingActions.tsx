import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronUp, Facebook, Instagram, Plus, X } from "lucide-react";
import { COMPANY_INFO } from "@/lib/products";
import whatsappIcon from "@/assets/whatsapp-icon.png";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <img src={whatsappIcon} alt="WhatsApp" className={`${className} object-contain rounded-full`} />
  );
}

function SocialAction({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative grid h-11 w-11 place-items-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
    >
      <span
        className={`absolute -inset-1 rounded-full opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-80 ${className}`}
        aria-hidden="true"
      />
      <span
        className={`relative z-10 grid h-11 w-11 place-items-center rounded-full text-white sm:h-14 sm:w-14 ${className}`}
      >
        {children}
      </span>
      <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-green-300/30 bg-green-950 px-3 py-1.5 text-xs font-bold text-beige opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {label}
      </span>
    </a>
  );
}

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-[max(0.875rem,env(safe-area-inset-bottom))] right-3 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <>
          <SocialAction
            href={COMPANY_INFO.social.instagram}
            label="Follow us on Instagram"
            className="bg-[#E1306C]"
          >
            <Instagram className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.4} />
          </SocialAction>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative grid h-11 w-11 place-items-center rounded-full bg-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
          >
            {/* Ambient Glow & Pulse */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-md transition group-hover:bg-[#25D366]/60 animate-pulse" />

            {/* Real Official WhatsApp Icon Image */}
            <img
              src={whatsappIcon}
              alt="Chat on WhatsApp"
              className="relative z-10 h-11 w-11 rounded-full object-cover shadow-xl sm:h-14 sm:w-14"
            />

            {/* Hover Tooltip */}
            <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-green-300/30 bg-green-950 px-3 py-1.5 text-xs font-bold text-beige opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 sm:block">
              💬 Chat with Utkarsh Farm
            </span>
          </a>

          <SocialAction
            href={COMPANY_INFO.social.facebook}
            label="Follow us on Facebook"
            className="bg-[#1877F2]"
          >
            <Facebook className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" strokeWidth={1.8} />
          </SocialAction>
        </>
      ) : null}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="group relative grid h-8 w-8 place-items-center self-center rounded-full border border-green-200 bg-white text-forest shadow-xl transition-all duration-300 hover:scale-110 hover:bg-beige active:scale-95 sm:h-9 sm:w-9"
      >
        <ChevronUp className="h-5 w-5" />
        <span className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-green-300/30 bg-green-950 px-3 py-1.5 text-xs font-bold text-beige opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Back to top
        </span>
      </button>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close quick action bar" : "Open quick action bar"}
        aria-expanded={isOpen}
        title={isOpen ? "Close quick action bar" : "Open quick action bar"}
        className="group relative grid h-8 w-8 place-items-center self-center rounded-full border border-green-200 bg-forest text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary active:scale-95 sm:h-9 sm:w-9"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        <span className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-green-300/30 bg-green-950 px-3 py-1.5 text-xs font-bold text-beige opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 sm:block">
          {isOpen ? "Close quick links" : "Open quick links"}
        </span>
      </button>
    </div>
  );
}
