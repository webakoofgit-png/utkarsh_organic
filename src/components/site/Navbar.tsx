import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import logo from "@/assets/logo.png";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Why Organic", to: "/why-organic" },
  { label: "Farm Gallery", to: "/gallery" },
  { label: "Bulk Order", to: "/bulk-orders" },
  { label: "Contact", to: "/contact" },
] as const;

function MoringaLeafSprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 58"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 46C54 18 98 10 166 13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[
        [31, 34, -28],
        [44, 27, -18],
        [58, 22, -10],
        [74, 18, -4],
        [91, 15, 4],
        [109, 14, 11],
        [128, 14, 18],
        [147, 15, 25],
        [39, 43, 24],
        [55, 36, 18],
        [72, 31, 12],
        [90, 28, 5],
        [110, 26, -5],
        [130, 25, -13],
      ].map(([cx, cy, rotate]) => (
        <ellipse
          key={`${cx}-${cy}-${rotate}`}
          cx={cx}
          cy={cy}
          rx="8"
          ry="4.8"
          transform={`rotate(${rotate} ${cx} ${cy})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, user } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const solid = true;

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-green-900/10 bg-white text-foreground shadow-md backdrop-blur-xl transition-all duration-300"
    >
      <MoringaLeafSprig className="pointer-events-none absolute left-[8rem] top-1/2 hidden h-14 w-44 -translate-y-1/2 text-primary/10 lg:block" />
      <MoringaLeafSprig className="pointer-events-none absolute right-[26rem] top-1/2 hidden h-12 w-40 -translate-y-1/2 rotate-180 text-primary/10 xl:block" />
      <MoringaLeafSprig className="pointer-events-none absolute right-8 top-1/2 hidden h-14 w-44 -translate-y-1/2 text-primary/10 lg:block" />

      <div className="container-x relative z-10 flex h-16 items-center justify-between gap-2 lg:h-20 lg:gap-3">
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3 lg:shrink-0"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-green-500/30 bg-white p-0.5 shadow-sm min-[380px]:h-12 min-[380px]:w-12 sm:h-14 sm:w-14">
            <img
              src={logo}
              alt="Utkarsh Organic Farm logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-base font-black min-[380px]:text-lg sm:text-xl">
              Utkarsh
            </span>
            <span
              className={`truncate text-[0.56rem] font-bold uppercase tracking-[0.16em] max-[359px]:hidden min-[380px]:text-[0.65rem] min-[380px]:tracking-[0.28em] ${solid ? "text-primary" : "text-green-200"}`}
            >
              Organic Farm
            </span>
          </span>
        </Link>

        <nav className="hidden flex-nowrap items-center gap-0.5 xl:flex">
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
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
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden min-[420px]:block">
            <LanguageToggle solid={solid} />
          </div>
          <Link
            to="/products"
            className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 lg:inline-flex ${
              solid
                ? "bg-primary text-primary-foreground hover:bg-forest"
                : "bg-saffron text-white hover:bg-white hover:text-primary"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Link>
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-all hover:-translate-y-0.5 ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
          >
            <Search className="h-[19px] w-[19px]" />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            aria-label="Account"
            className={`hidden h-10 w-10 place-items-center rounded-full transition-all hover:-translate-y-0.5 sm:grid ${
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/12"
            }`}
          >
            <User className="h-[19px] w-[19px]" />
          </Link>
          <Link
            to="/account?tab=wishlist"
            aria-label="Wishlist"
            className={`relative hidden h-10 w-10 place-items-center rounded-full transition-all hover:-translate-y-0.5 sm:grid ${
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
            className={`relative grid h-10 w-10 place-items-center rounded-full transition-all hover:-translate-y-0.5 ${
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
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors xl:hidden ${
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
              className="container-x flex items-center gap-2 py-3 sm:gap-3 sm:py-4"
              onSubmit={(e) => {
                e.preventDefault();
                const q = new FormData(e.currentTarget).get("q") as string;
                setSearchOpen(false);
                navigate(`/products?q=${encodeURIComponent(q ?? "")}`);
              }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                name="q"
                autoFocus
                placeholder="Search onion powder, turmeric, moringa tea, bulk packs..."
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-forest sm:px-5">
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
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-white text-foreground shadow-lg xl:hidden"
          >
            <ul className="container-x safe-bottom-pad grid gap-1 py-4">
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
              <li className="px-4 py-2">
                <LanguageToggle solid />
              </li>
              <li className="grid gap-1 sm:hidden">
                <Link
                  to={user ? "/account" : "/login"}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary"
                >
                  Account
                </Link>
                <Link
                  to="/account?tab=wishlist"
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary"
                >
                  Wishlist {wishlist.length ? `(${wishlist.length})` : ""}
                </Link>
              </li>
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
