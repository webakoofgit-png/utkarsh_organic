import { COMPANY_INFO } from "@/lib/products";
import whatsappIcon from "@/assets/whatsapp-icon.png";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <img src={whatsappIcon} alt="WhatsApp" className={`${className} object-contain rounded-full`} />
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-12 w-12 place-items-center rounded-full bg-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
      >
        {/* Ambient Glow & Pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-md transition group-hover:bg-[#25D366]/60 animate-pulse" />

        {/* Real Official WhatsApp Icon Image */}
        <img
          src={whatsappIcon}
          alt="Chat on WhatsApp"
          className="relative z-10 h-12 w-12 rounded-full object-cover shadow-xl sm:h-14 sm:w-14"
        />

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-green-300/30 bg-green-950 px-3 py-1.5 text-xs font-bold text-beige opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 sm:block">
          💬 Chat with Utkarsh Farm
        </span>
      </a>
    </div>
  );
}
