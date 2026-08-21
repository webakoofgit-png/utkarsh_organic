import { Link } from "react-router-dom";
import { ArrowRight, Camera, Leaf, MapPin, PackageCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { COMPANY_INFO } from "@/lib/products";
import { GALLERY_ITEMS } from "@/lib/gallery";

export default function GalleryPage() {
  return (
    <main className="pt-16 lg:pt-20">
      <section className="relative overflow-hidden bg-[#052314] py-16 text-white lg:py-24">
        <div className="home-organic-backdrop absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="home-vine-lines absolute inset-x-0 bottom-0 h-40 opacity-35" aria-hidden="true" />
        <div className="container-x relative z-10">
          <Reveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-xs font-bold text-emerald-100 backdrop-blur-md">
              <Camera className="h-3.5 w-3.5 text-emerald-300" />
              Farm Gallery
            </div>
            <h1 className="mt-6 font-display text-4xl font-black leading-tight sm:text-6xl">
              Farm, products and pantry-ready formats.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/74">
              A clean visual gallery using existing Utkarsh Organic Farm assets. Product photos are framed with contain-fit layouts so bowls, packs and ingredients stay visible.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <SectionHeading
          eyebrow="Gallery"
          title="Every image has space to breathe."
          sub="Farm visuals, product photos and commercial order moments are shown in responsive frames without cutting the main subject."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className={item.featured ? "lg:col-span-2" : ""}>
              <article className="surface-card h-full overflow-hidden p-3">
                <div className={`grid place-items-center overflow-hidden rounded-[1.25rem] bg-cream p-3 ${item.featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" loading={index > 2 ? "lazy" : "eager"} />
                </div>
                <div className="p-4">
                  <p className="text-xs font-extrabold uppercase text-accent">{item.label}</p>
                  <h2 className="mt-2 font-display text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-cream py-16 lg:py-20">
        <div className="container-x grid gap-8 rounded-[2rem] bg-white p-7 shadow-soft md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Visit and orders</p>
            <h2 className="font-display text-3xl font-black sm:text-4xl">Connect before visiting the farm unit.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mr-1 inline h-4 w-4 text-accent" />
              {COMPANY_INFO.address.full}. Exact map coordinates are not stored in this project, so the site routes visitors through direct contact.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/bulk-orders" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-forest">
              <PackageCheck className="h-4 w-4" />
              Bulk Order
            </Link>
            <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-secondary px-6 py-3 text-sm font-extrabold text-primary transition hover:-translate-y-0.5">
              <Leaf className="h-4 w-4" />
              Shop Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
