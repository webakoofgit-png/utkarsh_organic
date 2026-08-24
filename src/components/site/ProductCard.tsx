import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { ProductImageWithLogo } from "@/components/site/ProductImageWithLogo";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const { categoryLabel } = useCatalog();
  const shouldReduceMotion = useReducedMotion();
  const saved = wishlist.includes(product.slug);

  const add = () => {
    addToCart(product.slug, "1kg");
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.article
      className="group surface-card relative flex h-full min-w-0 flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative grid aspect-[4/3.75] min-h-[260px] place-items-center overflow-hidden bg-white sm:min-h-[290px]">
        <span className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/3 bg-gradient-to-r from-transparent via-green-50/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shine-sweep group-hover:opacity-100" />
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 grid place-items-center px-7 pb-8 pt-14 sm:px-9 sm:pb-9 sm:pt-16"
        >
          <ProductImageWithLogo
            src={product.image}
            alt={product.name}
            className="h-full w-full transition-transform duration-500 group-hover:-translate-y-1"
            stampClassName="h-14 w-14 sm:h-16 sm:w-16"
            imgProps={{ loading: "lazy" }}
          />
        </Link>
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.bestSeller ? <span className="rounded-full bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-foreground">Best seller</span> : null}
          {product.newArrival ? <span className="rounded-full bg-saffron px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">New</span> : null}
        </div>
        <button
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.slug)}
          className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 shadow-sm transition hover:bg-background ${saved ? "text-destructive" : "text-foreground"}`}
        >
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{categoryLabel(product.category)}</p>
        <Link to={`/product/${product.slug}`} className="mt-2 break-words font-display text-base font-bold leading-snug text-foreground hover:text-accent sm:text-lg">
          {product.name}
        </Link>
        {!compact ? <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.short}</p> : null}
        <div className="mt-auto flex flex-col gap-3 pt-4 min-[380px]:flex-row min-[380px]:items-end min-[380px]:justify-between">
          <div className="min-w-0">
            <p className="font-display text-base font-extrabold text-foreground sm:text-lg">{product.priceLabel}</p>
            <p className="text-xs text-muted-foreground">MOQ {product.moq}</p>
          </div>
          <div className="shrink-0 text-left min-[380px]:text-right">
            <p className="flex items-center gap-1 text-xs font-semibold text-foreground min-[380px]:justify-end"><Star className="h-3.5 w-3.5 fill-saffron text-saffron" /> {product.rating}</p>
            <button onClick={add} className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-forest">
              <ShoppingBag className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
