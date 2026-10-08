"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { fmtShort } from "@/lib/dates";
import {
  CalAddIcon,
  CalDeliveryIcon,
  CalPickupIcon,
  CartIcon,
  ChevronDown,
  Logo,
  PinIcon,
  ProfileIcon,
  SearchIcon,
} from "./icons";

function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 140);
        last.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return hidden;
}

export default function Header() {
  const { city, setCityOpen, openDates, delivery, pickup, days, cartCount, setCartOpen, setSearchOpen, toast, bump } = useStore();
  const hidden = useHideOnScroll();
  const hasDates = !!delivery && !!pickup;

  const login = () => toast({ title: "Login", body: "OTP login is outside the scope of this demo.", tone: "info" });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex w-full flex-col items-center justify-center bg-[#4C187C] pb-3 pt-[env(safe-area-inset-top)] backdrop-blur-[8px] transition-all duration-500 lg:pb-0 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* ---------- desktop ---------- */}
      <div className="container hidden h-[68px] w-full items-center justify-between gap-1 lg:flex">
        <a href="#top" className="self-start" aria-label="SharePal home">
          <div className="flex h-[68px] w-40 flex-col items-center justify-end rounded-b-2xl bg-primary-500 p-3 pt-[18px] shadow-sm transition-transform duration-300 hover:translate-y-0.5">
            <Logo className="w-[137px]" />
          </div>
        </a>

        <div className="relative flex items-center gap-2 rounded-full border-2 border-category-purple bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <button
            type="button"
            onClick={() => setCityOpen(true)}
            className="flex items-center gap-1 rounded-l-full bg-neutral-200 px-[10px] py-[6px] text-bt3 text-primary-900 transition-colors hover:bg-neutral-250"
          >
            <PinIcon className="w-5" />
            <span className="min-w-16">{city}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Edit rental dates"
            onClick={() => openDates()}
            className="flex items-center gap-2 text-sh5 text-neutral-700 transition-colors hover:text-primary-500"
          >
            <span className="flex items-center gap-2">
              <CalDeliveryIcon className="h-4 w-4" />
              {hasDates ? fmtShort(delivery) : "Delivery Date"}
            </span>
            <span className="h-5 w-[2px] bg-neutral-200" />
            <span className="flex items-center gap-2">
              <CalPickupIcon className="h-4 w-4" />
              {hasDates ? fmtShort(pickup) : "Pickup Date"}
            </span>
            {hasDates && (
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-sh7 text-primary-600">
                {days} {days === 1 ? "day" : "days"}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => openDates()}
            className="inline-flex h-full items-center gap-1 rounded-4xl bg-primary-900 px-3 py-[8px] text-bt3 tracking-wide text-white transition-[transform,opacity] active:scale-95 active:opacity-90"
          >
            <CalAddIcon className="size-4" />
            <span className="pr-1">{hasDates ? "Edit" : "Select"}</span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 text-gray-100">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-4xl transition-colors hover:bg-white/10"
          >
            <SearchIcon className="size-7" />
          </button>
          <button
            type="button"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
            className="relative grid h-11 w-11 place-items-center rounded-4xl transition-colors hover:bg-white/10"
          >
            <CartIcon className="size-7" />
            {cartCount > 0 && (
              <span
                key={bump}
                className="absolute right-0.5 top-0.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-secondary-500 px-1 text-[11px] font-bold text-primary-900"
              >
                {cartCount}
              </span>
            )}
          </button>
          <button type="button" onClick={login} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-neutral-200 bg-neutral-900 p-0.5 text-gray-100 transition-colors hover:bg-black">
              <ProfileIcon className="size-6" />
            </span>
            <span className="text-bt2 font-medium">Hi, Login</span>
          </button>
        </div>
      </div>

      {/* ---------- mobile / tablet ---------- */}
      <div className="container flex w-full flex-col items-center gap-3 lg:hidden">
        <div className="flex w-full items-center justify-between gap-1">
          <a href="#top" aria-label="SharePal home" className="flex h-10 items-end rounded-b-xl bg-primary-500 px-3 pb-1 pt-3">
            <Logo className="w-24" />
          </a>
          <div className="flex items-center gap-1.5 pt-1.5 md:gap-4">
            <button
              type="button"
              onClick={() => setCityOpen(true)}
              className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-200 px-2 py-0.5 text-bt4 text-primary-900"
            >
              <PinIcon className="w-4" />
              {city}
              <ChevronDown className="w-3" />
            </button>
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden h-8 w-8 place-items-center rounded-full text-white sm:grid"
            >
              <SearchIcon className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Login"
              onClick={login}
              className="grid h-8 w-8 place-items-center rounded-full border-2 border-neutral-200 bg-neutral-900 p-0.5 text-gray-100"
            >
              <ProfileIcon className="size-5" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => openDates()}
          className="flex h-[34px] w-full items-center justify-between gap-1 rounded-full border-2 border-neutral-200 bg-gray-100"
        >
          <span className="flex items-center gap-1 px-2 text-sh7 text-neutral-700">
            <CalDeliveryIcon className="mx-1 w-4" />
            {hasDates ? (
              <>
                {fmtShort(delivery)} <span className="text-neutral-300">→</span> {fmtShort(pickup)}
                <span className="ml-1 rounded-full bg-primary-100 px-1.5 text-primary-600">{days}d</span>
              </>
            ) : (
              "Select Rental Dates"
            )}
          </span>
          <span className="inline-flex h-full items-center gap-1 rounded-4xl bg-primary-900 px-2 py-[6px] pr-3 text-xs font-medium text-white">
            <CalAddIcon className="size-3" />
            {hasDates ? "Edit" : "Select"}
          </span>
        </button>
      </div>
    </header>
  );
}
