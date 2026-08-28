import { Link } from "react-router-dom";
import { Ban, ChevronRight, Home, Leaf, Mail, RotateCcw, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/lib/products";

const cancellationSections = [
  {
    title: "Order Cancellation",
    body: [
      "Customers may request cancellation before an order is packed, dispatched, or moved into production. Once processing has started, cancellation approval depends on the order stage, product type, quantity, and dispatch status.",
      "To request cancellation, contact us with your order number, customer name, phone number, and reason for cancellation.",
    ],
  },
  {
    title: "After Dispatch",
    body: [
      "Orders that have already been shipped cannot usually be cancelled immediately. In such cases, the request may be handled as a return, replacement, or refund review after delivery status is confirmed.",
      "Courier charges, handling costs, and payment gateway fees may be deducted where applicable and permitted by law.",
    ],
  },
  {
    title: "Bulk And Custom Orders",
    body: [
      "Bulk, wholesale, distributor, private-label, custom-grade, custom-pack, or made-to-order products may not be eligible for cancellation after quotation acceptance, payment confirmation, procurement, packing, or production has begun.",
      "Any approved cancellation for such orders may be subject to deduction for materials, processing, packaging, logistics, or administrative expenses already incurred.",
    ],
  },
  {
    title: "Cancellation By Utkarsh Organic Farm",
    body: [
      "Utkarsh Organic Farm may cancel an order if stock is unavailable, payment fails, delivery is not serviceable, customer details cannot be verified, pricing or product information contains an error, or misuse of the website is suspected.",
      "If payment has already been received for an order cancelled by us, the eligible amount will be refunded to the original payment method or another mutually agreed method.",
    ],
  },
  {
    title: "Refund Timeline",
    body: [
      "Approved refunds are initiated after cancellation approval and internal verification. Bank, UPI, wallet, card, or payment gateway timelines may vary depending on the payment provider.",
      "Refunds may take additional time during bank holidays, payment gateway delays, or where extra order verification is required.",
    ],
  },
  {
    title: "Damaged, Incorrect, Or Missing Items",
    body: [
      "If you receive a damaged, incorrect, or missing item, please contact us as soon as possible with the order details and clear photos or videos of the package and product.",
      "After review, we may offer replacement, refund, store credit, or another suitable resolution based on the issue and applicable policy.",
    ],
  },
];

export default function CancellationPolicyPage() {
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
            <span className="font-bold text-beige">Cancellation Policy</span>
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
              <Ban className="h-3.5 w-3.5 text-beige" />
              <span>CANCELLATION POLICY</span>
              <Sparkles className="h-3 w-3 text-beige" />
            </div>
            <h1 className="mt-3 break-words font-serif text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
              Cancellation Policy
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-green-100/90 md:text-base">
              Cancellation, refund, replacement, and review terms for retail orders, bulk supply
              requests, and custom product requirements from {COMPANY_INFO.tradeName}.
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
            <RotateCcw className="h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-xl font-extrabold text-foreground">
              Cancellation Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Last updated: 28 August 2026. Cancellation eligibility depends on whether the order is
              pending, packed, dispatched, delivered, custom-made, or bulk processed.
            </p>
            <div className="mt-6 border-t border-border pt-5 text-sm">
              <p className="font-bold text-foreground">Request Cancellation</p>
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
            {cancellationSections.map((section) => (
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
              <h2 className="font-display text-xl font-extrabold">Need To Cancel An Order?</h2>
              <p className="mt-3 text-sm leading-relaxed text-forest-foreground/80">
                Contact {COMPANY_INFO.tradeName} quickly with your order details so the team can
                check the current processing status.
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
