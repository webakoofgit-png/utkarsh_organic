import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import logo from "@/assets/logo-mark.png";

const NAV = [
  { label: "Home", to: "/" },
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
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white border-b border-border transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white border border-emerald-500/30 p-1 shadow-sm overflow-hidden shrink-0">
            <img src={logo} alt="Utkarsh Organic logo" className="h-full w-full object-contain" />
          </div>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg sm:text-xl font-black tracking-tight text-foreground">
              Utkarsh
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.3em] text-primary">
              ORGANIC
            </span>
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary font-bold bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-secondary/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary"
          >
            <Search className="h-[19px] w-[19px]" />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            aria-label="Account"
            className="hidden rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary sm:block"
          >
            <User className="h-[19px] w-[19px]" />
          </Link>
          <Link
            to="/account?tab=wishlist"
            aria-label="Wishlist"
            className="relative hidden rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary sm:block"
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
            className="relative rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary"
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
            className="rounded-full p-2.5 text-foreground xl:hidden"
          >
            <motion.span animate={{ rotate: open ? 90 : 0 }} className="block">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-white"
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
                placeholder="Search onion powder, turmeric, moringa tea, bulk packs…"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
              <button className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-forest">
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-border bg-white xl:hidden shadow-lg"
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
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
