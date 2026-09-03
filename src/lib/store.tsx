import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, priceFor, type Weight } from "@/lib/products";

export type CartLine = { slug: string; weight: Weight; qty: number };
export type OrderItem = { name: string; weight: string; qty: number; price: number };
export type Address = {
  name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
};
export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  address?: string;
  payment?: string;
};
export type User = { name: string; email: string; mobile?: string };

export const ORDER_STAGES = [
  "Order Placed",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const KEY = "utkarsh-organic-state-v2";

type State = {
  cart: CartLine[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  addresses: Address[];
};

const initial: State = {
  cart: [],
  wishlist: [],
  user: null,
  orders: [],
  addresses: [],
};

type Ctx = State & {
  ready: boolean;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (slug: string, weight: Weight, qty?: number) => void;
  setQty: (slug: string, weight: Weight, qty: number) => void;
  removeLine: (slug: string, weight: Weight) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  login: (nameOrUser: string | User, email?: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  placeOrder: (total: number, payment: string) => Order;
  addAddress: (a: Address) => void;
  cartCount: number;
  subtotal: number;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = { ...initial, ...(JSON.parse(raw) as State) };
        if (!saved.user) {
          saved.wishlist = [];
          saved.orders = [];
          saved.addresses = [];
        }
        setState(saved);
      }
    } catch {
      /* ignore corrupt state */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, ready]);

  const value = useMemo<Ctx>(() => {
    const cartCount = state.cart.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.cart.reduce((sum, l) => {
      const p = PRODUCTS.find((x) => x.slug === l.slug);
      if (!p) return sum;
      return sum + priceFor(p, l.weight).price * l.qty;
    }, 0);

    return {
      ...state,
      ready,
      cartOpen,
      setCartOpen,
      cartCount,
      subtotal,
      addToCart: (slug, weight, qty = 1) =>
        setState((s) => {
          const i = s.cart.findIndex((l) => l.slug === slug && l.weight === weight);
          if (i >= 0) {
            const cart = s.cart.map((l, idx) => (idx === i ? { ...l, qty: l.qty + qty } : l));
            return { ...s, cart };
          }
          return { ...s, cart: [...s.cart, { slug, weight, qty }] };
        }),
      setQty: (slug, weight, qty) =>
        setState((s) => ({
          ...s,
          cart: s.cart
            .map((l) => (l.slug === slug && l.weight === weight ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),
      removeLine: (slug, weight) =>
        setState((s) => ({ ...s, cart: s.cart.filter((l) => !(l.slug === slug && l.weight === weight)) })),
      clearCart: () => setState((s) => ({ ...s, cart: [] })),
      toggleWishlist: (slug) =>
        setState((s) => ({
          ...s,
          wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((x) => x !== slug) : [...s.wishlist, slug],
        })),
      login: (nameOrUser, email = "") =>
        setState((s) => {
          const userObj = typeof nameOrUser === "string" ? { name: nameOrUser, email } : nameOrUser;
          return { ...s, user: userObj };
        }),
      logout: () =>
        setState((s) => ({
          ...s,
          user: null,
          wishlist: [],
          orders: [],
          addresses: [],
        })),
      addOrder: (order: Order) =>
        setState((s) => ({
          ...s,
          orders: [order, ...s.orders],
        })),
      placeOrder: (total, payment) => {
        const items: OrderItem[] = state.cart.map((l) => {
          const p = PRODUCTS.find((x) => x.slug === l.slug);
          return {
            name: p ? p.name : l.slug,
            weight: l.weight,
            qty: l.qty,
            price: p ? priceFor(p, l.weight).price * l.qty : 0,
          };
        });
        const order: Order = {
          id: "UO-" + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          items,
          total,
          status: "Processing",
          payment,
        };
        setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
        return order;
      },
      addAddress: (a) => setState((s) => ({ ...s, addresses: [...s.addresses, a] })),
    };
  }, [state, ready, cartOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
