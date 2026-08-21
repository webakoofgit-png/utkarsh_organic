import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const { categoryLabel } = useCatalog();
  const saved = wishlist.includes(product.slug);

  const add = () => {
    addToCart(product.slug, "1kg");
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group surface-card relative flex h-full min-w-0 flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative grid aspect-[4/3.75] min-h-[260px] place-items-center overflow-hidden bg-white sm:min-h-[290px]">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 grid place-items-center px-7 pb-8 pt-14 sm:px-9 sm:pb-9 sm:pt-16"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain object-center"
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
            <button onClick={add} className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:bg-forest">
              <ShoppingBag className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
