import { COMPANY_INFO } from "@/lib/products";

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.71-.514-5.267-1.41l-.378-.222-3.914 1.026 1.044-3.815-.247-.393c-.985-1.564-1.506-3.376-1.506-5.236 0-5.426 4.413-9.839 9.839-9.839 2.628 0 5.098 1.023 6.956 2.882 1.859 1.859 2.882 4.329 2.882 6.957 0 5.426-4.413 9.839-9.839 9.839m0-18.067c-4.537 0-8.228 3.69-8.228 8.228 0 1.765.56 3.401 1.517 4.743l-.646 2.36 2.42-.634c1.296.868 2.846 1.363 4.537 1.363 4.537 0 8.228-3.69 8.228-8.228 0-4.538-3.691-8.228-8.228-8.228" />
    </svg>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale-95"
      >
        {/* Ambient Glow & Pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-md transition group-hover:bg-[#25D366]/60 animate-pulse" />

        {/* Real WhatsApp Icon */}
        <WhatsAppIcon className="relative z-10 h-7 w-7 fill-current text-white" />

        {/* Hover Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-emerald-950 px-3 py-1.5 text-xs font-bold text-emerald-300 shadow-xl border border-emerald-500/30 opacity-0 transition-all duration-200 group-hover:opacity-100 pointer-events-none">
          💬 Chat with Utkarsh Farm
        </span>
      </a>
    </div>
  );
}
