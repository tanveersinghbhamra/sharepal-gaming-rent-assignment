"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Info, LayoutGrid, House, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { cities } from "@/data/content";
import { fmtShort } from "@/lib/dates";
import { formatINR, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { CalAddIcon, CartIcon, PinIcon } from "./icons";

function useLock(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
}

/* ---------------- Cart drawer ---------------- */
export function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, setQty, days, delivery, pickup, openDates, toast } = useStore();
  const close = useMemo(() => () => setCartOpen(false), [setCartOpen]);
  useLock(cartOpen, close);
  const perDay = cartItems.reduce((s, x) => s + x.product.per_day_rent * x.qty, 0);
  const total = perDay * Math.max(days, 1);

  return (
    <div className={`fixed inset-0 z-[65] ${cartOpen ? "visible" : "invisible"}`} aria-hidden={!cartOpen}>
      <div onClick={close} className={`absolute inset-0 bg-primary-900/50 transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-neutral-150 shadow-2xl transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-gray-100 px-5 py-4">
          <h2 className="text-h4">Your Cart</h2>
          <button type="button" onClick={close} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-neutral-150">
            <X className="size-6" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            close();
            openDates();
          }}
          className="mx-5 mt-4 flex items-center justify-between rounded-2xl border border-primary-150 bg-primary-100 px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 text-sh5 text-primary-800">
            <CalAddIcon className="size-5" />
            {delivery && pickup ? `${fmtShort(delivery)} → ${fmtShort(pickup)} · ${days} ${days === 1 ? "day" : "days"}` : "Select rental dates"}
          </span>
          <span className="text-bt4 text-primary-500">{delivery ? "Edit" : "Select"}</span>
        </button>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-gray-100 text-neutral-300">
              <ShoppingBag className="size-9" />
            </span>
            <p className="text-h6">Your cart is empty</p>
            <p className="text-b5 text-neutral-500">Add a console to get your game on — free delivery & pickup, zero deposit.</p>
            <button type="button" onClick={close} className="mt-2 rounded-4xl bg-primary-900 px-6 py-3 text-bt3 text-white">
              Browse gaming gadgets
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto p-5">
              {cartItems.map(({ product: p, qty }) => (
                <li key={p.id} className="flex animate-fade-up gap-3 rounded-2xl bg-gray-100 p-3">
                  <img src={p.image} alt="" className="size-20 shrink-0 rounded-xl bg-neutral-150 object-contain p-1.5" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <p className="line-clamp-2 text-sh5">{p.name}</p>
                    <p className="text-b6 text-neutral-500">{formatINR(p.per_day_rent)}/day</p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-neutral-200">
                        <button type="button" aria-label="Decrease" onClick={() => setQty(p.id, qty - 1)} className="grid size-7 place-items-center rounded-full hover:bg-neutral-150">
                          {qty === 1 ? <Trash2 className="size-3.5" /> : <Minus className="size-3.5" />}
                        </button>
                        <span className="w-6 text-center text-sh5 tabular-nums">{qty}</span>
                        <button type="button" aria-label="Increase" onClick={() => setQty(p.id, qty + 1)} className="grid size-7 place-items-center rounded-full hover:bg-neutral-150">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-sh4">{formatINR(p.per_day_rent * qty * Math.max(days, 1))}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-neutral-200 bg-gray-100 p-5">
              <div className="flex justify-between text-b5 text-neutral-500">
                <span>Rent ({formatINR(perDay)}/day × {Math.max(days, 1)} {days > 1 ? "days" : "day"})</span>
                <span>{formatINR(total)}</span>
              </div>
              <div className="flex justify-between text-b5 text-neutral-500">
                <span>Delivery & pickup</span>
                <span className="font-semibold text-success-600">FREE</span>
              </div>
              <div className="flex justify-between text-b5 text-neutral-500">
                <span>Security deposit</span>
                <span className="font-semibold text-success-600">₹0</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-neutral-200 pt-3 text-h6">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  delivery
                    ? toast({ title: "Checkout", body: "Checkout & payments are outside this page recreation.", tone: "info" })
                    : (close(), openDates())
                }
                className="h-12 w-full rounded-full bg-primary-500 text-bt2 text-white transition-colors hover:bg-primary-600"
              >
                {delivery ? "Proceed to Checkout" : "Select dates to checkout"}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------------- Search ---------------- */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const close = useMemo(() => () => setSearchOpen(false), [setSearchOpen]);
  useLock(searchOpen, close);
  useEffect(() => {
    if (searchOpen) setTimeout(() => input.current?.focus(), 50);
    else setQ("");
  }, [searchOpen]);
  const results = q.trim() ? products.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())) : [];
  const suggestions = ["PS5", "FC27", "2 Controllers", "God of War", "Racing Wheel", "Portal"];

  return (
    <div className={`fixed inset-0 z-[75] ${searchOpen ? "visible" : "invisible"}`} aria-hidden={!searchOpen}>
      <div onClick={close} className={`absolute inset-0 bg-primary-900/60 backdrop-blur-sm transition-opacity duration-300 ${searchOpen ? "opacity-100" : "opacity-0"}`} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={`relative mx-auto mt-0 w-full max-w-2xl rounded-b-3xl bg-gray-100 p-4 shadow-2xl transition-all duration-300 md:mt-16 md:rounded-3xl md:p-6 ${
          searchOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-full border-2 border-primary-500 px-4">
          <Search className="size-5 text-neutral-400" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for PS5, FC27, controllers…"
            className="h-12 flex-1 bg-transparent text-b2 outline-none placeholder:text-neutral-300"
          />
          <button type="button" onClick={close} aria-label="Close search" className="rounded-full p-1 hover:bg-neutral-150">
            <X className="size-5" />
          </button>
        </div>
        {!q && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full bg-neutral-150 px-3 py-1.5 text-sh7 text-neutral-700 hover:bg-neutral-200">
                {s}
              </button>
            ))}
          </div>
        )}
        {q && (
          <ul className="mt-3 max-h-[60vh] divide-y divide-neutral-150 overflow-y-auto">
            {results.length === 0 && <li className="py-6 text-center text-b5 text-neutral-500">No gaming gadgets match “{q}”.</li>}
            {results.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={close}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-neutral-150"
                >
                  <img src={p.image} alt="" className="size-12 rounded-lg bg-neutral-150 object-contain p-1" />
                  <span className="flex-1 text-sh5">{p.name}</span>
                  <span className="text-sh5 text-neutral-500">{p.out_of_stock ? "Out of stock" : `${formatINR(p.per_day_rent)}/day`}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------------- City picker ---------------- */
export function CityPicker() {
  const { cityOpen, setCityOpen, city, setCity } = useStore();
  const close = useMemo(() => () => setCityOpen(false), [setCityOpen]);
  useLock(cityOpen, close);
  return (
    <div className={`fixed inset-0 z-[75] flex items-end justify-center md:items-center ${cityOpen ? "visible" : "invisible"}`} aria-hidden={!cityOpen}>
      <div onClick={close} className={`absolute inset-0 bg-primary-900/50 transition-opacity duration-300 ${cityOpen ? "opacity-100" : "opacity-0"}`} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Select city"
        className={`relative w-full max-w-lg rounded-t-3xl bg-gray-100 p-6 shadow-2xl transition-all duration-300 md:rounded-3xl ${
          cityOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-h4">Select your city</h2>
          <button type="button" onClick={close} aria-label="Close" className="rounded-full p-1.5 hover:bg-neutral-150">
            <X className="size-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCity(c);
                close();
              }}
              className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-3 text-sh5 transition-all hover:border-primary-300 ${
                c === city ? "border-primary-500 bg-primary-100 text-primary-700" : "border-neutral-200"
              }`}
            >
              <PinIcon className="size-4" />
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Toasts ---------------- */
export function Toaster() {
  const { toasts, setCartOpen } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[90] flex flex-col items-center gap-2 px-4 md:top-auto md:bottom-28" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl bg-primary-900 px-4 py-3 text-white shadow-2xl"
        >
          {t.tone === "success" ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary-500" /> : <Info className="mt-0.5 size-5 shrink-0 text-primary-300" />}
          <div className="min-w-0 flex-1">
            <p className="text-sh5">{t.title}</p>
            {t.body && <p className="truncate text-b6 text-neutral-300">{t.body}</p>}
          </div>
          {t.title === "Added to cart" && (
            <button type="button" onClick={() => setCartOpen(true)} className="shrink-0 self-center rounded-full bg-secondary-500 px-3 py-1 text-bt4 text-primary-900">
              View
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Floating "select dates" pill ---------------- */
export function FloatingDatePill() {
  const { delivery, openDates } = useStore();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 320);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (delivery) return null;
  return (
    <div
      className={`fixed inset-x-4 z-[49] mx-auto flex max-w-max justify-center transition-all duration-500 md:bottom-10 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ bottom: "calc(5rem + env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={() => openDates()}
        className="relative overflow-hidden rounded-full border-2 border-secondary-500 bg-primary-900 shadow-[0_8px_24px_rgba(3,13,49,0.35)] transition-transform hover:scale-[1.03] active:scale-95"
      >
        <span className="absolute inset-0 -translate-x-full animate-[shine_2.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <span className="relative flex items-center gap-2 px-[18px] py-[14px] text-sh5 text-gray-100">
          <CalAddIcon className="h-4 w-4" />
          Select rental dates to view prices
        </span>
      </button>
    </div>
  );
}

/* ---------------- Mobile bottom nav ---------------- */
export function MobileNav() {
  const { cartCount, setCartOpen, setSearchOpen } = useStore();
  const items = [
    { label: "Home", icon: <House className="h-5 w-5" />, on: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Category", icon: <LayoutGrid className="h-5 w-5" />, on: () => document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" }), active: true },
    { label: "Search", icon: <Search className="h-5 w-5" />, on: () => setSearchOpen(true) },
    { label: "Cart", icon: <CartIcon className="h-5 w-5" />, on: () => setCartOpen(true), badge: cartCount },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-gray-100 px-1.5 pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Mobile">
      <div className="relative mx-auto flex w-full max-w-sm gap-0.5 py-1.5">
        {items.map((i) => (
          <button key={i.label} type="button" onClick={i.on} className="relative flex flex-1 flex-col items-center justify-center rounded-lg px-1 py-1.5 text-primary-900 transition-colors hover:text-primary-800">
            <span className="relative">
              {i.icon}
              {!!i.badge && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary-500 px-1 text-[9px] font-bold text-white">{i.badge}</span>
              )}
            </span>
            <span className="mt-0.5 text-[10px]" style={{ opacity: i.active ? 1 : 0.5 }}>
              {i.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ---------------- Chatbot bubble ---------------- */
export function ChatBubble() {
  const { toast } = useStore();
  return (
    <button
      type="button"
      aria-label="Open chatbot"
      onClick={() => toast({ title: "Pal Assistant", body: "The AI chat assistant opens here on the live site.", tone: "info" })}
      className="group fixed bottom-[88px] right-3 z-40 md:bottom-10 md:right-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-primary-500/30 [animation-duration:2.4s]" />
      <span className="relative grid size-12 place-items-center md:size-14 rounded-full bg-primary-500 shadow-[0_10px_30px_rgba(25,69,232,0.45)] ring-4 ring-secondary-500 transition-transform duration-300 group-hover:scale-110 lg:size-16">
        <span className="flex gap-1">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: `${d * 0.15}s` }} />
          ))}
        </span>
      </span>
    </button>
  );
}
