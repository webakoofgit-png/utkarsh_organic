import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import logo from "@/assets/logo-mark.png";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Why Organic", to: "/why-organic" },
  { label: "Bulk Orders", to: "/bulk-orders" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, user } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-border bg-background/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="Utkarsh Organic leaf logo" width={40} height={40} className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-lg font-extrabold tracking-tight ${solid ? "text-foreground" : "text-primary-foreground"}`}
            >
              Utkarsh
            </span>
            <span className={`text-[0.62rem] font-semibold tracking-[0.3em] ${solid ? "text-accent" : "text-primary-foreground/80"}`}>
              ORGANIC
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                solid ? "text-foreground/80 hover:text-accent" : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
            className={`rounded-full p-2.5 transition-colors hover:bg-secondary ${solid ? "text-foreground" : "text-primary-foreground"}`}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            aria-label="Account"
            className={`hidden rounded-full p-2.5 transition-colors hover:bg-secondary sm:block ${solid ? "text-foreground" : "text-primary-foreground"}`}
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/account"
            search={{ tab: "wishlist" }}
            aria-label="Wishlist"
            className={`relative hidden rounded-full p-2.5 transition-colors hover:bg-secondary sm:block ${solid ? "text-foreground" : "text-primary-foreground"}`}
          >
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className={`relative rounded-full p-2.5 transition-colors hover:bg-secondary ${solid ? "text-foreground" : "text-primary-foreground"}`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full p-2.5 xl:hidden ${solid ? "text-foreground" : "text-primary-foreground"}`}
          >
            <motion.span animate={{ rotate: open ? 90 : 0 }} className="block">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background"
          >
            <form
              className="container-x flex items-center gap-3 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                const q = new FormData(e.currentTarget).get("q") as string;
                setSearchOpen(false);
                window.location.href = `/shop?q=${encodeURIComponent(q ?? "")}`;
              }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                name="q"
                autoFocus
                placeholder="Search onion powder, turmeric, bulk packs…"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-border bg-background xl:hidden"
          >
            <ul className="container-x grid gap-1 py-4">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.to}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                    activeProps={{ className: "text-accent" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
