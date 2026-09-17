import { Sprout } from "lucide-react";
import logo from "@/assets/logo.png";
import { usePageSeo } from "@/components/site/PageSeo";
import { getPageSeo } from "../../../shared/seo.js";

export default function ComingSoonPage() {
  usePageSeo({
    ...getPageSeo("/"),
    title: "Coming Soon | Utkarsh Organic Farm",
    description:
      "Something fresh is growing at Utkarsh Organic Farm. Our new website is coming soon. Check back soon!",
  });

  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-secondary text-primary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-leaf/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-beige blur-3xl"
      />

      <header className="flex justify-center px-6 pt-8 sm:pt-12">
        <img
          src={logo}
          alt="Utkarsh Organic Farm"
          className="h-24 w-40 object-contain sm:h-28 sm:w-48"
        />
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
        <div className="mb-8 flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]">
          <Sprout aria-hidden="true" className="h-4 w-4 text-leaf" />
          Something fresh is growing
        </div>

        <h1 className="font-display text-6xl font-extrabold leading-[1.05] tracking-tight sm:text-8xl lg:text-9xl">
          Coming <span className="text-leaf">Soon</span>
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
          We’re preparing something special, rooted in nature and grown with care.
          Our new website will be ready soon.
        </p>

        <div aria-hidden="true" className="my-9 h-px w-16 bg-primary/25" />
        <p className="text-sm font-medium tracking-wide text-earth">
          Thank you for your patience. Check back soon!
        </p>
      </main>

      <footer className="px-6 pb-8 text-center text-xs leading-relaxed text-muted-foreground sm:pb-10">
        © {new Date().getFullYear()} Utkarsh Organic Farm. All rights reserved.
      </footer>
    </div>
  );
}
