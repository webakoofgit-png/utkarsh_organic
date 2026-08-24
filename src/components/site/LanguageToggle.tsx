import { Languages } from "lucide-react";
import { useLanguage, type Language } from "@/lib/i18n";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "mr", label: "मर" },
];

export function LanguageToggle({ solid }: { solid: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      data-i18n-skip
      className={`flex items-center rounded-full border p-0.5 text-xs font-extrabold shadow-sm backdrop-blur-md ${
        solid ? "border-border bg-secondary/80 text-foreground" : "border-white/25 bg-white/12 text-white"
      }`}
      aria-label="Change language"
      title="Change language"
    >
      <Languages className={`ml-2 h-3.5 w-3.5 ${solid ? "text-primary" : "text-lime-200"}`} aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLanguage(option.value)}
          aria-pressed={language === option.value}
          className={`ml-1 rounded-full px-2.5 py-1.5 transition ${
            language === option.value
              ? solid
                ? "bg-primary text-primary-foreground"
                : "bg-white text-primary"
              : solid
                ? "text-foreground/70 hover:bg-white"
                : "text-white/82 hover:bg-white/14"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
