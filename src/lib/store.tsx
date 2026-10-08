"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { chargeableDays } from "./dates";
import { products, type Product } from "./products";

type Toast = { id: number; title: string; body?: string; tone?: "success" | "info" };

type Store = {
  city: string;
  setCity: (c: string) => void;
  delivery: Date | null;
  pickup: Date | null;
  days: number;
  setDates: (d: Date | null, p: Date | null) => void;
  cart: Record<number, number>;
  cartCount: number;
  cartItems: { product: Product; qty: number }[];
  addToCart: (p: Product) => void;
  setQty: (id: number, qty: number) => void;
  wishlist: number[];
  toggleWish: (id: number) => void;
  waitlist: number[];
  joinWaitlist: (id: number) => void;
  // UI
  dateOpen: boolean;
  openDates: (pendingProduct?: Product) => void;
  closeDates: () => void;
  confirmDates: (d: Date, p: Date) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  cityOpen: boolean;
  setCityOpen: (v: boolean) => void;
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  bump: number; // increments on add to cart (cart icon animation)
};

const Ctx = createContext<Store | null>(null);

const KEY = "sp-demo-state-v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [city, setCity] = useState("Bangalore");
  const [delivery, setDelivery] = useState<Date | null>(null);
  const [pickup, setPickup] = useState<Date | null>(null);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [waitlist, setWaitlist] = useState<number[]>([]);
  const [dateOpen, setDateOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bump, setBump] = useState(0);
  const pending = useRef<Product | null>(null);
  const hydrated = useRef(false);

  // hydrate from localStorage (per-viewer convenience only)
  useEffect(() => {
    const s = load();
    if (s) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const d = s.delivery ? new Date(s.delivery) : null;
      if (d && d >= today) {
        setDelivery(d);
        setPickup(s.pickup ? new Date(s.pickup) : null);
      }
      if (s.cart) setCart(s.cart);
      if (s.wishlist) setWishlist(s.wishlist);
      if (s.waitlist) setWaitlist(s.waitlist);
      if (s.city) setCity(s.city);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ delivery, pickup, cart, wishlist, waitlist, city })
      );
    } catch {
      /* storage unavailable — state stays in memory */
    }
  }, [delivery, pickup, cart, wishlist, waitlist, city]);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
      setBump((b) => b + 1);
      toast({ title: "Added to cart", body: p.name, tone: "success" });
    },
    [toast]
  );

  const setQty = useCallback((id: number, qty: number) => {
    setCart((c) => {
      const n = { ...c };
      if (qty <= 0) delete n[id];
      else n[id] = qty;
      return n;
    });
  }, []);

  const openDates = useCallback((p?: Product) => {
    pending.current = p ?? null;
    setDateOpen(true);
  }, []);

  const confirmDates = useCallback(
    (d: Date, p: Date) => {
      setDelivery(d);
      setPickup(p);
      setDateOpen(false);
      if (pending.current) {
        addToCart(pending.current);
        pending.current = null;
      } else {
        toast({ title: "Dates saved", body: "Prices now reflect your rental period.", tone: "info" });
      }
    },
    [addToCart, toast]
  );

  const value = useMemo<Store>(() => {
    const cartItems = Object.entries(cart)
      .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id))!, qty }))
      .filter((x) => x.product);
    return {
      city,
      setCity,
      delivery,
      pickup,
      days: chargeableDays(delivery, pickup),
      setDates: (d, p) => {
        setDelivery(d);
        setPickup(p);
      },
      cart,
      cartCount: cartItems.reduce((s, x) => s + x.qty, 0),
      cartItems,
      addToCart,
      setQty,
      wishlist,
      toggleWish: (id) =>
        setWishlist((w) => {
          const on = w.includes(id);
          toast({ title: on ? "Removed from wishlist" : "Saved to wishlist", tone: "info" });
          return on ? w.filter((x) => x !== id) : [...w, id];
        }),
      waitlist,
      joinWaitlist: (id) => {
        if (waitlist.includes(id)) return;
        setWaitlist((w) => [...w, id]);
        toast({ title: "You're on the waitlist!", body: "We'll notify you the moment it launches.", tone: "success" });
      },
      dateOpen,
      openDates,
      closeDates: () => {
        pending.current = null;
        setDateOpen(false);
      },
      confirmDates,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      cityOpen,
      setCityOpen,
      toasts,
      toast,
      bump,
    };
  }, [city, delivery, pickup, cart, wishlist, waitlist, dateOpen, cartOpen, searchOpen, cityOpen, toasts, bump, addToCart, setQty, openDates, confirmDates, toast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
