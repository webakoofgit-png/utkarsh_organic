import { Link } from "react-router-dom";
import { ChevronRight, FileText, Home, Leaf, Mail, Scale, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/lib/products";

const termsSections = [
  {
    title: "Use Of This Website",
    body: [
      "By accessing this website, browsing products, placing an order, creating an account, or sending an inquiry, you agree to these Terms & Conditions.",
      "You agree to provide accurate information and to use the website only for lawful personal, retail, wholesale, or business purchase inquiries related to our products and services.",
    ],
  },
  {
    title: "Products And Availability",
    body: [
      "Product images, prices, descriptions, pack sizes, minimum order quantities, specifications, and availability may change without prior notice. Images are for reference and presentation; actual packaging, batch details, shade, particle size, or form may vary.",
      "For bulk orders, final pricing, lead time, dispatch terms, payment terms, and specifications are confirmed only after quotation and acceptance by Utkarsh Organic Farm.",
    ],
  },
  {
    title: "Orders And Payments",
    body: [
      "Orders are accepted subject to product availability, serviceable delivery location, successful payment or agreed business terms, and verification of customer details where required.",
      "Utkarsh Organic Farm may cancel, refuse, or limit any order if information appears inaccurate, payment is not completed, stock is unavailable, or misuse of the website is suspected.",
    ],
  },
  {
    title: "Shipping And Delivery",
    body: [
      "Delivery timelines are estimates and may vary because of product readiness, courier availability, weather, route conditions, holidays, address accuracy, or events beyond our control.",
      "Customers should inspect delivered goods promptly and report missing, damaged, or incorrect items with order details and supporting photos as soon as possible.",
    ],
  },
  {
    title: "Returns, Replacements And Refunds",
    body: [
      "Food products are handled with care and may have limited return eligibility. Return, replacement, or refund requests are reviewed based on product condition, order type, complaint timing, supporting evidence, and applicable law.",
      "Opened, used, improperly stored, or customer-damaged products may not be eligible for return or replacement unless required by applicable law.",
    ],
  },
  {
    title: "Customer Responsibilities",
    body: [
      "Customers are responsible for checking product suitability, ingredient details, storage instructions, usage quantities, shipping address, and billing information before placing an order.",
      "Products should be stored in a cool, dry, airtight place away from moisture and direct sunlight, unless the product label or confirmed specification says otherwise.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "The website content, brand name, product presentation, images, text, graphics, and layout are owned by or licensed to Utkarsh Organic Farm and may not be copied, republished, or used commercially without written permission.",
    ],
  },
  {
    title: "Limitation Of Liability",
    body: [
      "To the maximum extent permitted by applicable law, Utkarsh Organic Farm is not liable for indirect, incidental, special, or consequential losses arising from website use, delivery delays, product unavailability, or customer misuse of products.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <main className="bg-background pt-16 lg:pt-20">
      <div className="w-full border-b border-green-500/20 bg-primary py-3">
        <div className="container-x flex items-center justify-between gap-3 text-xs font-medium text-green-100 sm:text-sm">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full border border-green-300/40 bg-green-950/90 text-green-200 transition hover:bg-earth hover:text-white"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <Link to="/" className="font-medium text-green-100 transition hover:text-beige">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <span className="font-bold text-beige">Terms &amp; Conditions</span>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 text-beige sm:flex">
            <Leaf className="h-4.5 w-4.5 fill-earth/30 text-beige" />
          </div>
        </div>
      </div>

      <section className="relative flex min-h-[170px] w-full items-center overflow-hidden border-b border-green-500/20 bg-gradient-to-r from-primary via-leaf to-earth text-white shadow-md sm:h-[210px] md:h-[230px] lg:h-[260px] xl:h-[300px]">
        <div className="pointer-events-none absolute right-1/3 top-0 h-80 w-80 rounded-full bg-earth/15 blur-3xl" />
        <div className="container-x relative z-10 py-6 sm:py-0">
          <div className="max-w-3xl">
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-earth/40 bg-green-950/80 px-3 py-1 text-[10px] font-extrabold tracking-wider text-beige sm:px-3.5 sm:text-xs">
              <FileText className="h-3.5 w-3.5 text-beige" />
              <span>TERMS &amp; CONDITIONS</span>
              <Sparkles className="h-3 w-3 text-beige" />
            </div>
            <h1 className="mt-3 break-words font-serif text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-green-100/90 md:text-base">
              Terms for using {COMPANY_INFO.tradeName}'s website, placing orders, requesting bulk
              quotations, and communicating with our team.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="relative block h-4 w-full fill-current text-earth opacity-80"
          >
            <path d="M0,0 C300,30 600,-10 1200,20 L1200,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      <section className="container-x py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)]">
          <aside className="h-fit rounded-3xl border border-border bg-cream p-6 shadow-soft">
            <Scale className="h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-xl font-extrabold text-foreground">
              Terms Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Last updated: 28 August 2026. These terms apply to website visitors, retail
              customers, bulk buyers, distributors, and account holders.
            </p>
            <div className="mt-6 border-t border-border pt-5 text-sm">
              <p className="font-bold text-foreground">Need Help?</p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="mt-2 flex items-center gap-2 break-all text-muted-foreground transition hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {COMPANY_INFO.email}
              </a>
            </div>
          </aside>

          <div className="space-y-5">
            {termsSections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl border border-border bg-background p-6 shadow-soft sm:p-8"
              >
                <h2 className="font-display text-xl font-extrabold text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}

            <article className="rounded-3xl border border-border bg-forest p-6 text-forest-foreground shadow-lift sm:p-8">
              <h2 className="font-display text-xl font-extrabold">Questions About These Terms?</h2>
              <p className="mt-3 text-sm leading-relaxed text-forest-foreground/80">
                For order, payment, delivery, or policy questions, contact {COMPANY_INFO.tradeName}
                directly.
              </p>
              <div className="mt-5 grid gap-2 text-sm text-forest-foreground/85">
                <p>Email: {COMPANY_INFO.email}</p>
                <p>Phone: {COMPANY_INFO.phonePrimary}</p>
                <p>Address: {COMPANY_INFO.address.full}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
