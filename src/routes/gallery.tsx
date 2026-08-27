import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Home,
  Leaf,
  MapPin,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import farm from "@/assets/farm.jpg";
import { COMPANY_INFO } from "@/lib/products";
import { GALLERY_ITEMS } from "@/lib/gallery";

export default function GalleryPage() {
  return (
    <main className="pt-16 lg:pt-20">
      <div className="w-full border-b border-green-500/20 bg-primary py-3">
        <div className="container-x flex items-center justify-between text-xs font-medium text-green-100 sm:text-sm">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-green-300/40 bg-green-950/90 text-green-200 transition hover:bg-earth hover:text-white"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <Link to="/" className="text-green-100 transition hover:text-beige">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-green-500/60" />
            <span className="font-bold text-beige">Gallery</span>
            <ChevronRight className="hidden h-4 w-4 shrink-0 text-green-500/60 sm:block" />
            <span className="hidden truncate text-green-200/90 sm:block">
              Farm, products and pantry-ready formats
            </span>
          </div>

          <Leaf className="h-4.5 w-4.5 shrink-0 fill-earth/30 text-beige" />
        </div>
      </div>

      <section className="relative flex min-h-[170px] w-full items-center overflow-hidden border-b border-green-500/20 bg-forest text-white shadow-md sm:h-[210px] md:h-[230px] lg:h-[260px] xl:h-[300px]">
        <img
          src={farm}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/96 via-primary/88 to-primary/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,24,13,0.38)_62%,rgba(3,24,13,0.9)_100%)]" />
        <div
          className="home-vine-lines pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-35"
          aria-hidden="true"
        />
        <Leaf
          className="home-drifting-leaf pointer-events-none absolute left-[18%] top-[22%] h-7 w-7 text-green-300/45"
          aria-hidden="true"
        />
        <Leaf
          className="home-drifting-leaf pointer-events-none absolute right-[22%] top-[18%] h-8 w-8 rotate-12 text-green-300/45 [animation-delay:1.2s]"
          aria-hidden="true"
        />
        <Leaf
          className="home-drifting-leaf pointer-events-none absolute right-[8%] bottom-[22%] h-6 w-6 text-green-300/35 [animation-delay:2.2s]"
          aria-hidden="true"
        />

        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-earth/45 bg-green-950/72 px-3 py-2 text-xs font-extrabold text-cream shadow-[0_0_24px_rgba(122,82,52,0.22)] backdrop-blur-md sm:px-5 sm:text-sm">
              <Camera className="h-4 w-4 text-beige" />
              <span>Farm Gallery</span>
              <Sparkles className="h-3.5 w-3.5 text-beige" />
            </div>
            <h1 className="mx-auto mt-5 max-w-4xl text-balance font-display text-2xl font-black leading-tight text-white min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Farm, products and <span className="text-beige">pantry-ready</span> formats.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">
              A clean visual gallery using existing Utkarsh Organic Farm assets. Product photos are
              framed so bowls, packs and ingredients stay visible.
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
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="surface-card flex h-full min-h-[21rem] flex-col overflow-hidden p-3 sm:min-h-[25rem]">
                <div
                  className={`grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.25rem] bg-cream ${item.fit === "contain" ? "p-4" : "p-0"}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full object-center ${item.fit === "contain" ? "object-contain" : "object-cover"}`}
                    loading={index > 2 ? "lazy" : "eager"}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-extrabold uppercase text-accent">{item.label}</p>
                  <h2 className="mt-2 font-display text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-cream py-16 lg:py-20">
        <div className="container-x grid gap-8 rounded-[1.35rem] bg-white p-5 shadow-soft sm:rounded-[2rem] sm:p-7 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Visit and orders</p>
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              Connect before visiting the farm unit.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mr-1 inline h-4 w-4 text-accent" />
              {COMPANY_INFO.address.full}. Exact map coordinates are not stored in this project, so
              the site routes visitors through direct contact.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              to="/bulk-orders"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-forest"
            >
              <PackageCheck className="h-4 w-4" />
              Bulk Order
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-secondary px-6 py-3 text-sm font-extrabold text-primary transition hover:-translate-y-0.5"
            >
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
