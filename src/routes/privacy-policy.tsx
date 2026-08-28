import { Link } from "react-router-dom";
import { ChevronRight, Home, Leaf, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/lib/products";

const privacySections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information you share while placing an order, creating an account, contacting support, or requesting a bulk supply quotation. This may include your name, phone number, email address, shipping address, billing details, company name, GST details, and order preferences.",
      "We may also collect basic website usage information such as pages visited, browser type, approximate location, device details, and referral source to improve site performance and customer experience.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use customer information to process orders, arrange delivery, respond to inquiries, provide invoices, manage accounts, confirm payments, improve our catalog, and communicate important updates about products or services.",
      "For bulk, wholesale, and distributor inquiries, we may use the submitted details to prepare quotations, confirm specifications, and follow up on supply requirements.",
    ],
  },
  {
    title: "Payments And Order Data",
    body: [
      "Payment information is handled through the payment or banking method selected during checkout or order confirmation. We do not intentionally store complete card, UPI PIN, net banking password, or sensitive payment authentication details on this website.",
      "Order records, invoices, dispatch details, and customer support history may be retained for business, accounting, tax, and compliance purposes.",
    ],
  },
  {
    title: "Sharing Of Information",
    body: [
      "We share information only when needed to complete a service, such as with delivery partners, payment service providers, technology vendors, accountants, or legal and regulatory authorities.",
      "We do not sell customer personal information. We may disclose information when required by law, to protect our rights, or to prevent fraud and misuse of our services.",
    ],
  },
  {
    title: "Cookies And Website Tools",
    body: [
      "The website may use cookies or similar tools to remember preferences, support cart functionality, measure traffic, and improve page performance.",
      "You can control cookies through your browser settings, but some site features may not work properly if cookies are disabled.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and operational safeguards to protect customer information. No internet-based system is completely secure, so customers should also protect their own account and communication details.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may contact us to request correction, update, or deletion of personal information where applicable. Some records may be retained when required for order fulfillment, accounting, tax, dispute resolution, or legal compliance.",
      "You may opt out of promotional communication by contacting us, while still receiving essential order or service messages.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            <span className="font-bold text-beige">Privacy Policy</span>
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
              <LockKeyhole className="h-3.5 w-3.5 text-beige" />
              <span>PRIVACY POLICY</span>
              <Sparkles className="h-3 w-3 text-beige" />
            </div>
            <h1 className="mt-3 break-words font-serif text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-green-100/90 md:text-base">
              How {COMPANY_INFO.tradeName} collects, uses, stores, and protects customer
              information for orders, inquiries, accounts, and support.
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
            <ShieldCheck className="h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-xl font-extrabold text-foreground">
              Policy Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Last updated: 28 August 2026. This policy applies to website visitors, retail
              customers, bulk buyers, distributors, and support inquiries.
            </p>
            <div className="mt-6 border-t border-border pt-5 text-sm">
              <p className="font-bold text-foreground">Contact</p>
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
            {privacySections.map((section) => (
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
              <h2 className="font-display text-xl font-extrabold">Questions About Privacy?</h2>
              <p className="mt-3 text-sm leading-relaxed text-forest-foreground/80">
                For requests related to personal information or this policy, contact{" "}
                {COMPANY_INFO.tradeName} using the email or phone number listed below.
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
