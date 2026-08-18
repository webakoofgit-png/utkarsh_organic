import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { inr, priceFor, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const prices = priceFor(product, "100g");
  const saved = wishlist.includes(product.slug);

  const add = () => {
    addToCart(product.slug, "100g");
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group surface-card relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={`relative overflow-hidden bg-cream ${compact ? "aspect-square" : "aspect-[4/4.35]"}`}>
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.bestSeller ? <span className="rounded-full bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-foreground">Best seller</span> : null}
          {product.newArrival ? <span className="rounded-full bg-saffron px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">New</span> : null}
        </div>
        <button
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.slug)}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 shadow-sm transition hover:bg-background ${saved ? "text-destructive" : "text-foreground"}`}
        >
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{product.category} powder</p>
        <Link to={`/product/${product.slug}`} className="mt-2 font-display text-base font-bold leading-snug text-foreground hover:text-accent sm:text-lg">
          {product.name}
        </Link>
        {!compact ? <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.short}</p> : null}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="font-display text-lg font-extrabold text-foreground">{inr(prices.price)}</p>
            <p className="text-xs text-muted-foreground"><span className="line-through">{inr(prices.mrp)}</span> &middot; 100g</p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-xs font-semibold text-foreground"><Star className="h-3.5 w-3.5 fill-saffron text-saffron" /> {product.rating}</p>
            <button onClick={add} className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:bg-forest">
              <ShoppingBag className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
