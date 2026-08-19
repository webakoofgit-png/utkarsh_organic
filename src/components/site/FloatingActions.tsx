import { MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/917507379018"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-110"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
