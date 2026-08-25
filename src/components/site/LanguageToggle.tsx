import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/lib/i18n";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी" },
  { value: "mr", label: "मराठी" },
];

export function LanguageToggle({ solid }: { solid: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.value === language) ?? options[0]!;

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div
      ref={menuRef}
      data-i18n-skip
      className="relative"
      aria-label="Change language"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`inline-flex h-10 min-w-28 items-center justify-between gap-2 rounded-full border px-3 text-sm font-extrabold shadow-sm backdrop-blur-md transition ${
          solid
            ? "border-border bg-secondary/80 text-foreground hover:bg-white"
            : "border-white/25 bg-white/12 text-white hover:bg-white/16"
        }`}
      >
        <span className="whitespace-nowrap">{current.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-2xl border border-border bg-white py-1 text-foreground shadow-xl">
          {options.map((option) => {
            const active = option.value === language;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setLanguage(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-bold transition ${
                  active ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                }`}
              >
                <span>{option.label}</span>
                {active ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
