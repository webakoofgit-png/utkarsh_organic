import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { inr, PRODUCTS, priceFor } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeLine, setQty, subtotal } = useStore();
  const lines = cart.flatMap((line) => {
    const product = PRODUCTS.find((item) => item.slug === line.slug);
    return product ? [{ ...line, product, amount: priceFor(product, line.weight).price * line.qty }] : [];
  });

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col border-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-6 text-left">
          <SheetTitle className="font-display text-2xl">Your cart</SheetTitle>
          <SheetDescription>{lines.length ? `${lines.length} item${lines.length === 1 ? "" : "s"} chosen for your kitchen.` : "Your cart is ready when you are."}</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary"><ShoppingBag className="h-7 w-7" /></div>
              <h3 className="mt-5 font-display text-xl font-bold">Your cart is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground">Discover naturally flavourful powders for everyday cooking.</p>
              <Link to="/shop" onClick={() => setCartOpen(false)} className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Browse products</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {lines.map(({ product, weight, qty, amount }) => (
                <div key={`${product.slug}-${weight}`} className="flex gap-3">
                  <img src={product.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${product.slug}`} onClick={() => setCartOpen(false)} className="font-display text-sm font-bold text-foreground hover:text-accent">{product.name}</Link>
                    <p className="mt-1 text-xs text-muted-foreground">{weight} &middot; {inr(priceFor(product, weight).price)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border bg-secondary/50">
                        <button aria-label="Decrease quantity" onClick={() => setQty(product.slug, weight, qty - 1)} className="p-1.5"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-7 text-center text-xs font-bold">{qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(product.slug, weight, qty + 1)} className="p-1.5"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold">{inr(amount)}</span>
                        <button aria-label={`Remove ${product.name}`} onClick={() => removeLine(product.slug, weight)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border bg-cream px-6 py-5">
              <div className="flex justify-between font-display text-lg font-bold"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <p className="mt-1 text-xs text-muted-foreground">Shipping and taxes are calculated at checkout.</p>
              <Link to="/checkout" onClick={() => setCartOpen(false)} className="mt-5 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-forest">Proceed to checkout</Link>
              <Link to="/cart" onClick={() => setCartOpen(false)} className="mt-3 block text-center text-sm font-semibold text-primary underline underline-offset-4">View cart</Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
