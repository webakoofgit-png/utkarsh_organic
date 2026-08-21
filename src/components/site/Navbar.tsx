import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import logo from "@/assets/logo-mark.png";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Why Organic", to: "/why-organic" },
  { label: "Farm Gallery", to: "/gallery" },
  { label: "Bulk Order", to: "/bulk-orders" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, user } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open || searchOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "border-border bg-white/95 text-foreground shadow-md backdrop-blur-xl"
          : "border-white/15 bg-white/10 text-white shadow-none backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-emerald-500/30 bg-white p-1 shadow-sm">
            <img src={logo} alt="Utkarsh Organic Farm logo" className="h-full w-full object-contain" />
          </div>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-lg font-black sm:text-xl">Utkarsh</span>
            <span className={`text-[0.65rem] font-bold uppercase tracking-[0.28em] ${solid ? "text-primary" : "text-emerald-200"}`}>
              Organic Farm
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative overflow-hidden rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? solid
                      ? "text-primary"
                      : "text-white"
                    : solid
                      ? "text-foreground/78 hover:bg-secondary/70 hover:text-primary"
                      : "text-white/84 hover:bg-white/12 hover:text-white"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-nav-pill"
                    className={`absolute inset-0 rounded-full ${solid ? "bg-primary/10" : "bg-white/16"}`}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            to="/products"
            className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 lg:inline-flex ${
              solid ? "bg-primary text-primary-foreground hover:bg-forest" : "bg-saffron text-foreground hover:bg-white"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Link>
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
            className={`rounded-full p-2.5 transition-all hover:-translate-y-0.5 ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
          >
            <Search className="h-[19px] w-[19px]" />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            aria-label="Account"
            className={`hidden rounded-full p-2.5 transition-all hover:-translate-y-0.5 sm:block ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
          >
            <User className="h-[19px] w-[19px]" />
          </Link>
          <Link
            to="/account?tab=wishlist"
            aria-label="Wishlist"
            className={`relative hidden rounded-full p-2.5 transition-all hover:-translate-y-0.5 sm:block ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
          >
            <Heart className="h-[19px] w-[19px]" />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className={`relative rounded-full p-2.5 transition-all hover:-translate-y-0.5 ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
          >
            <ShoppingBag className="h-[19px] w-[19px]" />
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
            className={`rounded-full p-2.5 transition-colors xl:hidden ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
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
            className="overflow-hidden border-t border-border bg-white text-foreground"
          >
            <form
              className="container-x flex items-center gap-3 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                const q = new FormData(e.currentTarget).get("q") as string;
                setSearchOpen(false);
                navigate(`/shop?q=${encodeURIComponent(q ?? "")}`);
              }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                name="q"
                autoFocus
                placeholder="Search onion powder, turmeric, moringa tea, bulk packs..."
                className="w-full bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-forest">
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
            className="border-t border-border bg-white text-foreground shadow-lg xl:hidden"
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
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop Now
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
