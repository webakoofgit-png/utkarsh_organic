import { useLanguage, type Language } from "@/lib/i18n";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी" },
  { value: "mr", label: "मराठी" },
];

export function LanguageToggle({ solid }: { solid: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      data-i18n-skip
      className={`flex items-center gap-0.5 rounded-full border p-0.5 text-xs font-extrabold shadow-sm backdrop-blur-md ${
        solid
          ? "border-border bg-secondary/80 text-foreground"
          : "border-white/25 bg-white/12 text-white"
      }`}
      aria-label="Change language"
      title="Change language"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLanguage(option.value)}
          aria-pressed={language === option.value}
          className={`rounded-full px-2 py-1.5 transition ${
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
