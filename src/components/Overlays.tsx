"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
    ArrowRight,
    CheckCircle2,
    Info,
    LayoutGrid,
    House,
    Minus,
    Plus,
    Search,
    Trash2,
    TrendingUp,
    X,
} from "lucide-react";
import { otherCities, popularCities } from "@/data/content";
import { fmtShort } from "@/lib/dates";
import { formatCount, formatINR, products, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import {
    CalAddIcon,
    CartIcon,
    ChevronRightIcon,
    CloseIcon,
    DiscountIcon,
    EmptyBasketIcon,
    StarIcon,
} from "./icons";

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

/** scroll to a product card on the page and flash it */
function revealProduct(id: number) {
    const el = document.getElementById(`product-${id}`);
    if (!el) {
        document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
        return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("ring-2", "ring-primary-500");
    setTimeout(() => el.classList.remove("ring-2", "ring-primary-500"), 1800);
}

/* ------------- right-hand sheet (SharePal's cart + search sheet) ------------- */
function SidePanel({
    open,
    onClose,
    title,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}) {
    useLock(open, onClose);
    return (
        <div className={`fixed inset-0 z-75 ${open ? "visible" : "invisible"}`} aria-hidden={!open}>
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-primary-900/30 backdrop-blur transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={`absolute inset-y-0 right-0 flex h-dvh w-3/4 flex-col overflow-hidden border-l border-neutral-200 bg-gray-100 shadow-lg transition-transform ease-in-out sm:max-w-sm md:w-151.5 md:max-w-none md:rounded-l-3xl ${
                    open ? "translate-x-0 duration-500" : "translate-x-full duration-300"
                }`}
            >
                <div className="flex shrink-0 items-center justify-start gap-3 border-b border-neutral-200 bg-gray-100 px-4 pt-3 pb-5 md:gap-6 md:p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="grid size-6 cursor-pointer place-items-center rounded-full transition-colors hover:bg-neutral-150 md:scale-150"
                    >
                        <CloseIcon className="size-3 text-neutral-900" />
                    </button>
                    <h2 className="flex-1 text-start text-lg font-bold text-neutral-900 md:text-xl">
                        {title}
                    </h2>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            </aside>
        </div>
    );
}

/* ---------------- Cart drawer ---------------- */
export function CartDrawer() {
    const { cartOpen, setCartOpen, cartItems, setQty, days, delivery, pickup, openDates, toast } =
        useStore();
    const close = useCallback(() => setCartOpen(false), [setCartOpen]);
    const perDay = cartItems.reduce((s, x) => s + x.product.per_day_rent * x.qty, 0);
    const total = perDay * Math.max(days, 1);

    const explore = () => {
        close();
        document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <SidePanel open={cartOpen} onClose={close} title="Cart Items">
            {cartItems.length === 0 ? (
                <div className="flex min-h-full w-full flex-col items-center justify-center gap-8 bg-neutral-150 px-4 py-10">
                    <EmptyBasketIcon className="size-32" />
                    <div className="flex max-w-75.5 flex-col items-center justify-center gap-3">
                        <h3 className="text-center text-sh2 text-neutral-900 md:text-h2">
                            Oops! Your Cart is Feeling Lonely...
                        </h3>
                        <p className="text-center text-b6 text-neutral-400 md:text-b2">
                            Looks like you left your cart empty. Give it some love and fill it up!
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={explore}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-4xl border-2 border-primary-500 px-6 py-3 whitespace-nowrap text-primary-500 transition-colors hover:bg-primary-100 active:opacity-90"
                    >
                        <span className="text-bt2">Explore All Products</span>
                        <ChevronRightIcon className="size-6" />
                    </button>
                </div>
            ) : (
                <div className="flex min-h-full flex-col bg-neutral-150">
                    {/* rental dates strip */}
                    <button
                        type="button"
                        onClick={() => {
                            close();
                            openDates();
                        }}
                        className="mx-4 mt-4 flex items-center justify-between gap-2 rounded-2xl border-2 border-neutral-200 bg-gray-100 px-3 py-2.5 text-left transition-colors hover:border-primary-500 md:mx-6"
                    >
                        <span className="flex min-w-0 items-center gap-2 text-sh5 text-neutral-900">
                            <CalAddIcon className="size-4 shrink-0" />
                            <span className="truncate">
                                {delivery && pickup
                                    ? `${fmtShort(delivery)} – ${fmtShort(pickup)} · ${days} ${days === 1 ? "Day" : "Days"}`
                                    : "Select rental dates"}
                            </span>
                        </span>
                        <span className="shrink-0 text-bt4 text-primary-500">
                            {delivery ? "Edit" : "Select"}
                        </span>
                    </button>

                    <ul className="flex-1 space-y-3 p-4 md:px-6">
                        {cartItems.map(({ product: p, qty }) => (
                            <li
                                key={p.id}
                                className="flex animate-fade-up gap-3 rounded-2xl bg-gray-100 p-3"
                            >
                                <span className="size-20 shrink-0 rounded-lg bg-neutral-150 p-1.5 md:size-24">
                                    <img
                                        src={p.image}
                                        alt=""
                                        className="h-full w-full object-contain"
                                    />
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
                                    <p className="line-clamp-2 text-sh4 text-neutral-900">
                                        {p.name}
                                    </p>
                                    <p className="text-b6 text-neutral-400">
                                        {formatINR(p.per_day_rent)}/day
                                    </p>
                                    <div className="mt-1 flex items-center justify-between gap-2">
                                        <div className="flex items-center rounded-full border-2 border-neutral-200 bg-gray-100">
                                            <button
                                                type="button"
                                                aria-label="Decrease"
                                                onClick={() => setQty(p.id, qty - 1)}
                                                className="grid size-7 place-items-center rounded-full text-neutral-900 hover:bg-neutral-150"
                                            >
                                                {qty === 1 ? (
                                                    <Trash2 className="size-3.5" />
                                                ) : (
                                                    <Minus className="size-3.5" />
                                                )}
                                            </button>
                                            <span className="w-6 text-center text-sh5 tabular-nums">
                                                {qty}
                                            </span>
                                            <button
                                                type="button"
                                                aria-label="Increase"
                                                onClick={() => setQty(p.id, qty + 1)}
                                                className="grid size-7 place-items-center rounded-full text-neutral-900 hover:bg-neutral-150"
                                            >
                                                <Plus className="size-3.5" />
                                            </button>
                                        </div>
                                        <p className="text-sh4 text-neutral-900">
                                            {formatINR(p.per_day_rent * qty * Math.max(days, 1))}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="sticky bottom-0 space-y-3 rounded-t-3xl bg-gray-100 p-4 shadow-sidebar md:px-6">
                        <div className="flex justify-between text-b5 text-neutral-500">
                            <span>
                                Rent ({formatINR(perDay)}/day × {Math.max(days, 1)}{" "}
                                {days > 1 ? "days" : "day"})
                            </span>
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
                            <span>
                                Total{" "}
                                <span className="text-b6 text-neutral-400">(incl. of GST)</span>
                            </span>
                            <span>{formatINR(total)}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                delivery
                                    ? toast({
                                          title: "Checkout",
                                          body: "Checkout & payments are outside this page recreation.",
                                          tone: "info",
                                      })
                                    : (close(), openDates())
                            }
                            className="h-11 w-full rounded-4xl bg-primary-500 text-bt2 text-gray-100 transition-colors hover:bg-primary-600 active:opacity-90"
                        >
                            {delivery ? "Proceed to Checkout" : "Select dates to checkout"}
                        </button>
                    </div>
                </div>
            )}
        </SidePanel>
    );
}

/* ---------------- Search ---------------- */
function Stars({ rating }: { rating: number }) {
    return (
        <span className="flex items-center gap-1 text-sh7 text-neutral-500">
            <span className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                        key={i}
                        className="size-3"
                        color={rating >= i - 0.25 ? "#030D31" : "#D3D5DC"}
                    />
                ))}
            </span>
            ({rating ? rating.toFixed(1) : 0})
        </span>
    );
}

function PopularCard({ p, onPick }: { p: Product; onPick: (p: Product) => void }) {
    const { days, delivery } = useStore();
    const hasDates = !!delivery && days > 0;
    return (
        <button
            type="button"
            onClick={() => onPick(p)}
            className="group relative h-max w-37.75 shrink-0 overflow-hidden rounded-2xl p-2.5 text-left leading-5 transition-all duration-300 hover:bg-gray-100"
        >
            <span className="relative block overflow-hidden rounded-lg bg-gray-100 p-1.5">
                <span className="block p-3">
                    <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="aspect-square h-full w-full scale-90 object-contain transition-transform duration-500 group-hover:scale-100"
                    />
                </span>
            </span>
            <span className="flex flex-col items-start gap-1 pt-2.5">
                <span className="w-full">
                    <span className="line-clamp-1 text-sh4 text-neutral-900">{p.name}</span>
                    <span className="line-clamp-1 text-sh7 text-gray-800">{p.name} on rent</span>
                </span>
                <span className="text-o3 text-gray-600">
                    {hasDates ? `Rent for ${days} ${days === 1 ? "day" : "days"}` : "Select Dates"}
                </span>
                <span className="text-sh4 text-gray-900">
                    {formatINR(p.per_day_rent * (hasDates ? days : 1))}
                    {!hasDates && <span className="text-o3 text-gray-600">/day</span>}
                </span>
                <span className="flex items-center gap-1 text-sh7 whitespace-nowrap text-success-700">
                    <TrendingUp className="size-3.5" />
                    {formatCount(p.booked_count)} booked
                </span>
                <Stars rating={p.rating} />
            </span>
        </button>
    );
}

export function SearchOverlay() {
    const { searchOpen, setSearchOpen } = useStore();
    const [q, setQ] = useState("");
    const [progress, setProgress] = useState({ w: 40, x: 0 });
    const input = useRef<HTMLInputElement>(null);
    const row = useRef<HTMLDivElement>(null);
    const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

    useEffect(() => {
        if (searchOpen) setTimeout(() => input.current?.focus(), 350);
        else setQ("");
    }, [searchOpen]);

    const term = q.trim().toLowerCase();
    const results = term ? products.filter((p) => p.name.toLowerCase().includes(term)) : [];
    const popular = useMemo(
        () =>
            products
                .filter((p) => p.tag !== "Vote to Launch")
                .sort((a, b) => b.booked_count - a.booked_count)
                .slice(0, 10),
        [],
    );

    const onRowScroll = () => {
        const el = row.current;
        if (!el) return;
        const w = (el.clientWidth / el.scrollWidth) * 100;
        const x = (el.scrollLeft / el.scrollWidth) * 100;
        setProgress({ w, x });
    };
    useEffect(() => {
        if (searchOpen) onRowScroll();
    }, [searchOpen]);

    const pick = (p: Product) => {
        close();
        setTimeout(() => revealProduct(p.id), 350);
    };

    return (
        <SidePanel open={searchOpen} onClose={close} title="Search Products">
            <div className="flex min-h-full flex-col">
                <div className="sticky top-0 z-10 bg-gray-100 p-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (results[0]) pick(results[0]);
                        }}
                        className={`group relative flex w-full items-center gap-2 rounded-2xl border-2 bg-gray-100 px-3 py-1.5 transition-all duration-200 focus-within:border-primary-500 ${
                            term
                                ? "rounded-b-none border-b-0 border-primary-500"
                                : "border-neutral-200"
                        }`}
                    >
                        <Search className="size-4 shrink-0 text-neutral-900" />
                        <input
                            ref={input}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search for products"
                            aria-label="Search for products"
                            className="h-8 w-full border-0 bg-transparent p-0 text-base outline-none placeholder:text-neutral-400 md:h-9 md:text-b2"
                        />
                        <div className="flex items-center gap-1">
                            {q && (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => {
                                        setQ("");
                                        input.current?.focus();
                                    }}
                                    className="grid size-8 place-items-center rounded-full p-1.5 hover:bg-neutral-100"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                            <button
                                type="submit"
                                aria-label="Search"
                                disabled={!results.length}
                                className="grid size-8 place-items-center rounded-full p-2 text-neutral-500 hover:bg-neutral-100 disabled:opacity-50 md:size-9"
                            >
                                <ArrowRight className="size-4" />
                            </button>
                        </div>

                        {term && (
                            <div className="absolute inset-x-0 top-full z-100 -mx-0.5 overflow-hidden rounded-b-xl bg-gray-100 ring-2 ring-primary-500">
                                <div className="scrollbar-none max-h-100 overflow-y-auto p-3 md:p-4">
                                    {results.length ? (
                                        <div className="flex flex-col space-y-2">
                                            {results.map((p) => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onClick={() => pick(p)}
                                                    className="group/item flex w-full items-center gap-4 rounded-lg bg-neutral-100 p-3 text-left transition-colors hover:bg-neutral-150"
                                                >
                                                    <span className="shrink-0 rounded-md bg-neutral-200 p-2">
                                                        <img
                                                            src={p.image}
                                                            alt=""
                                                            className="size-10 object-contain"
                                                        />
                                                    </span>
                                                    <span className="grow">
                                                        <span className="mb-1 block text-sh4 font-medium text-primary-700 group-hover/item:text-primary-600">
                                                            {p.name}
                                                        </span>
                                                        <span className="block text-b6 text-neutral-500">
                                                            {p.out_of_stock
                                                                ? "Currently out of stock"
                                                                : `${p.name} on rent · ${formatINR(p.per_day_rent)}/day`}
                                                        </span>
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="py-6 text-center text-b5 text-neutral-500">
                                            No products found for “{q.trim()}”
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="flex-1 space-y-6 p-4 pb-20 md:pb-8">
                    {/* coupon */}
                    <div className="flex items-center gap-4 overflow-hidden rounded-3xl bg-linear-to-r from-coupon-blue to-coupon-lime p-3 md:h-24">
                        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-500/10 md:size-18">
                            <DiscountIcon className="size-8 text-decorative-pink md:size-10" />
                        </span>
                        <div className="flex flex-col gap-2 text-start">
                            <p className="text-sm">
                                <span className="font-bold text-decorative-pink md:text-sh2">
                                    Use code SHAREPAL &amp; get 10%{" "}
                                </span>
                                <span className="text-neutral-900 md:text-sh2">
                                    on orders above ₹1500. Maximum discount: ₹300
                                </span>
                            </p>
                            <p className="text-sh6 text-neutral-700 md:text-sh4">
                                Use Coupon - SHAREPAL
                            </p>
                        </div>
                    </div>

                    {/* popular items */}
                    <div className="space-y-4 pb-10">
                        <div className="flex w-full items-center justify-start gap-2 overflow-hidden">
                            <p className="min-w-max text-o3 text-neutral-300">Popular Items</p>
                            <div className="h-0.5 w-full rounded-full bg-neutral-200 md:max-w-100" />
                        </div>
                        <div className="bg-neutral-150 p-4">
                            <div
                                ref={row}
                                onScroll={onRowScroll}
                                className="scrollbar-none flex snap-x gap-5 overflow-x-auto lg:gap-6"
                            >
                                {popular.map((p) => (
                                    <div key={p.id} className="snap-start">
                                        <PopularCard p={p} onPick={pick} />
                                    </div>
                                ))}
                            </div>
                            <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-neutral-200">
                                <div
                                    className="absolute inset-y-0 rounded-full bg-neutral-900 transition-[left] duration-150"
                                    style={{ width: `${progress.w}%`, left: `${progress.x}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidePanel>
    );
}

/* ---------------- City picker ---------------- */
function Divider({ label }: { label: string }) {
    return (
        <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative bg-gray-100 px-4 text-sm text-neutral-400">{label}</span>
        </div>
    );
}

export function CityPicker() {
    const { cityOpen, setCityOpen, city, setCity, toast } = useStore();
    const close = useCallback(() => setCityOpen(false), [setCityOpen]);
    useLock(cityOpen, close);
    const choose = (c: string) => {
        setCity(c);
        close();
        if (c !== city)
            toast({
                title: `Showing rentals in ${c}`,
                body: "Prices & stock updated.",
                tone: "success",
            });
    };
    return (
        <div
            className={`fixed inset-0 z-75 flex items-center justify-center ${cityOpen ? "visible" : "invisible"}`}
            aria-hidden={!cityOpen}
        >
            <div
                onClick={close}
                className={`absolute inset-0 bg-primary-900/30 backdrop-blur-sm transition-opacity duration-200 ${cityOpen ? "opacity-100" : "opacity-0"}`}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="city-title"
                className={`relative grid max-h-dialog w-19/20 max-w-3xl gap-2 rounded-3xl border border-neutral-200 bg-gray-100 px-2 py-6 shadow-lg transition-all duration-200 md:gap-4 ${
                    cityOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <h2
                    id="city-title"
                    className="px-6 text-center text-xl font-bold tracking-tight text-neutral-900 md:text-2xl"
                >
                    Select Your City
                </h2>
                <div className="space-y-8 overflow-y-auto px-4 pb-6 md:px-6">
                    <div className="space-y-4">
                        <Divider label="Popular Cities" />
                        <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
                            {popularCities.map((c) => (
                                <button
                                    key={c.name}
                                    type="button"
                                    aria-pressed={c.name === city}
                                    onClick={() => choose(c.name)}
                                    className={`flex flex-col items-center space-y-2 rounded-xl border p-3 transition-colors md:min-w-24 ${
                                        c.name === city
                                            ? "border-primary-500 bg-primary-100"
                                            : "border-transparent hover:bg-gray-50"
                                    }`}
                                >
                                    <img
                                        src={c.icon}
                                        alt=""
                                        width={48}
                                        height={48}
                                        loading="lazy"
                                        className="size-12"
                                    />
                                    <span className="text-xs font-medium text-neutral-900">
                                        {c.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Divider label="Other Cities" />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-7">
                            {otherCities.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    aria-pressed={c === city}
                                    onClick={() => choose(c)}
                                    className={`rounded-xl border px-6 py-2 text-xs transition-colors ${
                                        c === city
                                            ? "border-primary-500 bg-primary-100"
                                            : "border-neutral-200 hover:bg-gray-50"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Toasts ---------------- */
export function Toaster() {
    const { toasts, setCartOpen } = useStore();
    return (
        <div
            className="pointer-events-none fixed inset-x-0 bottom-36 z-90 flex flex-col items-center gap-2 px-4 md:bottom-28"
            aria-live="polite"
        >
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl bg-primary-900 px-4 py-3 text-white shadow-2xl"
                >
                    {t.tone === "success" ? (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary-500" />
                    ) : (
                        <Info className="mt-0.5 size-5 shrink-0 text-primary-300" />
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="text-sh5">{t.title}</p>
                        {t.body && <p className="truncate text-b6 text-neutral-300">{t.body}</p>}
                    </div>
                    {t.title === "Added to cart" && (
                        <button
                            type="button"
                            onClick={() => setCartOpen(true)}
                            className="shrink-0 self-center rounded-full bg-secondary-500 px-3 py-1 text-bt4 text-primary-900"
                        >
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
        const on = () => setShow(true);
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);
    if (delivery) return null;
    return (
        <div
            className={`fixed inset-x-4 bottom-nav-offset z-49 mx-auto flex max-w-max justify-center transition-all duration-500 md:bottom-10 ${
                show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
        >
            <button
                type="button"
                onClick={() => openDates()}
                className="relative overflow-hidden rounded-full border-2 border-secondary-500 bg-primary-900 shadow-pill transition-transform hover:scale-103 active:scale-95"
            >
                <span className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative flex items-center gap-2 px-4.5 py-3.5 text-sh5 text-gray-100">
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
        {
            label: "Home",
            icon: <House className="h-5 w-5" />,
            on: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        },
        {
            label: "Category",
            icon: <LayoutGrid className="h-5 w-5" />,
            on: () =>
                document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" }),
            active: true,
        },
        { label: "Search", icon: <Search className="h-5 w-5" />, on: () => setSearchOpen(true) },
        {
            label: "Cart",
            icon: <CartIcon className="h-5 w-5" />,
            on: () => setCartOpen(true),
            badge: cartCount,
        },
    ];
    return (
        <nav
            className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-gray-100 px-1.5 pb-safe lg:hidden"
            aria-label="Mobile"
        >
            <div className="relative mx-auto flex w-full max-w-sm gap-0.5 py-1.5">
                {items.map((i) => (
                    <button
                        key={i.label}
                        type="button"
                        onClick={i.on}
                        className="relative flex flex-1 flex-col items-center justify-center rounded-lg px-1 py-1.5 text-primary-900 transition-colors hover:text-primary-800"
                    >
                        <span className="relative">
                            {i.icon}
                            {!!i.badge && (
                                <span className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary-500 px-1 text-micro font-bold text-white">
                                    {i.badge}
                                </span>
                            )}
                        </span>
                        <span
                            className={`mt-0.5 text-2xs ${i.active ? "opacity-100" : "opacity-50"}`}
                        >
                            {i.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

/* ---------------- AI chat button (SharePal's Lottie loop, rebuilt as SVG + CSS) ---------------- */
const BLUE_BUBBLE =
    "M64.80 87.77C61.46 86.55 57.75 86.84 54.64 88.58C37.99 98.07 19.16 103.02 0.00 102.94C-59.24 102.94 -107.29 56.88 -107.29 0.00C-107.29 -56.88 -59.24 -102.95 0.00 -102.95C59.24 -102.95 107.29 -56.90 107.29 0.00C107.30 16.93 102.99 33.58 94.75 48.38C93.02 51.40 92.59 55.01 93.58 58.36L104.75 94.76C105.44 97.03 104.17 99.44 101.90 100.13C101.02 100.40 100.07 100.38 99.20 100.07Z";
const LIME_BUBBLE =
    "M-64.81 87.93C-61.46 86.70 -57.74 86.99 -54.63 88.74C-37.99 98.23 -19.16 103.20 0.00 103.12C59.24 103.12 107.28 56.98 107.28 0.00C107.28 -56.98 59.24 -103.12 0.00 -103.12C-59.23 -103.12 -107.28 -56.98 -107.28 0.00C-107.30 16.96 -102.99 33.64 -94.75 48.46C-93.02 51.49 -92.59 55.09 -93.57 58.44L-104.77 94.93C-105.47 97.20 -104.19 99.60 -101.92 100.30C-101.04 100.57 -100.09 100.55 -99.22 100.24Z";

/** dot start frames (30fps, 90-frame loop) → negative CSS delay so the loop wraps cleanly */
const delay = (frame: number) => `${-(((90 - frame) % 90) / 30).toFixed(4)}s`;

function Dots({ starts }: { starts?: number[] }) {
    return (
        <>
            {[-51.56, 0, 51.56].map((x, i) => (
                <g
                    key={x}
                    className={starts ? "dot" : undefined}
                    style={starts ? { animationDelay: delay(starts[i]) } : undefined}
                >
                    <circle cx={x} cy={0} r={17.19} fill="#fff" />
                </g>
            ))}
        </>
    );
}

export function ChatBubble() {
    const { toast } = useStore();
    return (
        <button
            type="button"
            title="Open chatbot"
            aria-label="Open chatbot"
            onClick={() =>
                toast({
                    title: "Pal Assistant",
                    body: "The AI chat assistant opens here on the live site.",
                    tone: "info",
                })
            }
            className="fixed right-2 bottom-16 z-40 transition-transform duration-300 hover:scale-105 active:scale-95 md:right-6 md:bottom-10"
        >
            <svg viewBox="0 0 500 500" aria-hidden className="chat-fab block w-20 lg:w-28">
                {/* stacking follows the Lottie layer order: older bubbles below, the newest bubble on top */}
                <g transform="translate(228.48 274.22)">
                    <g className="lime-old">
                        <path d={LIME_BUBBLE} fill="#9EFF00" />
                        <Dots />
                    </g>
                </g>
                <g transform="translate(271.45 275.96)">
                    <g className="blue-old">
                        <path d={BLUE_BUBBLE} fill="#1945E8" />
                        <Dots />
                    </g>
                </g>
                <g transform="translate(228.48 274.22)">
                    <g className="lime-new">
                        <path d={LIME_BUBBLE} fill="#9EFF00" />
                        <Dots starts={[-4, -2, 0]} />
                    </g>
                </g>
                <g transform="translate(271.45 275.96)">
                    <g className="blue-new">
                        <path d={BLUE_BUBBLE} fill="#1945E8" />
                        <Dots starts={[46, 48, 50]} />
                    </g>
                </g>
            </svg>
        </button>
    );
}
